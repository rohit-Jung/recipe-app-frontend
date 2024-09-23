import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { Icons } from "@/components/icons";
import { Link } from "react-router-dom";
import { RegisterForm } from "@/components";

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen overflow-hidden flex-row gap-16 justify-evenly">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex h-full flex-col  justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome 👋
          </h1>
          <p className="text-sm text-muted-foreground">
            Register to explore more exciting and delicious recipe
          </p>
        </div>
        <RegisterForm />
        <p className="px-8 flex flex-col gap-3 text-center text-sm text-muted-foreground">
          <span>
            By clicking continue, you agree to our <b>Terms of Service</b> and
            <b> Privacy Policy</b>
          </span>
          <Link to="/login">
            Already have an account?{" "}
            <span className="hover:text-brand underline underline-offset-4">
              Sign In
            </span>{" "}
          </Link>
        </p>
      </div>
      <div className="relative gap-10 w-[50%] md:flex hidden">
        <div className="rounded-[5%] absolute bg-blue-500 -top-28 -right-24 overflow-hidden h-[45vw] w-[24vw] flex flex-col -rotate-[30deg] items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="foodimage1"
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="rounded-[5%] left-28 -bottom-40 absolute overflow-hidden h-[45vw] w-[24vw] -rotate-[30deg]  flex flex-col items-center">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="foodimage1"
            className="object-cover w-full h-full object-center"
          />
        </div>
      </div>
    </div>
  );
}
