import React from "react";
import * as AiIcons from "react-icons/ai";
import { auth } from "../../helpers/auth";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    show: auth(1),
  },
  {
    title: "Trades",
    path: "/trades",
    icon: <AiIcons.AiFillSignal />,
    cName: "nav-text",
    show: auth(2),
  },

  {
    title: "Settings",
    path: "/settings",
    icon: <AiIcons.AiTwotoneTool />,
    cName: "nav-text",
    show: auth(5),
  },
  {
    title: "history",
    path: "/history",
    icon: <AiIcons.AiOutlineAlignRight />,
    cName: "nav-text",
    show: auth(3),
  },
  {
    title: "permissions",
    path: "/permissions",
    icon: <AiIcons.AiFillSafetyCertificate />,
    cName: "nav-text",
    show: auth(4),
  },
];
