/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import { useEffect } from "react";
import { type UseFormReturn } from "react-hook-form";

import { useAuth } from "@/hooks/useAuth";

import { type UserRole } from "@/enums/user-role.enum";
import { type UserFormData } from "@/interfaces/user-form-data.interface";

interface Options {
  userUpdateForm: UseFormReturn<UserFormData, any, UserFormData>;
}

export const useLoadUserData = ({ userUpdateForm }: Options): void => {
  const { data, isLoading } = useAuth();

  //* Set data
  useEffect(() => {
    userUpdateForm.setValue(
      "firstNames",
      isLoading ? "Cargando..." : data?.firstNames!
    );
    userUpdateForm.setValue("lastNames", data?.lastNames! ?? "Cargando...");
    userUpdateForm.setValue("email", data?.email! ?? "Cargando...");
    if (Array.isArray(data?.roles)) {
      userUpdateForm.setValue("roles", data?.roles as unknown as UserRole[]);
    }
  }, [data, isLoading]);
};
