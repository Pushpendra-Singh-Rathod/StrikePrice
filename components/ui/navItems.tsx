"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navItems } from "../../lib/constants";
import SearchCommand from "./searchCommand";

function NavItems({
  initialStocks,
}: {
  initialStocks: StockWithWatchlistStatus[];
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path == "/") return pathname == "/";

    return pathname.startsWith(path);
  };

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {navItems.map(({ href, label }) => {
        if (href === "/search")
          return (
            <li key="search-trigger">
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );

        return (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-yellow-500 transition-colors ${
                isActive(href) ? "text-gray-100" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export { NavItems };
