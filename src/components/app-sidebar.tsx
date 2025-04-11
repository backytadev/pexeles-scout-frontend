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
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useSocket } from "@/hooks/useSocket";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/enums/user-role.enum";
import { useAuthStore } from "@/stores/auth/auth.store";
// import { getKeyTokenByLastThree } from "@/helpers/get-key-token-by-last-three";

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
  //* Global States
  // const tokenStore = useAuthStore((state) => state.token);
  const authStatus = useAuthStore((state) => state.status);

  //* Hooks
  const { data } = useAuth();
  const { socket, online, connectSocket } = useSocket(
    import.meta.env.VITE_API_URL_SOCKET
    // tokenStore
  );

  // const getKeyTokenByLastThree = (): string | null => {
  //   const lastThree = tokenStore?.slice(-3);
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);

  //     if (key?.endsWith(lastThree!)) {
  //       return key;
  //     }
  //   }
  //   return null;
  // };

  //* Effects
  useEffect(() => {
    if (authStatus === "authorized") {
      connectSocket();
    }
  }, [authStatus, connectSocket]);

  //* Effects (events socket)
  useEffect(() => {
    socket?.emit("user-connected");
  }, [socket]);

  useEffect(() => {
    const handleWelcomeMessage = (message: string) => {
      toast.success(message, {
        position: "top-right",
      });
    };

    if (sessionStorage.length) {
      socket?.on("welcome-message", handleWelcomeMessage);
    }
  }, [socket]);

  useEffect(() => {
    socket?.emit("super-user-connected", data?.roles);
  }, [socket, data]);

  useEffect(() => {
    if (data?.roles && !data?.roles.includes(UserRole.SuperUser)) {
      socket?.on("super-user-message", (message) => {
        toast.success(message, {
          position: "top-right",
        });
      });
    }
  }, [socket, data]);

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
                onClick={() => logoutUser()}
                className="flex w-full items-center gap-x-2 p-2 cursor-pointer"
              >
                <LogOut className="text-red-500 w-5" />
                <span className="text-sm text-red-500 font-medium">Salir</span>
              </a>

              <p>
                <span className="font-medium">Service Status:</span>{" "}
                {online ? (
                  <span className="text-sm text-green-500 font-medium">
                    Online
                  </span>
                ) : (
                  <span className="text-sm text-red-500 font-medium">
                    Offline
                  </span>
                )}
              </p>
            </SidebarMenu>
            <Toaster position="bottom-center" richColors />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
