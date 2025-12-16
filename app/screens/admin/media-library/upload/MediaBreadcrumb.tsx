"use client";

import Link from "next/link";

export default function MediaBreadcrumb({
  parentSlug,
  bucketSlug,
}: {
  parentSlug: string | null;
  bucketSlug: string;
}) {
  // --- ROOT ---
  if (!parentSlug) {
    return <div className="text-sm text-gray-500">Root Directory</div>;
  }

  // --- Build paths ---
  const pathNames = parentSlug.split("/").filter(Boolean);

  const paths = pathNames.map((_, index) =>
    pathNames.slice(0, index + 1).join("/")
  );

  return (
    <div className="flex items-center flex-wrap gap-1 text-sm">
      {/* ROOT LINK */}
      <Link
        href={`/admin/buckets/${bucketSlug}`}
        className="text-blue-600 hover:underline"
      >
        Root
      </Link>

      {/* SUB FOLDERS */}
      {pathNames.map((segment, index) => {
        const formattedLabel = segment
          .replace(/\([^()]*\)/g, "") // remove parentheses content
          .replace(/-/g, " ") // make readable
          .replace(/^\w/, (c) => c.toUpperCase()); // capitalize

        const href = `/admin/buckets/${bucketSlug}/media-library?parentSlug=${paths[index]}`;

        const isLast = index === pathNames.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            <span className="text-gray-400">/</span>

            {isLast ? (
              <span className="font-semibold text-black">{formattedLabel}</span>
            ) : (
              <Link href={href} className="text-blue-600 hover:underline">
                {formattedLabel}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
