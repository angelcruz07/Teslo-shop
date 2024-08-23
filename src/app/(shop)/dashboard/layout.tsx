import { auth } from "@/auth.config";
import { DasboardNav } from "@/components";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dasboard",
};

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
