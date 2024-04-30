import { Button } from "@/components/ui/button";
import { GitHubIcon, GoogleIcon, TwitterIcon } from "./ProviderIcons";

const providers = [
  { name: "Google", icon: <GoogleIcon /> },
  { name: "Twitter", icon: <TwitterIcon /> },
  { name: "GitHub", icon: <GitHubIcon /> },
];

export const OAuthButtonGroup = () => (
  <div>
    {providers.map(({ name, icon }) => (
      <Button key={name}>
        <div>Sign in with {name}</div>
        {icon}
      </Button>
    ))}
  </div>
);
