
import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import Wishlist from "./Wishlist";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-carblue" />
          <span className="font-bold text-xl">Auto Vista Finder</span>
        </div>
        <div className="flex items-center gap-2">
          <Wishlist />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
