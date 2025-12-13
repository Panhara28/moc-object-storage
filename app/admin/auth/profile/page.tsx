import { cookies } from "next/headers";
import AdminMeProfileScreen from "@/app/screens/admin/auth/AdminMeProfileScreen";
import Layout from "@/components/cmsfullform/layout";

async function getMe() {
  // Your environment requires await
  const cookieStore: any = await cookies();

  // Extract session token safely
  const session =
    cookieStore?.session?.value || cookieStore?.get?.("session")?.value || "";

  const res = await fetch(`http://localhost:3000/api/auth/me`, {
    cache: "no-store",
    headers: {
      cookie: `session=${session}`, // ✔ This is the correct way
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function AdminMeProfilePage() {
  const result = await getMe();
  const me = result?.user ?? null;
  return (
    <Layout>
      <AdminMeProfileScreen initialUser={me} />
    </Layout>
  );
}
