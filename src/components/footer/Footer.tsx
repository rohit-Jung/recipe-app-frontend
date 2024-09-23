import { FC } from "react";
import Container from "../container/Container";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface FooterProps {
  scrollToTop: () => void; 
}


const FooterMediaLinks = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    link: "https://www.facebook.com/",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/",
  },
  {
    label: "Twitter",
    icon: FaTwitter,
    link: "https://www.twitter.com/",
  },
];

const userLinks = [
  {
    label: "About Us",
    link: "/about",
  },
  {
    label: "Help & Support",
    link: "/help",
  },
  {
    label: "Contact Us",
    link: "/contact",
  },
  {
    label: "Terms & Conditions",
    link: "/terms",
  },
  {
    label: "Privacy Policy",
    link: "/privacy",
  },
];



const Footer: FC<FooterProps> = ({scrollToTop}) => {
  return (
    <>
      <div className="py-16 mt-20 text-black w-full bg-slate-100 z-40 ">
        <Container>
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-1/2 space-y-6" onClick={scrollToTop}>
              <Link to={"/"} className="logo cursor-pointer bg-red-500">
                <img src="/logo.svg" alt="Logo" className="size-52" />
              </Link>
              <div className="w-1/2 text-sm hidden md:block text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                quam fugiat quisquam! Officia repudiandae qui ea ducimus
                explicabo. Autem, tenetur. Reprehenderit illo earum inventore
                dolor voluptatem repellat odio debitis qui?
              </div>
              <div className="social-medias flex flex-col md:flex-row md:items-center items-start justify-start w-full gap-5">
                {FooterMediaLinks.map((link) => (
                  <a
                    href={link.link}
                    key={link.label}
                    className="flex gap-3 text-[#F48E28] items-center justify-center"
                  >
                    <span className="hover:text-slate-500  md:size-10 size-7 rounded-full p-2 bg-[#F5DDC4] flex items-center justify-center">
                      <link.icon size={23} />
                    </span>
                    <h1 className="md:hidden flex">{link.label}</h1>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 w flex items-start gap-24">
              <div className="md:flex hidden flex-col gap-4">
                <h1 className="text-3xl font-bold mb-5">User Links</h1>
                {userLinks.map((link) => (
                  <a
                    href={link.link}
                    key={link.label}
                    className="text-sm text-gray-500 hover:text-slate-500 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold mb-5">Contact Us</h1>
                <p className="text-sm text-gray-500 hover:text-slate-500 hover:underline">
                  1234 Country Club Ave
                </p>
                <p className="text-sm text-gray-500 hover:text-slate-500 hover:underline">
                  NC 123456, London, UK
                </p>
                <p className="text-sm text-gray-500 hover:text-slate-500 hover:underline">
                  +0123 456 7891
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
