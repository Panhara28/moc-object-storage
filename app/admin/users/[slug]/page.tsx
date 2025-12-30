import AdminUserDetailScreen from "@/app/screens/admin/users/detail/AdminUserDetailScreen";
import Layout from "@/components/cmsfullform/layout";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function getUser(slug: string) {
  // Your environment requires await
  const cookieStore = await cookies();

  // Extract session token safely
  const session = cookieStore.get("session")?.value || "";

  const res = await fetch(`http://localhost:3000/api/users/${slug}`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ This is the correct way
      "x-ui-request": "true",
    },
  });

  if (!res.ok) {
    return { status: res.status };
  }

  return { status: res.status, data: await res.json() };
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getUser(slug);
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
    <>
      <Layout>
        <AdminUserDetailScreen user={user} />
      </Layout>
    </>
  );
}
