import AdminUserEditScreen from "@/app/screens/admin/users/edit/AdminUserEditScreen";
import Layout from "@/components/cmsfullform/layout";
import { cookies } from "next/headers";

async function getItem(slug: string) {
  const cookieStore = await cookies(); // ⬅️ your environment requires await

  // ⬅️ FIX: Extract cookie manually
  const session = cookieStore.get("session")?.value || "";

  const res = await fetch(`http://localhost:3000/api/users/${slug}`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ authorized now
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function AdminUserEditPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const result = await getItem(slug);
  const user = result?.data ?? null;

  return (
    <Layout>
      <AdminUserEditScreen user={user} />
    </Layout>
  );
}
