import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { GrBook } from "react-icons/gr";
import { RiFileListLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAutoStories } from "react-icons/md";

export const links = [
  {
    label: "Home",
    path: "/home",
    icon: AiOutlineHome,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: CgProfile,
  },
  {
    label: "Search",
    path: "/search",
    icon: IoSearchOutline,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: IoIosNotificationsOutline,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: TbMessage2,
  },
  {
    label: "Dictionary",
    path: "/dictionary",
    icon: GrBook,
  },
  {
    label: "Word lists",
    path: "/word-list",
    icon: RiFileListLine,
  },
  {
    label: "Stories",
    path: "/stories",
    icon: MdOutlineAutoStories,
  },
];
