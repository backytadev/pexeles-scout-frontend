import { useState } from "react";

import { Toaster } from "sonner";

import { getAllUsers } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/enums/user-role.enum";

import { useUserEliminationMutation } from "@/hooks/useUserEliminationMutation";

export const DeleteUserView = () => {
  //* States
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  //* Queries
  const { data, isError, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsers,
    retry: false,
    refetchOnWindowFocus: false,
  });

  //* Custom hooks
  const { data: user } = useAuth();

  const userInactivationMutation = useUserEliminationMutation({
    setIsButtonDisabled,
  });

  //* Form handler
  const handleSubmit = (userId: string): void => {
    setIsButtonDisabled(true);

    userInactivationMutation.mutate(userId);
  };

  //* Validations
  if (isLoading) {
    return (
      <div className="text-center text-blue-500 font-medium">
        Cargando usuarios...
      </div>
    );
  }

  if (isError) {
    return (
      <span className="text-center text-red-500 font-medium">
        Error al cargar archivos
      </span>
    );
  }

  if (!user?.roles.includes(UserRole.SuperUser)) {
    return (
      <div className="my-10 text-center bg-red-100 text-red-600 p-4 rounded-md shadow-md">
        <p className="text-2xl font-bold">No tiene permisos para acceder</p>
        <p className="mt-2 text-lg">
          No cuenta con el rol adecuado para esta operación, debe tener el rol
          de Super-Usuario.
        </p>
      </div>
    );
  }

  if (user?.roles.includes(UserRole.SuperUser))
    return (
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-teal-500 mb-8">
          Eliminar Usuario
        </h1>

        {data?.length && data?.length >= 1 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="space-y-4">
                  <div>
                    <strong className="text-teal-500">Nombre:</strong>{" "}
                    {item.firstNames} {item.lastNames}
                  </div>
                  <div>
                    <strong className="text-teal-500">Email:</strong>{" "}
                    {item.email}
                  </div>
                  <div>
                    <strong className="text-teal-500">Roles:</strong>{" "}
                    {item.roles.join(", ")}
                  </div>
                </div>

                <Toaster position="top-center" richColors />
                <Button
                  disabled={isButtonDisabled}
                  className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                  onClick={() => {
                    handleSubmit(item._id);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-10 text-center bg-red-100 text-red-600 p-4 rounded-md shadow-md">
            <p className="text-2xl font-bold">No se encontraron usuarios</p>
            <p className="mt-2 text-lg">
              Actualmente no hay usuarios disponibles para mostrar.
            </p>
          </div>
        )}
      </div>
    );
};
