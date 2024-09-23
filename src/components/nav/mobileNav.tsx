import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger  asChild>
          <MenuIcon className="size-8"/>
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Dashboard
              </h2>
              <div className="space-y-1 flex items-start flex-col pl-6">
                {navItems.map((navLink) => (
                  <Link
                    to={navLink.link}
                    key={navLink.label}
                    className="hover:text-slate-400"
                    // onClick={
                    //   navLink.label === "Share" ? handleShareClick : undefined
                    // }
                  >
                    {navLink.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
