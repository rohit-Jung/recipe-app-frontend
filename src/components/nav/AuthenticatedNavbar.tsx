import { FC, useState } from "react";
import { Button } from "../ui/Button";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FaCartShopping } from "react-icons/fa6";
import { useLogoutUser } from "@/services/api/auth";
import { logout } from "@/redux/authSlice";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ShareCard from "../cards/ShareCard";
import { MobileSidebar } from "./mobileNav";

interface AuthenticatedNavbarProps {
  scrollToAbout: () => void;
}

interface authenticatedNavlinksProps {
  label: string;
  link: string;
}

const AuthenticatedNavbar: FC<AuthenticatedNavbarProps> = ({
  scrollToAbout,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const authenticatedNavlinks: authenticatedNavlinksProps[] = [
    {
      label: "Add Recipe",
      link: "/add",
    },
    {
      label: "Share",
      link: "#",
    },
    {
      label: "About",
      link: "#",
    },
    {
      label: "My Recipes",
      link: "/my-recipes",
    },
  ];
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch: AppDispatch = useDispatch();

  const { mutate: signOut } = useLogoutUser();

  const handleShareClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const pathname = window.location.href;
  const signOutUser = () => {
    signOut(undefined, {
      onSuccess: (response) => {
        console.log("logout Response", response);
        dispatch(logout());
        toast.success("Logged Out Successfully");
        navigate("/");
        window.location.reload(); 
      },
      onError: (error) => {
        console.error("Error Logging Out", error);

        toast.error("Error Logging Out  ");
      },
    });
  };

  return (
    <>
      <nav className="flex items-center justify-between w-full pt-2">
        <Link to={"/"}>
          <img src="/logo.svg" alt="logo-of-app" className="size-20" />
        </Link>
        <div className="justify-center items-center gap-4 md:gap-12 flex">
          {authenticatedNavlinks.map((navLink) => (
            <Link
              to={navLink.link}
              key={navLink.label}
              className="hover:text-slate-400 md:flex hidden"
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
          <Link to={"/shopping-lists"}>
            <FaCartShopping size={22} />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className="object-cover object-top"
                    src={user?.profile_picture_url ?? ""}
                    alt={user?.first_name ?? ""}
                  />
                  <AvatarFallback>{user?.first_name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.first_name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => signOutUser()}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="md:hidden flex ">
            <MobileSidebar />
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthenticatedNavbar;
