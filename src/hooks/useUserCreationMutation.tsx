/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { type UseFormReturn } from "react-hook-form";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { createUser } from "@/api/AuthAPI";

import { type UserFormData } from "@/interfaces/user-form-data.interface";
import { type ErrorResponse } from "@/interfaces/error-response.interface";

interface Options {
  userCreationForm: UseFormReturn<UserFormData, any, UserFormData>;
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserCreationMutation = ({
  userCreationForm,
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

  //* Mutation
  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error: ErrorResponse) => {
      if (error.message !== "Unauthorized") {
        toast.error(error?.response?.data?.error, {
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
          navigate("/register-user");
        }, 3500);
      }
    },
    onSuccess: () => {
      toast.success("Registro creado exitosamente.", {
        position: "top-center",
        className: "justify-center",
      });

      setTimeout(() => {
        navigate("/register-user");
      }, 1600);

      setTimeout(() => {
        userCreationForm.reset();
        setIsInputDisabled(false);
      }, 1700);
    },
  });

  return mutation;
};
