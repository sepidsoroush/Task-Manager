import { Button } from "@/components/ui/button";
import { NavItem } from "@/models/sidebar";

type Props = {
  link: NavItem;
};

const SidebarItem = ({ link }: Props) => {
  return (
    <Button
      onClick={() => {
        console.log(link.name, "menu list item - board title");
      }}
      className="group flex items-center justify-start rounded-md py-2 px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
      {link.icon && <link.icon className="h-4 w-4 mr-2" />}
      <span>{link.name}</span>
    </Button>
  );
};

export default SidebarItem;
