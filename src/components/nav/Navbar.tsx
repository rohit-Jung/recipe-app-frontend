import { FC, useState } from "react";
import { Button } from "../ui/Button";
import { useNavigate, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ShareCard from "../cards/ShareCard";
import { navItems } from "@/constants/data";
import { MobileSidebar } from "./mobileNav";

interface NavbarProps {
  scrollToAbout: () => void;
}

const Navbar: FC<NavbarProps> = ({ scrollToAbout }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const pathname = window.location.href;

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    setIsDialogOpen(true); // Open the dialog
  };



  return (
    <>
      <nav className="flex items-center justify-between  w-full pt-2">
        <Link to={"/"}>
          <img src="/logo.svg" alt="logo-of-app" className="size-20 md:h-auto" />
        </Link>
        <div className="md:flex justify-center items-center gap-12 hidden">
          {navItems.map((navLink) => (
            <Link
              to={navLink.link}
              key={navLink.label}
              className="hover:text-slate-400"
              onClick={
                navLink.label === "Share"
                  ? handleShareClick
                  : navLink.label === "About"
                  ? scrollToAbout
                  : undefined
              }
            >
              {navLink.label}
            </Link>
          ))}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="hidden"></DialogTrigger>
            <DialogContent className="w-full">
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                  Share us with <hr className="mb-0" />
                </DialogTitle>
                <DialogDescription className="w-full p-0 m-0">
                  <ShareCard link={pathname} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button onClick={() => navigate("/login")} className="w-36">
            Join Us
          </Button>
        </div>
        <div className="md:hidden flex h-full items-center ">
          <MobileSidebar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
