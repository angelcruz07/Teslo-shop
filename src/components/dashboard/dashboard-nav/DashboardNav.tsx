import Link from "next/link";

export const ROUTES_NAVBAR = [
  {
    path: "/dashboard",
    label: "Resumen",
  },
  {
    path: "/dashboard/products",
    label: "Productos",
  },
  {
    path: "/dashboard/orders",
    label: "Ordenes",
  },
];

export const DasboardNav = () => {
  return (
    <nav className="space-x-5 font-semibold mt-5">
      {ROUTES_NAVBAR.map((route) => (
        <Link
          href={route.path}
          className="hover:bg-gray-200 px-5 py-2 rounded-lg"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
