import { Outlet, useParams } from "react-router-dom";
import ContentNavbar from "../content-navbar";
import { CONTENT_NAVBAR_LINKS } from "@/constants/content-navbar-links";

export default function ClassLayout() {
  const { class_id } = useParams();

  return (
    <div className="relative w-full">
      <nav className="sticky inset-x-0 top-[68px] flex border-b-2 bg-bgWhite px-7">
        <ContentNavbar navlinks={CONTENT_NAVBAR_LINKS} id={class_id!} />
      </nav>
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
