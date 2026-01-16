import { UserDropDown } from "./userDropDown";
import { NavItems } from "./navItems";

function Header() {
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
          <NavItems />
        </nav>
        <UserDropDown />
      </div>
    </header>
  );
}

export { Header };
