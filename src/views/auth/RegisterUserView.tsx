/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useState } from "react";

import { z } from "zod";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";

import { userFormSchema } from "@/validations/user-form-schema";

import { useUserCreationMutation } from "@/hooks/useUserCreationMutation";
import { useUserCreationSubmitButtonLogic } from "@/hooks/useUserCreationSubmitButtonLogic";

import { useAuth } from "@/hooks/useAuth";
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

export const RegisterUserView = () => {
  //* States
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(true);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const [isMessageErrorRolesDisabled, setIsMessageErrorRolesDisabled] =
    useState<boolean>(true);
  const [isMessageErrorDisabled, setIsMessageErrorDisabled] =
    useState<boolean>(true);
  const [isMessageErrorPasswordDisabled, setIsMessageErrorPasswordDisabled] =
    useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof userFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstNames: "",
      lastNames: "",
      email: "",
      password: "",
      passwordConfirm: "",
      roles: [],
    },
  });

  //* Password handler
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowPasswordConfirm = (): void => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  //* Custom Hooks
  const { data, isLoading, isError } = useAuth();

  useUserCreationSubmitButtonLogic({
    userCreationForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsMessageErrorPasswordDisabled,
    setIsMessageErrorRolesDisabled,
    isInputDisabled,
  });

  const userCreationMutation = useUserCreationMutation({
    userCreationForm: form,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Form handler
  const handleSubmit = (formData: z.infer<typeof userFormSchema>): void => {
    userCreationMutation.mutate({
      firstNames: formData.firstNames,
      lastNames: formData.lastNames,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
      roles: formData.roles,
    });
  };

  //* Validations
  if (isLoading) {
    return (
      <div className="text-center text-blue-500 font-medium">Cargando...</div>
    );
  }

  if (isError) {
    return (
      <span className="text-center text-red-500 font-medium">
        Error al cargar info del usuario
      </span>
    );
  }

  if (!data?.roles.includes(UserRole.SuperUser)) {
    return (
      <div className="my-10 text-center bg-red-100 text-red-600 p-4 rounded-md shadow-md">
        <p className="text-2xl font-bold">No tiene permisos para acceder</p>
        <p className="mt-2 text-lg">
          No cuenta con el rol adecuado para esta operación. debe tener el rol
          de Super-Usuario.
        </p>
      </div>
    );
  }

  if (data?.roles.includes(UserRole.SuperUser))
    return (
      <div>
        <h1 className="text-center font-bold text-3xl md:text-4xl text-teal-500">
          Registrar Usuario
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
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                        Contraseña
                      </FormLabel>
                      <FormControl className="text-[14px] md:text-[14px]">
                        <div className="relative">
                          <Input
                            disabled={isInputDisabled}
                            placeholder="Contraseña"
                            autoComplete="new-password"
                            className="text-[14px]"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            className="absolute right-2 top-3 z-10"
                            type="button"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-[13px]" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                        Confirmar Contraseña
                      </FormLabel>
                      <FormControl className="text-[14px] md:text-[14px]">
                        <div className="relative">
                          <Input
                            disabled={isInputDisabled}
                            placeholder="Confirmar contraseña"
                            autoComplete="new-password"
                            className="text-[14px]"
                            type={showPasswordConfirm ? "text" : "password"}
                            {...field}
                          />
                          <button
                            className="absolute right-2 top-3 z-10"
                            type="button"
                            onClick={toggleShowPasswordConfirm}
                          >
                            {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
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
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                        Roles
                      </FormLabel>
                      <FormDescription className="text-[13.5px] md:text-[14px]">
                        Seleccione los roles de acceso que tendrá el usuario.
                      </FormDescription>
                    </div>
                    {Object.values(UserRole).map((role) => (
                      <FormField
                        key={role}
                        control={form.control}
                        name="roles"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={role}
                              className="flex flex-row items-center space-x-2 space-y-0"
                            >
                              <FormControl className="text-[14px] md:text-[14px]">
                                <Checkbox
                                  disabled={isInputDisabled}
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
                              <FormLabel className="text-[14px] font-medium cursor-pointer">
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
                <p className="-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                  ❌ Datos incompletos, completa todos los campos para crear el
                  registro.
                </p>
              ) : isMessageErrorPasswordDisabled ? (
                <p className="-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                  ❌ Las contraseñas deben coincidir.
                </p>
              ) : isMessageErrorRolesDisabled ? (
                <p className="-mb-4 md:-mb-3 md:row-start-4 md:row-end-5 md:col-start-1 md:col-end-3 mx-auto md:w-[100%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                  ❌ Debes elegir al menos un rol para el usuario.
                </p>
              ) : (
                <p className="-mt-3 order-last md:-mt-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold">
                  ¡Campos completados correctamente! <br />
                </p>
              )}

              <div className="mt-2 col-start-1 col-end-3 row-start-2 row-end-3 w-full md:w-[20rem] md:m-auto">
                <Toaster position="top-center" richColors />
                <Button
                  disabled={isSubmitButtonDisabled}
                  type="submit"
                  className={cn("w-full text-[14px] cursor-pointer")}
                  onClick={() => {
                    setTimeout(() => {
                      if (Object.keys(form.formState.errors).length === 0) {
                        setIsSubmitButtonDisabled(true);
                        setIsInputDisabled(true);
                      }
                    }, 100);
                  }}
                >
                  Registrar Usuario
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
};
