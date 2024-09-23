import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="w-full p-2 mx-auto max-w-7xl">{children}</div>;
}

export default Container;
