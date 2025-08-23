import { SidebarNav } from "./sidebar-nav";
import { generateMeta } from "@/lib/utils";

export async function generateMetadata() {
  return generateMeta({
    title: "Settings Page",
    description:
      "Example of settings page and form created using react-hook-form and Zod validator. Built with Tailwind CSS and React.",
    canonical: "/pages/settings"
  });
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/pages/settings"
  },
  {
    title: "Account",
    href: "/dashboard/pages/settings/account"
  },
  {
    title: "Appearance",
    href: "/dashboard/pages/settings/appearance"
  },
  {
    title: "Notifications",
    href: "/dashboard/pages/settings/notifications"
  },
  {
    title: "Display",
    href: "/dashboard/pages/settings/display"
  }
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mb-6 space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-6">
        <div className="flex-1 lg:max-w-2xl">{children}</div>
        <aside className="lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
      </div>
    </>
  );
}
