import { UserCircle, UserCog, Lock, Search, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarMenu,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Registrar Usuario",
    url: "/register-user",
    icon: UserCog,
  },
  {
    title: "Editar Perfil",
    url: "/user/edit-profile",
    icon: UserCircle,
  },
  {
    title: "Editar Contraseña",
    url: "/user/edit-password",
    icon: Lock,
  },
  {
    title: "Eliminar Usuario",
    url: "/user/delete",
    icon: Lock,
  },
  {
    title: "Búsqueda",
    url: "/search",
    icon: Search,
  },
];

interface Props {
  logoutUser: () => void;
}

export function AppSidebar({ logoutUser }: Props) {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl font-bold text-teal-500 mb-4">
            Pexeles Scout
          </SidebarGroupLabel>
          <SidebarGroupLabel className="text-sm font-medium text-slate-500 mb-4">
            Banco de imágenes para consultar.
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="text-teal-500 w-[5rem]" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <a
                onClick={logoutUser}
                className="flex w-full items-center gap-x-2 p-2 cursor-pointer"
              >
                <LogOut className="text-red-500 w-5" />
                <span className="text-sm text-red-500 font-medium">Salir</span>
              </a>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
