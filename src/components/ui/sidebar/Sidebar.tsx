"use client";
import { logout } from "@/actions";
import { useUIStore } from "@/store";
import {
  IconLogin,
  IconLogout,
  IconSearch,
  IconShirt,
  IconTicket,
  IconUser,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import clxs from "clsx";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Backgroud black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 z-10 w-screen opacity-30 bg-black h-screen" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clxs(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-10 shadow-2xl transfrom transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          },
        )}
      >
        <IconX
          stroke={2}
          size={20}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* Input search */}
        <div className="relative mt-10 h-10 flex items-center justify-center">
          <IconSearch stroke={2} size={15} className="absolute top-3 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-14 pr-10 broder-b-2 h-10 text-sm border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              onClick={closeMenu}
              className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IconUser stroke={2} size={20} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IconTicket stroke={2} size={20} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={() => logout()}
            className="flex w-full items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IconLogout stroke={2} size={20} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IconLogin stroke={2} size={20} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line separator  */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href="/"
              className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IconShirt stroke={2} size={20} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IconTicket stroke={2} size={20} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/"
              className="flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IconUsers stroke={2} size={20} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
