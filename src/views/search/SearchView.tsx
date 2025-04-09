import { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "@/validations/search-form-schema";
import { PexelesQueryParams } from "@/interfaces/pexeles-query-params";

import {
  Select,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectGroup,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
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
import { GaleryImages } from "@/components/GaleryImages";

export const SearchView = () => {
  //* States
  const [searchParams, setSearchParams] = useState<PexelesQueryParams>();

  //* Form
  const form = useForm<z.infer<typeof searchFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      page: "",
      perPage: "",
    },
  });

  //* Form handler
  const handleSubmit = async (formData: z.infer<typeof searchFormSchema>) => {
    setSearchParams(formData);
    form.reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-center font-bold text-3xl md:text-4xl text-teal-500 mb-6">
        Buscador de Imágenes
      </h1>

      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col md:flex-row items-center gap-6 bg-white p-4 rounded-lg shadow-lg"
          >
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[14px] font-semibold text-teal-600">
                    Búsqueda
                  </FormLabel>
                  <FormDescription className="text-[13.5px] md:text-[14px] text-gray-600">
                    ¿Qué imagen estás buscando?
                  </FormDescription>
                  <FormControl className="text-[14px] md:text-[14px]">
                    <Input {...field} placeholder="Escribe algo..." />
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="perPage"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[14px] font-semibold text-teal-600">
                    Cantidad de imágenes
                  </FormLabel>
                  <FormDescription className="text-[13.5px] md:text-[14px] text-gray-600">
                    ¿Cuántas imágenes quieres ver por página?
                  </FormDescription>
                  <FormControl className="text-[13px] md:text-[14px] w-full">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona la cantidad de imágenes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Cantidad por página</SelectLabel>
                          <SelectItem value="10">10 imágenes</SelectItem>
                          <SelectItem value="20">20 imágenes</SelectItem>
                          <SelectItem value="30">30 imágenes</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="page"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[14px] font-semibold text-teal-600">
                    Página
                  </FormLabel>
                  <FormDescription className="text-[13.5px] md:text-[14px] text-gray-600">
                    Selecciona que página quieres ver
                  </FormDescription>
                  <FormControl className="text-[13px] md:text-[14px] w-full">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="w-auto"
                          placeholder="Selecciona la página"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Número de páginas</SelectLabel>
                          <SelectItem value="1">Página 1</SelectItem>
                          <SelectItem value="2">Páginas 2</SelectItem>
                          <SelectItem value="3">Páginas 3</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full md:w-auto flex-grow md:mt-14 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none transition duration-200"
            >
              Buscar
            </Button>
          </form>
        </Form>
      </div>

      <GaleryImages searchParams={searchParams} />
    </div>
  );
};
