import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterUser } from "@/services/api/auth"; // Ensure you have this hook for registration
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons"; // Ensure you have this import
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import store from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
    role: z.enum(["food_enthusiast", "meal_planner", "chef"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof registerSchema>; // Use zod schema type for form data

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate: registerUser } = useRegisterUser(); // Use the hook for registration

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    console.log(data);

    registerUser(data, {
      onSuccess: (response) => {
        // Dispatch the login action with user details
        console.log(response, "data");

        navigate("/login");
        console.log(store.getState());
        toast.success("Registered successfully");
      },
      onError: (err) => {
        toast.error("Error registering");
        console.error(err);
      },
    });

    setIsLoading(false);
  }

  const handleValueChange = (value: string) => {
    setValue("role", value as "food_enthusiast" | "meal_planner" | "chef", {
      shouldValidate: true,
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="first_name">
              First Name
            </Label>
            <Input
              id="first_name"
              placeholder="First name"
              type="text"
              autoCapitalize="none"
              autoComplete="first_name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="px-1 text-xs text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="last_name">
              Last Name
            </Label>
            <Input
              id="last_name"
              placeholder="Last name"
              type="text"
              autoCapitalize="none"
              autoComplete="last_name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="px-1 text-xs text-red-600">
                {errors.last_name.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="last_name">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Select value={watch("role")} onValueChange={handleValueChange}>
              <SelectTrigger
                className={`w-[180px] ${errors.role ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="meal_planner">Meal Planner</SelectItem>
                <SelectItem value="food_enthusiast">Food Enthusiast</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="px-1 text-xs text-red-600">{errors.role.message}</p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
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
        disabled={isLoading}
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
