import AdminUserEditScreen from "@/app/screens/admin/users/edit/AdminUserEditScreen";
import Layout from "@/components/cmsfullform/layout";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function getItem(slug: string) {
  const cookieStore = await cookies(); // ⬅️ your environment requires await

  // ⬅️ FIX: Extract cookie manually
  const session = cookieStore.get("session")?.value || "";
  const res = await fetch(`http://localhost:3000/api/users/${slug}`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ authorized now
      "x-ui-request": "true",
    },
  });

  if (!res.ok) {
    return { status: res.status };
  }
  return { status: res.status, data: await res.json() };
}

export default async function AdminUserEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await getItem(slug);
  if (!result || result.status === 404) {
    notFound();
  }
  if (result.status === 401) {
    redirect("/auth/login");
  }
  if (result.status === 403) {
    redirect("/admin/unauthorized");
  }
  if (result.status !== 200) {
    notFound();
  }
  const user = result.data?.data ?? null;
  if (!user) {
    notFound();
  }

  return (
    <Layout>
      <AdminUserEditScreen user={user} />
    </Layout>
  );
}
