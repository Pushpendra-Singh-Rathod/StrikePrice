"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { NavItems } from "./navItems";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { SignOut } from "@/lib/actions/auth.action";

function UserDropDown({
  user,
  initialStocks,
}: {
  user: User;
  initialStocks: StockWithWatchlistStatus[];
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await SignOut();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-4 hover:text-yellow-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-small font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start">
            <span className="text-gray-400 text-base font-medium">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-small font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-gray-400 text-base font-medium">
                {user.name}
              </span>

              <span className="text-gray-500 text-sm">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-600"></DropdownMenuSeparator>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="  sm:hidden bg-gray-600"></DropdownMenuSeparator>
        <nav className="sm:hidden">
          <NavItems initialStocks={initialStocks}></NavItems>
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { UserDropDown };
