import { ApiKeysTable } from "./api-keys-table";
import { GenerateKeyDialog } from "./generate-key-dialog";

export default function AdminApiListScreen() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-6xl ">
        <div className="flex flex-col gap-6">
          {/* Header Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Spaces access keys
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Keys you have generated to connect with third party clients or
                to access the{" "}
                <a href="#" className="text-primary hover:underline">
                  Spaces API
                </a>
                .
              </p>
            </div>
            <GenerateKeyDialog />
          </div>

          {/* Table Section */}
          <ApiKeysTable />
        </div>
      </div>
    </div>
  );
}
