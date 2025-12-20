import Image from "next/image";
import { useRef, useState } from "react";
import { Plus, Upload, Trash2 } from "lucide-react";

export default function AdminUploadArea() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const triggerFilePicker = () => fileInputRef.current?.click();

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={handleFiles}
      />

      {files.length === 0 ? (
        /* --------------------------------------------------
         * EMPTY PLACEHOLDER
         * -------------------------------------------------- */
        <div
          onClick={triggerFilePicker}
          className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 text-center hover:bg-accent/10 cursor-pointer transition"
        >
          <Upload className="w-10 h-10 mx-auto text-gray-400" />
          <p className="mt-3 text-sm text-muted-foreground">
            Drag & drop files here or click to browse
          </p>
        </div>
      ) : (
        /* --------------------------------------------------
         * GRID — scrollable (hidden scrollbar)
         * -------------------------------------------------- */
        <div
          className="
            max-h-138
            overflow-y-auto 
            pr-1
            scrollbar-hide
          "
        >
          <div className="grid grid-cols-6 gap-4">
            {/* Uploaded Images */}
            {files.map((file, index) => {
              const preview = URL.createObjectURL(file);

              return (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-muted group"
                >
                  {/* Image */}
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(index)}
                    className="
                      absolute top-1 right-1 
                      p-1.5 rounded-full
                      bg-black/60 hover:bg-black/80 
                      transition 
                      opacity-0 group-hover:opacity-100
                    "
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              );
            })}

            {/* Add More Square */}
            <div
              onClick={triggerFilePicker}
              className="aspect-square rounded-lg border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-accent/10 transition"
            >
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
