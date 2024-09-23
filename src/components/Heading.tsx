import React from "react";

interface HeadingProps {
  title: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({ title, center }) => {
  return (
    <div className={`${center ? "text-center" : "text-start"}`}>
      <h1 className="font-bold md:text-5xl text-4xl">{title}</h1>
    </div>
  );
};

export default Heading;
