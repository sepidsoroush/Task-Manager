import { Logo } from "@/components/shared/Logo";

import NewTask from "@/components/tasks/NewTask";
import { ModeToggle } from "../theme/ModeToggleMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b">
      <div className="flex h-16 w-full items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Logo />
          <div className="text-lg md:text-xl">Task Manager</div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2">
          <NewTask />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
