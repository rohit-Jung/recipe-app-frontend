import { FC } from "react";

import { RecipeForm } from "@/components";

import { BreadcrumbItemProps, Breadcrumbs } from "@/components/BreadCrumbs";
import { useLocation } from "react-router-dom";

const EditRecipePage: FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const breadcrumbItems: BreadcrumbItemProps[] = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "My Recipes",
      link: "/my-recipes",
    },
    {
      title: "Edit Recipe",
      link: pathname,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <RecipeForm isUpdate/>
    </>
  );
};

export default EditRecipePage;
