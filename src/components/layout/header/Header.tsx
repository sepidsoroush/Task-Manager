import MoreInfoButton from "./MoreInfoButton";
import NewTask from "@/components/tasks/NewTask";
import { Logo } from "@/components/shared/Logo";
import { MobileSidebar } from "../sidebar/MobileSidebar";
import { SIDEBAR } from "@/utils/siteInfo";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b">
      <div className="flex h-16 w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="hidden items-center space-x-2 md:flex text-xl">
            Kanban Dashboard
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-1">
          <NewTask />
          <MoreInfoButton />
          <div className="grid md:hidden">
            <MobileSidebar links={SIDEBAR} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
