import { useState } from "react";

import { z } from "zod";
import { Toaster } from "sonner";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { usePasswordUpdateMutation } from "@/hooks/usePasswordUpdateMutation";

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userUpdatePasswordFormSchema } from "@/validations/user-password-update-form-schema";
import { useUserUpdatePasswordSubmitButtonLogic } from "@/hooks/useUserUpdatePasswordSubmitButtonLogic";

export const UpdatePasswordView = () => {
  //* States
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] =
    useState<boolean>(false);

  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(true);

  const [isMessageErrorDisabled, setIsMessageErrorDisabled] =
    useState<boolean>(true);
  const [isMessageErrorPasswordDisabled, setIsMessageErrorPasswordDisabled] =
    useState<boolean>(true);

  //* Form
  const form = useForm<z.infer<typeof userUpdatePasswordFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(userUpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  //* Password Handler
  const toggleShowCurrentPassword = (): void => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = (): void => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowNewPasswordConfirm = (): void => {
    setShowNewPasswordConfirm(!showNewPasswordConfirm);
  };

  //* Custom hooks
  useUserUpdatePasswordSubmitButtonLogic({
    userPasswordUpdateForm: form,
    setIsSubmitButtonDisabled,
    setIsMessageErrorDisabled,
    setIsMessageErrorPasswordDisabled,
    isInputDisabled,
  });

  const passwordUpdateMutation = usePasswordUpdateMutation({
    userUpdatePasswordForm: form,
    setIsInputDisabled,
    setIsSubmitButtonDisabled,
  });

  //* Form handler
  const handleSubmit = (
    formData: z.infer<typeof userUpdatePasswordFormSchema>
  ): void => {
    passwordUpdateMutation.mutate({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      newPasswordConfirm: formData.newPasswordConfirm,
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl md:text-4xl text-teal-500">
        Editar Contraseña
      </h1>

      <div className="flex gap-4 min-h-full flex-col items-center justify-between px-6 py-4 sm:px-10 sm:py-6 2xl:px-36 2xl:py-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="max-w-md w-full flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Contraseña Actual
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <div className="relative">
                        <Input
                          disabled={isInputDisabled}
                          placeholder="Escribe tu contraseña actual..."
                          autoComplete="new-password"
                          type={showCurrentPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          className="absolute right-2 top-3 z-10"
                          type="button"
                          onClick={toggleShowCurrentPassword}
                        >
                          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
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
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Contraseña Nueva
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <div className="relative">
                        <Input
                          disabled={isInputDisabled}
                          placeholder="Escribe tu contraseña nueva..."
                          autoComplete="new-password"
                          type={showNewPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          className="absolute right-2 top-3 z-10"
                          type="button"
                          onClick={toggleShowNewPassword}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
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
              name="newPasswordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-[14px] md:text-[14.5px] font-bold">
                      Confirmar Contraseña Nueva
                    </FormLabel>
                    <FormControl className="text-[14px] md:text-[14px]">
                      <div className="relative">
                        <Input
                          disabled={isInputDisabled}
                          placeholder="Confirma tu contraseña nueva..."
                          autoComplete="new-password"
                          type={showNewPasswordConfirm ? "text" : "password"}
                          {...field}
                        />
                        <button
                          className="absolute right-2 top-3 z-10"
                          type="button"
                          onClick={toggleShowNewPasswordConfirm}
                        >
                          {showNewPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[13px]" />
                    {(form.formState.errors.newPassword ||
                      form.formState.errors.newPasswordConfirm) && (
                      <div className="text-red-500 font-medium text-[12.5px] md:text-[13px]">
                        <ul className="pl-2">
                          <li className="pl-2">✅ Al menos un dígito.</li>
                          <li className="pl-2">✅ No espacios en blanco.</li>
                          <li className="pl-2">
                            ✅ Al menos 1 carácter especial.
                          </li>
                          <li className="pl-2">
                            ✅ Mínimo 8 caracteres y máximo 15 caracteres.
                          </li>
                          <li className="pl-2">
                            ✅ Al menos una letra mayúscula y al menos una letra
                            minúscula.
                          </li>
                        </ul>
                      </div>
                    )}
                  </FormItem>
                );
              }}
            />

            {isMessageErrorDisabled ? (
              <p className="-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                ❌ Datos incompletos, completa todos los campos para actualizar
                el registro.
              </p>
            ) : isMessageErrorPasswordDisabled ? (
              <p className="-mb-2 md:-mb-3 md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-red-500 text-[12.5px] md:text-[13px] font-bold">
                ❌ Las contraseñas deben coincidir.
              </p>
            ) : (
              <p className="-mt-1 order-last md:-mt-3 md:row-start-6 md:row-end-7 md:col-start-1 md:col-end-3 mx-auto md:w-[80%] lg:w-[80%] text-center text-green-500 text-[12.5px] md:text-[13px] font-bold">
                ¡Campos completados correctamente! <br /> Para finalizar por
                favor guarde los cambios.
              </p>
            )}

            <div className="w-full mt-1 md:w-[20rem] md:mx-auto col-start-1 col-end-3 text-sm md:text-md xl:text-base">
              <Toaster position="top-center" richColors />
              <Button
                disabled={isSubmitButtonDisabled}
                type="submit"
                className={cn(
                  "w-full text-[14px]",
                  passwordUpdateMutation?.isPending &&
                    "bg-emerald-500 disabled:opacity-100 disabled:md:text-[15px] text-white"
                )}
                onClick={() => {
                  setTimeout(() => {
                    if (Object.keys(form.formState.errors).length === 0) {
                      setIsSubmitButtonDisabled(true);
                      setIsInputDisabled(true);
                    }
                  }, 100);
                }}
              >
                {passwordUpdateMutation?.isPending
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
