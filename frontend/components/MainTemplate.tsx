import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Template = {
  header?: React.ReactElement;
  footer?: React.ReactElement;
  children: React.ReactNode;
};
export default function MainTemplates({ header, footer, children }: Template) {
  return (
    <>
      {header ? header : <NavBar />}
      <main className="relative">{children}</main>
      {footer ? footer : <Footer />}
    </>
  );
}
