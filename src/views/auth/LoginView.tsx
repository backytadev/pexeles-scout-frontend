import { useState } from "react";

import { type z } from "zod";
import { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/stores/auth/auth.store";

import { cn } from "@/lib/utils";

import { loginSchema } from "@/validations/login-schema";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginView() {
  //* States
  const loginUser = useAuthStore((state) => state.loginUser);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);

  //* Hooks (external libraries)
  const navigate = useNavigate();

  //* Form
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //* Password handler
  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  //* Form handler
  const handleSubmit = async (
    values: z.infer<typeof loginSchema>
  ): Promise<void> => {
    try {
      await loginUser(values.email, values.password);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          toast.error(error?.response?.data?.error, {
            position: "top-right",
          });
        }

        setTimeout(() => {
          if (Object.keys(form.formState.errors).length === 0) {
            setIsInputDisabled(false);
          }
        }, 1000);

        return;
      }

      throw new Error("No se pudo autenticar.");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Inicia sesión
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ingresa tus credenciales para continuar
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-3 md:gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-[14px] md:text-[14.5px] font-me">
                    Correo Electrónico
                  </FormLabel>
                  <FormControl className="text-[14px] md:text-[14px]">
                    <Input
                      disabled={isInputDisabled}
                      placeholder="Ejem: super.user@google.com"
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
                  <FormLabel className="text-[14px] md:text-[14.5px] font-medium">
                    Contraseña
                  </FormLabel>
                  <FormControl className="text-[14px] md:text-[14px]">
                    <div className="relative">
                      <Input
                        disabled={isInputDisabled}
                        placeholder="Escribe tu contraseña"
                        autoComplete="new-password"
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

          <div className="mt-2 col-start-1 col-end-3 row-start-2 h-full row-end-3 w-full md:m-auto">
            <Toaster position="bottom-center" richColors />
            <Button
              disabled={isInputDisabled}
              type="submit"
              className={cn(
                "w-full text-[14px]",
                isInputDisabled &&
                  "dark:bg-emerald-500 bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-emerald-600 text-[15px] w-full h-full text-white"
              )}
              onClick={() => {
                setTimeout(() => {
                  if (Object.keys(form.formState.errors).length === 0) {
                    setIsInputDisabled(true);
                  }
                }, 100);
              }}
            >
              {isInputDisabled ? "Conectando..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
