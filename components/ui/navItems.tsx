"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import navItems from "../../lib/constants";

function NavItems() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path == "/") return pathname == "/";

    return pathname.startsWith(path);
  };

  return (
    <ul className="flex-col flex sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link
            href={`${item.href}`}
            className={`hover:text-yellow-500 transition-colors ${
              isActive(item.href) ? "text-gray-100" : ""
            }`}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { NavItems };
