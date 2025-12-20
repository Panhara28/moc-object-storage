import AdminMediaLibraryUploadScreen from "@/app/screens/admin/media-library/upload/AdminMediaLibraryUploadScreen";
import Layout from "@/components/cmsfullform/layout";

interface Props {
  params: { slug: string };
}

export default async function BucketsDetail({ params }: Props) {
  const { slug } = await params;
  return (
    <Layout>
      <AdminMediaLibraryUploadScreen bucketSlug={slug} />
    </Layout>
  );
}
