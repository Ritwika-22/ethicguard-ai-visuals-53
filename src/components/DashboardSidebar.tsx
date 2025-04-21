
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
  UserCheck,
  Monitor,
  Settings,
  AlertTriangle,
} from "lucide-react";

// Sidebar items, now matching your desired icons and labels.
const sidebarItems = [
  {
    key: "shadow",
    label: "Shadow Mode",
    icon: Shield,
    path: "/dashboard/shadow",
    tooltip: "Safely test AI decisions in real time.",
  },
  {
    key: "visualizer",
    label: "Privacy Visualizer",
    icon: Eye,
    path: "/dashboard/visualizer",
    tooltip: "See how and where your data is moving.",
  },
  {
    key: "consent",
    label: "Consent Manager",
    icon: UserCheck,
    path: "/dashboard/consent",
    tooltip: "Control data sharing options.",
  },
  {
    key: "risk",
    label: "Real-Time Risk Monitor",
    icon: Monitor,
    path: "/dashboard/risk",
    tooltip: "Live alerts for risks and concerns.",
  },
  {
    key: "risk-analysis",
    label: "Risk Analysis",
    icon: AlertTriangle,
    path: "/risk-analysis",
    tooltip: "Comprehensive risk analysis dashboard.",
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    tooltip: "Profile and appearance settings.",
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
