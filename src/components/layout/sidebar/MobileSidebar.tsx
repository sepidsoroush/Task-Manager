import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItem } from "@/models/sidebar";
import ToggleMode from "./ToggleMode";
import SidebarItem from "./SidebarItem";
import { IconMenu2 } from "@tabler/icons-react";

type Props = {
  links: NavItem[];
};

export function MobileSidebar({ links }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <IconMenu2 />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>All boards (3)</SheetTitle>
        </SheetHeader>
        <div className="grid items-start gap-4">
          {links.map((link) => (
            <SidebarItem key={link.name} link={link} />
          ))}
        </div>
        <SheetFooter>
          <ToggleMode />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
