import prisma from "@/lib/prisma";

export async function resetDb() {
  // Reset with FK checks disabled to avoid ordering issues in MariaDB.
  await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");
  try {
    const tables = [
      "media_upload_details",
      "media_uploads",
      "spaces",
      "medias",
      "bucket_api_keys",
      "buckets",
      "users",
      "role_permissions",
      "roles",
      "permissions",
    ];

    for (const table of tables) {
      await prisma.$executeRawUnsafe(`DELETE FROM \`${table}\`;`);
    }
  } finally {
    await prisma.$executeRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

export async function disconnectDb() {
  await prisma.$disconnect();
}
