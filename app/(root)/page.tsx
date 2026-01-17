import TradingViewWidget from "@/components/ui/TradingWidget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

function Home() {
  const Url = "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="flex home-wrapper min-h-screen">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            ScriptUrl={`${Url}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className="md-col-span xl:col-span-2">
          <TradingViewWidget
            title="Stock HeatMap"
            ScriptUrl={`${Url}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            ScriptUrl={`${Url}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className="custom-chart"
          />
        </div>
        <div className=" h-full md:col-span-1 xl:col-span-2">
          <TradingViewWidget
            ScriptUrl={`${Url}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
