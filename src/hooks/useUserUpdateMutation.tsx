import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { updateProfile } from "@/api/AuthAPI";

import { UserFormData } from "@/interfaces/user-form-data.interface";
import { type ErrorResponse } from "@/interfaces/error-response.interface";

interface Options {
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserUpdateMutation = ({
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
}: Options): UseMutationResult<
  string | undefined,
  ErrorResponse,
  UserFormData,
  unknown
> => {
  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* QueryClient
  const queryClient = useQueryClient();

  //* Mutation
  const mutation = useMutation({
    mutationFn: updateProfile,
    onError: (error: ErrorResponse) => {
      if (error.message !== "Unauthorized") {
        toast.error(error.message, {
          position: "top-center",
          className: "justify-center",
        });

        setTimeout(() => {
          setIsInputDisabled(false);
          setIsSubmitButtonDisabled(false);
        }, 1500);
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
      toast.success("Cambios guardados correctamente", {
        position: "top-center",
        className: "justify-center",
      });

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["users-by-term"] });
      }, 700);

      setTimeout(() => {
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
