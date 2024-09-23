import { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaCopy } from "react-icons/fa";
import { Input } from "../ui/input";
import { IRecipe } from "@/types";
import ShareRecipeViaEmail from "./ShareViaEmail";

const ShareCard = ({ link, recipe }: { link: string; recipe?: IRecipe }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4 py-4 ">
      <div className="flex items-center space-x-2 border rounded-md p-2 shadow-inner">
        <Input
          type="text"
          className="outline-none bg-transparent border-none focus:outline-none focus-within:outline-none focus:border-none shadow-none text-black font-semibold pointer-events-none"
          value={link}
          readOnly
        />
        <button
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          onClick={copyToClipboard}
        >
          <FaCopy size={18} />
          {copied ? <span>Copied!</span> : <span>Copy</span>}
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-between items-center px-10 pt-3">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900"
        >
          <FaLinkedin size={24} />
        </a>
        {recipe && <ShareRecipeViaEmail recipe={recipe} />}
      </div>
    </div>
  );
};

export default ShareCard;
