/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";

import { type UseFormReturn } from "react-hook-form";
import { type UserFormData } from "@/interfaces/user-form-data.interface";

interface Options {
  isInputDisabled: boolean;
  userUpdateForm: UseFormReturn<UserFormData, any, UserFormData>;
  setIsSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMessageErrorDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useUserUpdateSubmitButtonLogic = ({
  userUpdateForm,
  setIsSubmitButtonDisabled,
  setIsMessageErrorDisabled,
  isInputDisabled,
}: Options): void => {
  //* Watchers
  const firstNames = userUpdateForm.watch("firstNames");
  const lastNames = userUpdateForm.watch("lastNames");
  const email = userUpdateForm.watch("email");
  const roles = userUpdateForm.watch("roles");

  //* Effects
  useEffect(() => {
    if (
      userUpdateForm.formState.errors &&
      Object.values(userUpdateForm.formState.errors).length > 0
    ) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (firstNames && lastNames && email && roles && !isInputDisabled) {
      setIsSubmitButtonDisabled(false);
      setIsMessageErrorDisabled(false);
    }

    if (!firstNames || !lastNames || !email || !roles) {
      setIsSubmitButtonDisabled(true);
      setIsMessageErrorDisabled(true);
    }

    if (roles?.length === 0) {
      setIsSubmitButtonDisabled(true);
    }
  }, [userUpdateForm.formState, firstNames, lastNames, email, roles]);
};
