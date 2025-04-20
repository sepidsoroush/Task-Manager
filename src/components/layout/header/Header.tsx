import { Logo } from "@/components/shared/Logo";

import NewTask from "@/components/tasks/NewTask";
import Logout from "@/components/auth/Logout";
import EditBoard from "@/components/boards/EditBoard";
import { ModeToggle } from "@/components/layout/theme/ModeToggleMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b">
      <div className="flex h-16 w-full items-center justify-between md:p-4 p-2">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-lg md:text-xl">Task Manager</div>
        </div>
        <div className="flex flex-row justify-start items-end gap-1 md:gap-2">
          <NewTask />
          <EditBoard />
          <ModeToggle />
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
