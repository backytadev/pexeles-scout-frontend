import { useQuery } from "@tanstack/react-query";

import { queryPexelesApi } from "@/api/AuthAPI";
import { PexelesQueryParams } from "@/interfaces/pexeles-query-params";

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  searchParams: PexelesQueryParams | undefined;
  setSearchParams: React.Dispatch<
    React.SetStateAction<PexelesQueryParams | undefined>
  >;
}

export const GaleryImages = ({ searchParams, setSearchParams }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pexels-images", searchParams],
    queryFn: () => queryPexelesApi(searchParams as PexelesQueryParams),
    enabled: !!searchParams,
    retry: false,
  });

  const urlNextPage = data?.next_page;

  const params = urlNextPage?.split("?");
  const resp = params?.[1]?.split("&");

  const values = resp?.map((item) => {
    const arrayValues = [];
    const value = item.split("=")[1];
    arrayValues.push(value);
    return arrayValues.flat();
  });

  const handleNextPage = () => {
    const [page, per_page, query] = values!.flat();

    setSearchParams({ page: page, perPage: per_page, query: query });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-center text-3xl md:text-4xl font-semibold text-teal-600 mb-4">
        Resultados de Búsqueda
      </h1>

      <div className="text-center flex justify-center gap-5 mb-6">
        <span className="text-md text-teal-500 block mb-2">
          <strong>Consulta: </strong>
          {searchParams?.query.toUpperCase() ?? "N/A"}
        </span>
        <span className="text-md text-teal-500 block mb-2">
          <strong>Página: </strong>
          {searchParams?.page ?? "N/A"}
        </span>
        <span className="text-md text-teal-500 block mb-6">
          <strong>Cantidad por página: </strong>
          {searchParams?.perPage ?? "N/A"}
        </span>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-600 text-lg">
          <span className="animate-pulse">Cargando Imágenes....</span>
        </div>
      ) : data === undefined ? (
        <div className="text-center text-gray-600 text-lg">
          <span className="animate-pulse">
            Esperando parámetros de consulta....
          </span>
        </div>
      ) : data?.photos?.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          No se encontraron fotos para tu búsqueda.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.photos.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                <img
                  src={item.src.original}
                  alt={`Imagen ${item.id}`}
                  className="w-full h-[200px] object-cover rounded-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};
