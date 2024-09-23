import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useLoginUser } from "@/services/api/auth";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons"; // Ensure you have this import
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice"; // Import the login action from your auth slice
import store from "@/redux/store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof loginSchema>; // Use zod schema type for form data

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters long"), // Adjust the schema according to your requirements
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "newuser",
      password: "securepassword",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { mutate: loginUser, isPending } = useLoginUser(); 

  async function onSubmit(data: FormData) {

    loginUser(data, {
      onSuccess: (response) => {
        // Dispatch the login action with user details
        console.log(response.csrf_token, "data");
        dispatch(
          login({
            user: response.data.user,
            accessToken: response.data.access,
            refreshToken: response.data.refresh,
            csrfToken: response.csrf_token,
          })
        ); // Adjust according to your authSlice structure

        navigate("/");
        console.log(response.data.data);
        console.log(store.getState());
        toast.success("Logged in successfully");
      },
      onError: (err: any) => {
        toast.error(err.response.data.detail || "Error logging in");
        console.error(err.response.data.detail);
      },
    }); 

  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isPending}
              {...register("username")}
            />
            {errors.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isPending}
              {...register("password")}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Start Cooking
          </button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true);
          //   signIn("github");
        }}
        disabled={isPending || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}
        Google
      </button> */}
    </div>
  );
}
