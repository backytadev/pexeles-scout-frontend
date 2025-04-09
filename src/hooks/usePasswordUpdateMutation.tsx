/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";

import { changePassword } from "@/api/AuthAPI";

import { type ErrorResponse } from "@/interfaces/error-response.interface";
import { UserPasswordUpdateFormData } from "@/interfaces/user-password-update-form-data.interface";

interface Options {
  userUpdatePasswordForm: UseFormReturn<
    UserPasswordUpdateFormData,
    any,
    UserPasswordUpdateFormData
  >;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const usePasswordUpdateMutation = ({
  userUpdatePasswordForm,
  setIsInputDisabled,
  setIsSubmitButtonDisabled,
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
    mutationFn: changePassword,
    onError: (error: ErrorResponse) => {
      if (error.message !== "Unauthorized") {
        toast.error(error.response.data.error, {
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
        userUpdatePasswordForm.reset();
        setIsInputDisabled(false);
      }, 1500);
    },
  });

  return mutation;
};
