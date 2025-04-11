/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useState } from "react";

import { z } from "zod";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { userFormSchema } from "@/validations/user-form-schema";

import { useUserUpdateMutation } from "@/hooks/useUserUpdateMutation";
import { useUserUpdateSubmitButtonLogic } from "@/hooks/useUserUpdateSubmitButtonLogic";

import { UserRole, UserRoleNames } from "@/enums/user-role.enum";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoadUserData } from "@/hooks/useLoadUserData";
import { useAuth } from "@/hooks/useAuth";

export const UpdateProfileView = () => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] =
    useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      email: "",
      roles: [],
    },
  });

  //* Custom Hooks
  const { data } = useAuth();

  useLoadUserData({
    userUpdateForm: form,
  });

  useUserUpdateSubmitButtonLogic({
    userUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    isInputDisabled,
  });

  const userUpdateMutation = useUserUpdateMutation({
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof userFormSchema>): void => {
    userUpdateMutation.mutate({
      firstNames: formData.firstNames,
      lastNames: formData.lastNames,
      email: formData.email,
      roles: formData.roles,
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl md:text-4xl text-teal-500">
        Editar Perfil
      </h1>

      <div className="flex gap-4 min-h-full flex-col items-center justify-between px-6 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="firstNames"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Nombres
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <Input
                        disabled={isInputDisabled}
                        placeholder="Nombres del usuario"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="lastNames"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Apellidos
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <Input
                        disabled={isInputDisabled}
                        placeholder="Apellidos del usuario"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Correo Electrónico
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <Input
                        disabled={isInputDisabled}
                        placeholder="Dirección de correo electrónico"
                        type="email"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="roles"
              render={() => (
                <FormItem className="md:col-start-1 md:col-end-2 md:row-start-3 md:row-end-4 mb-3 md:mb-0">
                  <div className="mb-4">
                    <FormLabel className="text-[14px] sm:text-[15px] lg:text-[17px] font-bold">
                      Roles
                    </FormLabel>
                    <FormDescription className="text-slate-600 font-medium text-sm lg:text-[15px]">
                      Seleccione los roles de acceso que tendrá el usuario.
                    </FormDescription>
                  </div>
                  {Object.values(UserRole).map((role) => (
                    <FormField
                      key={role}
                      control={form.control}
                      name="roles"
                      render={({ field }) => {
                        const disabledRoles = [UserRole.SuperUser];
                        const isDisabled =
                          !data?.roles?.includes(UserRole.SuperUser) &&
                          disabledRoles?.includes(role);
                        return (
                          <FormItem
                            key={role}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl className="text-[14px] md:text-[14px]">
                              <Checkbox
                                disabled={isDisabled || isInputDisabled}
                                checked={field.value?.includes(role)}
                                onCheckedChange={(checked) => {
                                  let updatedRoles: UserRole[] = [];
                                  checked
                                    ? (updatedRoles = field.value
                                        ? [...field.value, role]
                                        : [role])
                                    : (updatedRoles =
                                        field.value?.filter(
                                          (value) => value !== role
                                        ) ?? []);

                                  field.onChange(updatedRoles);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm lg:text-[15px] font-normal">
                              {UserRoleNames[role]}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />

            {isMessageErrorDisabled ? (
              <p className="-mb-2 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                ❌ Datos incompletos, completa todos los campos para guardar el
                registro.
              </p>
            ) : (
              <p className="-mt-1 order-last md:-mt-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold">
                ¡Campos completados correctamente! <br /> Para finalizar por
                favor guarde los cambios.
              </p>
            )}

            <div className="w-full md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base">
              <Toaster position="top-center" richColors />
              <Button
                disabled={isSubmitButtonDisabled}
                type="submit"
                className={cn(
                  "w-full text-[14px] cursor-pointer",
                  userUpdateMutation?.isPending &&
                    "bg-emerald-500 hover:bg-emerald-500 disabled:opacity-100 disabled:md:text-[15px] text-white"
                )}
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsInputDisabled(true);
                      setIsSubmitButtonDisabled(true);
                    }
                  }, 100);
                }}
              >
                {userUpdateMutation?.isPending
                  ? "Procesando..."
                  : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
