import AdminUserDetailScreen from "@/app/screens/admin/users/detail/AdminUserDetailScreen";
import Layout from "@/components/cmsfullform/layout";
import { cookies } from "next/headers";

async function getUser(slug: string) {
  // Your environment requires await
  const cookieStore: any = await cookies();

  // Extract session token safely
  const session =
    cookieStore?.session?.value || cookieStore?.get?.("session")?.value || "";

  const res = await fetch(`http://localhost:3000/api/users/${slug}`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ This is the correct way
    },
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // ⬅️ No await needed

  const result = await getUser(slug);
  const user = result?.data ?? null;

  return (
    <>
      <Layout>
        <AdminUserDetailScreen user={user} />
      </Layout>
    </>
  );
}
