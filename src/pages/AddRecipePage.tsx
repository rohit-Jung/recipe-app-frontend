import { FC } from "react";
import { RecipeForm } from "@/components";
import { BreadcrumbItemProps, Breadcrumbs } from "@/components/BreadCrumbs";

const AddRecipePage: FC = () => {
  const breadcrumbItems: BreadcrumbItemProps[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Add Recipe",
      link: "/add",
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <RecipeForm />
    </>
  );
};

export default AddRecipePage;
