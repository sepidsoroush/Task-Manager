import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavItem } from "@/models/sidebar";
import ToggleMode from "./ToggleMode";
import SidebarItem from "./SidebarItem";

type Props = {
  links: NavItem[];
};

export function MobileSidebar({ links }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetClose asChild>
        <Button type="submit">Close</Button>
      </SheetClose>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Mobile Sidebar</SheetTitle>
          {/* <SheetDescription>Mobile Sidebar</SheetDescription> */}
        </SheetHeader>
        {links.map((link) => (
          <SidebarItem key={link.name} link={link} />
        ))}

        <SheetFooter>
          <ToggleMode />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
