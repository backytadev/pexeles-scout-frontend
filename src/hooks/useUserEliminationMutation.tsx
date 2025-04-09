/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { deleteUser } from "@/api/AuthAPI";

import { type ErrorResponse } from "@/interfaces/error-response.interface";

interface Options {
  setIsButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserEliminationMutation = ({
  setIsButtonDisabled,
}: Options): UseMutationResult<
  string | undefined,
  ErrorResponse,
  any,
  unknown
> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: deleteUser,
    onError: (error: ErrorResponse) => {
      if (error.message !== "Unauthorized") {
        toast.error(error.message, {
          position: "top-center",
          className: "justify-center",
        });

        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 2000);
      }

      if (error.message === "Unauthorized") {
        toast.error(
          "Operación rechazada, el token expiro ingresa nuevamente.",
          {
            position: "top-center",
            className: "justify-center",
          }
        );

        setTimeout(() => {
          navigate("/");
        }, 3500);
      }
    },
    onSuccess: () => {
      toast.success("Registro eliminado correctamente.", {
        position: "top-center",
        className: "justify-center",
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["all-users"] });
      }, 500);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    },
  });

  return mutation;
};
