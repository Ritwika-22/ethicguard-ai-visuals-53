
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLocation, NavLink } from "react-router-dom";
import {
  Shield,
  Eye,
  User,
  Activity,
  Settings,
} from "lucide-react";

const sidebarItems = [
  {
    key: "shadow",
    label: "Shadow Mode",
    icon: Shield,
    path: "/dashboard/shadow",
    tooltip: "Safely test AI decisions in the background."
  },
  {
    key: "visualizer",
    label: "Privacy Visualizer",
    icon: Eye,
    path: "/dashboard/visualizer",
    tooltip: "See how and where your data is moving."
  },
  {
    key: "consent",
    label: "Consent Manager",
    icon: User,
    path: "/dashboard/consent",
    tooltip: "Easily control data sharing options."
  },
  {
    key: "risk",
    label: "Risk Monitor",
    icon: Activity,
    path: "/dashboard/risk",
    tooltip: "Live alerts for risks and concerns."
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    tooltip: "Profile and appearance settings."
  },
];

export default function DashboardSidebar() {
  const location = useLocation();
  return (
    <Sidebar className="bg-sidebar dark:bg-ethic-navy text-sidebar-foreground min-h-screen shadow-lg">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold text-ethic-green pl-2 mb-1">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map(item => (
                <SidebarMenuItem key={item.key}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink to={item.path} end>
                        <SidebarMenuButton
                          isActive={location.pathname === item.path}
                          tooltip={item.tooltip}
                          variant="default"
                          size="lg"
                          className="transition-all"
                        >
                          <item.icon className="text-ethic-accent" aria-hidden />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.tooltip}</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
