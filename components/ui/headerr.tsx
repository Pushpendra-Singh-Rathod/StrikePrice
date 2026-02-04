import { UserDropDown } from "./userDropDown";
import { NavItems } from "./navItems";
import { searchStocks } from "@/lib/actions/finnhub.action";

async function Header({ user }: { user: User }) {
  const initialStocks = await searchStocks();
  return (
    <header className="sticky top-0 header ">
      <div className="header-wrapper container">
        <a href="/" className="flex">
          <img
            src="/assets/icons/logo.svg"
            alt="SignaList logo"
            width={140}
            height={42}
            className="h-8 w-auto cursor-pointer"
          />
        </a>

        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropDown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
}

export { Header };
