import AdminEditRoleScreen from "@/app/screens/admin/roles/AdminEditRoleScreen";
import Layout from "@/components/cmsfullform/layout";
import { cookies } from "next/headers";

async function getRole(slug: string) {
  // Your environment requires await
  const cookieStore = await cookies();

  // Extract session token safely
  const session = cookieStore.get("session")?.value || "";

  const res = await fetch(`http://localhost:3000/api/roles/${slug}`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ This is the correct way
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function AdminEditRolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await getRole(slug);
  const role = result?.data ?? null;

  return (
    <Layout>
      <AdminEditRoleScreen role={role} />
    </Layout>
  );
}
