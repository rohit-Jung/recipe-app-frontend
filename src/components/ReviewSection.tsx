import {
  useCreateReview,
  useDeleteReview,
  useGetAllReviewsOfRecipe,
  useUpdateReview, // Assuming you have this for editing reviews
} from "@/services/api/reviews";
import { FC, useEffect, useState, Fragment } from "react";
import { Rating } from "@mui/material";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IReview } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ReviewSectionProps {
  recipeId: string;
}

const ReviewSection: FC<ReviewSectionProps> = ({ recipeId }) => {
  const {
    data: fetchedReviews,
    isSuccess,
    refetch,
  } = useGetAllReviewsOfRecipe(recipeId);
  const { mutate: createReview } = useCreateReview();
  const { mutate: deleteReview } = useDeleteReview();
  const { mutate: updateReview } = useUpdateReview(); // For editing reviews
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(true);
  const [editingReview, setEditingReview] = useState<IReview | null>(null); // Track if a review is being edited

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IReview>();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isSuccess && fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }, [isSuccess, fetchedReviews]);

  useEffect(() => {
    if (user) {
      const userHasReview = reviews.some(
        (review) => review.user?.id === user.id
      );
      setShowReviewForm(!userHasReview);
    }
  }, [user, reviews]);

  const handleDeleteReview = (id: string) => {
    deleteReview(id, {
      onSuccess: () => {
        setReviews(reviews.filter((review) => review.id !== id));
        setShowReviewForm(true); // Show form after review deletion
        toast.success("Review deleted successfully");
        refetch(); // Refetch the reviews
      },
      onError: (err) => {
        console.error(err);
        toast.error("Error deleting review");
      },
    });
  };

  const onSubmit: SubmitHandler<IReview> = (data) => {
    if (editingReview) {
      // If a review is being edited, update it
      updateReview(
        { recipe_id: editingReview.id!, data },
        {
          onSuccess: (updatedReview) => {
            setReviews(
              reviews.map((review) =>
                review.id === updatedReview.id ? updatedReview : review
              )
            );
            setEditingReview(null); 
            setShowReviewForm(false); 
            toast.success("Review updated successfully");
            refetch(); // Refetch the reviews
          },
          onError: (err) => {
            console.error(err);
            toast.error("Error updating review");
          },
        }
      );
    } else {
      // Create a new review
      createReview(
        { recipe_id: recipeId, data },
        {
          onSuccess: (newReview) => {
            setReviews([...reviews, newReview]); // Add new review locally
            setShowReviewForm(false); // Hide form after review creation
            setValue("rating", 0);
            setValue("comment", "");
            toast.success("Review created successfully");
            refetch(); // Refetch the reviews
          },
          onError: (err) => {
            console.error(err);
            toast.error("Error creating review");
          },
        }
      );
    }
  };

  const handleEditReview = (review: IReview) => {
    setEditingReview(review);
    setShowReviewForm(true); // Show form for editing
    setValue("rating", review.rating);
    setValue("comment", review.comment);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Reviews ({reviews.length})</h1>
      <hr />
      {showReviewForm && (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="yourReview w-full space-y-3">
              <div className="profile flex items-center gap-3">
                <div className="size-20 bg-red-500 rounded-full overflow-hidden">
                  <img
                    src={user?.profile_picture_url}
                    alt="userPhoto"
                    className="object-top object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold">
                    Your Rating:{" "}
                    <span className="text-sm text-rose-500 font-normal">
                      Required *
                    </span>
                  </h1>
                  <Rating
                    precision={0.5}
                    onChange={(_, newValue) => {
                      setValue("rating", newValue || 0);
                    }}
                    value={editingReview?.rating || 0} // Prepopulate for editing
                  />
                  {errors.rating && (
                    <span className="text-red-500">Rating is required</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full items-start justify-center gap-3">
                <h1 className="text-xl font-bold">
                  Your Review:{" "}
                  <span className="text-sm text-rose-500 font-normal">*</span>
                </h1>
                <Textarea
                  {...register("comment", { required: true })}
                  placeholder="Share your love! Tell us what you thought about the recipe in a quick review..."
                />
                {errors.comment && (
                  <span className="text-red-500">Review is required</span>
                )}
                <Button type="submit">
                  {editingReview ? "Update Review" : "Post Review"}
                </Button>
              </div>
            </div>
          </form>
          <hr />
        </>
      )}

      {reviews.map((review) => (
        <Fragment key={review.id}>
          <div className="review-cards w-full">
            <div className="bg-slate-700 w-full px-6 py-3 rounded-md">
              <div className="flex items-center justify-between text-white gap-4 py-3">
                <div className="profile flex items-center gap-3 ">
                  <div className="size-10 bg-red-500 rounded-full overflow-hidden">
                    <img
                      src={review.user?.profile_picture_url}
                      alt="reviewUserPhoto"
                      className="object-cover object-top"
                    />
                  </div>
                  <h1>{review.user?.username}</h1>
                </div>
                <div>
                  {review.user?.id === user?.id && (
                    <div className="flex gap-2">
                      <div
                        className="cursor-pointer"
                        onClick={() => handleEditReview(review)}
                      >
                        Edit
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDeleteReview(review.id!)}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-slate-200 p-4 rounded-md pointer-events-none">
                <Rating
                  value={Number(review.rating)}
                  precision={0.5}
                  readOnly
                />
                <p className="">{review.comment}</p>
              </div>
            </div>
          </div>
        </Fragment>
      ))}

      {reviews.length === 0 && <p>No reviews yet</p>}

      <hr />
    </>
  );
};

export default ReviewSection;
