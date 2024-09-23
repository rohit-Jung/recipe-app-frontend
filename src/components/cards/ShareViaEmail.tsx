import React from "react";
import { IRecipe } from "@/types";
import { BiLogoGmail } from "react-icons/bi";

interface ShareRecipeViaEmailProps {
  recipe: IRecipe;
}

const ShareRecipeViaEmail: React.FC<ShareRecipeViaEmailProps> = ({
  recipe,
}) => {
  const {
    name,
    description,
    image_url,
    difficulty,
    tags,
    servings,
    category,
    cooking_time,
    prep_time,
  } = recipe;

  const handleShareViaEmail = () => {
    const subject = encodeURIComponent(`Check out this recipe: ${name}`);

    const body = encodeURIComponent(`
      Hi,
      I found this amazing recipe for ${name}!
      
      Description: ${description}
      Difficulty: ${difficulty}
      Tags: ${tags.join(", ")}
      Servings: ${servings}
      Category: ${category}
      Cooking Time: ${cooking_time}
      Preparation Time: ${prep_time}
      
      You can view it here: ${image_url}
    `);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <button onClick={handleShareViaEmail}>
      <BiLogoGmail size={24} className="text-blue-800" />
    </button>
  );
}; 

export default ShareRecipeViaEmail;
