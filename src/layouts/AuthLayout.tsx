import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="animate-fadeIn">
      <div className="bg-neutral-100 dark:bg-slate-950 flex h-screen overflow-hidden">
        <div className="relative w-1/2 hidden lg:flex items-center justify-center">
          <img
            src="/images/hero.webp"
            alt="Fondo"
            className="absolute inset-0 w-full h-full object-cover z-20"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

          <div className="relative z-20 text-center px-8">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
              Explora el mundo visual con{" "}
              <span className="text-teal-400">Pexeles Scout</span>
            </h1>
          </div>
        </div>

        <div className="pl-4 pr-1 w-full lg:w-1/2 flex flex-col justify-center items-center bg-white dark:bg-slate-950 relative z-30">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
