import { ModeToggle } from "../theme/ModeToggle";
import SidebarItem from "./SidebarItem";
import { SIDEBAR } from "@/utils/siteInfo";

const Sidebar = () => {
  return (
    <nav className="hidden md:grid items-start gap-4">
      <h2 className="min-w-max pl-8 pt-4 pb-0 uppercase tracking-[2px]">
        All boards (3)
      </h2>
      {SIDEBAR.map((item, index) => {
        return <SidebarItem key={index} link={item} />;
      })}
      <ModeToggle />
    </nav>
  );
};

export default Sidebar;
