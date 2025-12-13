"use client";

import { Button } from "@/components/ui/button";
import type { ChangeEvent, RefObject } from "react";

type MediaUploadButtonProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function MediaUploadButton({
  inputRef,
  onUpload,
}: MediaUploadButtonProps) {
  return (
    <>
      <Button onClick={() => inputRef.current?.click()}>Upload Media</Button>

      <input
        type="file"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={onUpload}
      />
    </>
  );
}
