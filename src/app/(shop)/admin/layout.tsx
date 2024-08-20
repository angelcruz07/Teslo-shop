import { auth } from "@/auth.config";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="flex bg-zinc-100">
      <nav className="h-screen w-14">
        <Link href="">Inicio</Link>
      </nav>

      {children}
    </main>
  );
}
