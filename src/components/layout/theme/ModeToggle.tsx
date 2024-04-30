import { IconMoon, IconSun } from "@tabler/icons-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row gap-2 justify-start items-center">
      <IconSun className="h-[1.2rem] w-[1.2rem]" />

      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <IconMoon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  );
}
