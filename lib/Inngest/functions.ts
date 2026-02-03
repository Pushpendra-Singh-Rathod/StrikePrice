import { email, success } from "better-auth";
import { inngest } from "../Inngest/client";
import {
  NEWS_SUMMARY_EMAIL_PROMPT,
  PERSONALIZED_WELCOME_EMAIL_PROMPT,
} from "./prompt";
import { sendNewsSummaryEmail, sendWelcomeEmail } from "../nodemailer";
import { getAllUserForNewsEmail } from "../actions/user.action";
import { getWatchlistSymbolsByEmail } from "../actions/watchlist.action";
import { getNews } from "../actions/finnhub.action";
import { getFormattedTodayDate } from "../utils";

export const sendSignUpEmail = inngest.createFunction(
  { id: "sign-up-email" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
        - Country : ${event.data.country} 
        - Investment Goals:${event.data.investmentGoals}
        - Risk Tolerance : ${event.data.riskTolerance} 
        - Preferred Industry:${event.data.preferredIndustry}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile,
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),

      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText =
        (part && "text" in part ? part.text : null) ||
        "Thanks for joining Signalist . You now have tools to track the market  and make smarter moves";

      const {
        data: { email, name },
      } = event;

      return await sendWelcomeEmail({ email, name, intro: introText });
    });

    return {
      success: true,
      message: "Welcome !! Email Sent Successfully",
    };
  },
);

export const sendDailyNewSummary = inngest.createFunction(
  { id: "daily-news-summary" },
  [{ event: "app/send.daily.news" }, { cron: "0 12 * * *" }],
  async ({ step }) => {
    const users = await step.run("get-all-users", getAllUserForNewsEmail);

    if (!users || users.length == 0)
      return { success: false, message: "No Users Found for news Email" };

    const results = await step.run("fetch-user-news", async () => {
      const perUser: Array<{
        user: User;
        articles: MarketNewsArticle[];
      }> = [];
      for (const user of users as User[]) {
        try {
          const symbol = await getWatchlistSymbolsByEmail(user.email);
          let articles = await getNews(symbol);
          articles = (articles || []).slice(0, 6);

          if (!articles || articles.length == 0) {
            articles = await getNews();
            articles = (articles || []).slice(0, 6);
          }

          perUser.push({ user, articles });
        } catch (error) {
          console.error("daily-news Error:", user.email, error);
          perUser.push({ user, articles: [] });
        }
      }
      return perUser;
    });

    const userNewsSummaries: { user: User; newsContent: string | null }[] = [];

    for (const { user, articles } of results) {
      try {
        const prompt = NEWS_SUMMARY_EMAIL_PROMPT.replace(
          "{{newsData}}",
          JSON.stringify(articles, null, 2),
        );

        const response = await step.ai.infer(`summarize-new-${user.email}`, {
          model: step.ai.models.gemini({ model: "gemini-2.5-flash-lite" }),
          body: {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];
        const newsContent =
          (part && "text" in part ? part.text : null) || "No news Found";

        userNewsSummaries.push({ user, newsContent });
      } catch (error) {
        console.error("Failed to Summarize news for:", user.email);
        userNewsSummaries.push({ user, newsContent: null });
      }
    }

    await step.run("send-news-email", async () => {
      await Promise.all(
        userNewsSummaries.map(async ({ user, newsContent }) => {
          if (!newsContent) return false;

          return await sendNewsSummaryEmail({
            email: user.email,
            date: getFormattedTodayDate(),
            newsContent,
          });
        }),
      );
    });

    return {
      success: true,
      message: "Daily news Summary email Sent Successfully",
    };
  },
);
