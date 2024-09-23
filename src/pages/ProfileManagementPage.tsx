import { Button, Container, Heading } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/redux/store";
import { useUpdateUser } from "@/services/api/auth";
import { IUser } from "@/types";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProfileManagementPageProps {}

const ProfileManagementPage: FC<ProfileManagementPageProps> = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { mutate: updateProfile } = useUpdateUser();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IUser>();

  const file: FileList | undefined = watch("profile_picture");
  const navigate = useNavigate();

  useEffect(() => {
    if (file && file.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file[0]);
    } else {
      setImagePreview(null);
    }
  }, [file]);

  useEffect(() => {
    if (user) {
      const formValues: IUser = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        role: user.role || "chef",
      };

      if (user.profile_picture_url) {
        setImagePreview(user.profile_picture_url);
      }

      reset(formValues);
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    const formData = new FormData();

    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    formData.append("role", data.role);

    if (file && file.length > 0) {
      formData.append("profile_picture", file[0]);
    }

    if (user && user.id) {
      updateProfile(
        { id: user.id, formData },
        {
          onSuccess: () => {
            toast.success("Profile updated successfully");
            navigate("/", { replace: true });
          },
          onError: (error) => {
            toast.error(`Profile Update Failed: ${error.message}`);
          },
        }
      );
    } else {
      toast.error("User ID is missing.");
    }
  };

  return (
    <div className="md:mx-0 mx-7">
      <Container>
        <Heading title="Edit your profile" />
        <hr />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input type="file" className="hidden" />
          <div className="w-full flex items-center justify-center text-base relative ">
            <label
              htmlFor="file-upload"
              className="size-64 bg-[#E0DFD7] rounded-full flex items-center overflow-hidden justify-center cursor-pointer z-20"
            >
              <input
                id="file-upload"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                {...register("profile_picture", { required: false })}
                className="hidden"
              />
              {imagePreview && (
                <div className="h-full w-full">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="object-cover object-top rounded-md"
                  />
                </div>
              )}
            </label>
          </div>

          <h1 className="text-2xl font-semibold">Profile Information</h1>

          <div className="flex md:flex-row flex-col w-full items-center md:gap-10 gap-2">
            <div className="md:w-1/3 w-full">
              <Label>User name</Label>
              <Input
                placeholder="Enter Username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="md:w-1/3 w-full">
              <Label>Email</Label>
              <Input
                placeholder="Enter Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="md:w-1/3 w-full">
              <Label>Role</Label>
              <Input
                placeholder="Enter Role"
                {...register("role", { required: "Role is required" })}
              />
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col w-full items-center md:gap-10 gap-2">
            <div className="md:w-1/2 w-full">
              <Label>First Name</Label>
              <Input
                placeholder="Enter First Name"
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
            </div>
            <div className="md:w-1/2 w-full">
              <Label>Last Name</Label>
              <Input
                placeholder="Enter Last Name"
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <Label className="mt-2">About me / Bio</Label>
          <Textarea
            rows={10}
            placeholder="A short bio about yourself"
            {...register("bio")}
          />
          {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

          <Button className="mt-8 w-full" type="submit">
            Update Profile
          </Button>
          
        </form>
      </Container>
    </div>
  );
};

export default ProfileManagementPage;
