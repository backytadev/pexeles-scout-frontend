import { Link } from "react-router-dom";

export default function NotFoundView() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-800 p-4">
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-teal-500 leading-tight">
        Página No Encontrada
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-center text-white">
        Tal vez quieras volver al{" "}
        <Link
          className="text-teal-500 font-semibold hover:text-teal-400"
          to={"/"}
        >
          Dashboard Principal.
        </Link>
      </p>
    </div>
  );
}
