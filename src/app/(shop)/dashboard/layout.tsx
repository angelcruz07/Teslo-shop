import { auth } from "@/auth.config";
import { DasboardNav } from "@/components";
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
    <main className="flex flex-col">
      <DasboardNav />
      {children}
    </main>
  );
}
