import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmProps {
  trigger: React.ReactNode;
  label?: string;
  description?: string;
  handleConfirm: () => void;
}

const DeleteConfirm: FC<DeleteConfirmProps> = ({
  trigger,
  label,
  description,
  handleConfirm,
}) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {label ? label : "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description ? description : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={handleConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirm;
