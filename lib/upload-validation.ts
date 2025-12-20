export type UploadValidationResult =
  | { ok: true; mime: string; ext: string }
  | { ok: false; reason: string };

const EXT_MIME: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  txt: "text/plain",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  mp4: "video/mp4",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  flac: "audio/flac",
};

const MIME_ALIAS: Record<string, string> = {
  "image/jpg": "image/jpeg",
};

function normalizeMime(mime?: string) {
  if (!mime) return "";
  return MIME_ALIAS[mime] || mime;
}

function isMimeAllowed(
  mime: string,
  allowedPrefixes: string[],
  allowedTypes: string[]
) {
  return (
    allowedPrefixes.some((p) => mime.startsWith(p)) ||
    allowedTypes.includes(mime)
  );
}

function isLikelyText(buffer: Buffer) {
  const sample = buffer.subarray(0, 1024);
  let printable = 0;
  for (const byte of sample) {
    if (byte === 0) return false;
    if (
      (byte >= 9 && byte <= 13) ||
      (byte >= 32 && byte <= 126)
    ) {
      printable += 1;
    }
  }
  return printable / Math.max(sample.length, 1) > 0.9;
}

function hasZipHeader(buffer: Buffer) {
  return (
    buffer.length >= 4 &&
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  );
}

function hasOleHeader(buffer: Buffer) {
  return (
    buffer.length >= 8 &&
    buffer[0] === 0xd0 &&
    buffer[1] === 0xcf &&
    buffer[2] === 0x11 &&
    buffer[3] === 0xe0 &&
    buffer[4] === 0xa1 &&
    buffer[5] === 0xb1 &&
    buffer[6] === 0x1a &&
    buffer[7] === 0xe1
  );
}

function sniffSignature(buffer: Buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  if (buffer.length >= 6) {
    const head = buffer.subarray(0, 6).toString("ascii");
    if (head === "GIF87a" || head === "GIF89a") {
      return { mime: "image/gif", ext: "gif" };
    }
  }
  if (buffer.length >= 12) {
    const riff = buffer.subarray(0, 4).toString("ascii");
    const webp = buffer.subarray(8, 12).toString("ascii");
    if (riff === "RIFF" && webp === "WEBP") {
      return { mime: "image/webp", ext: "webp" };
    }
  }
  if (buffer.length >= 5) {
    const pdf = buffer.subarray(0, 5).toString("ascii");
    if (pdf === "%PDF-") {
      return { mime: "application/pdf", ext: "pdf" };
    }
  }
  if (buffer.length >= 12) {
    const riff = buffer.subarray(0, 4).toString("ascii");
    const wave = buffer.subarray(8, 12).toString("ascii");
    if (riff === "RIFF" && wave === "WAVE") {
      return { mime: "audio/wav", ext: "wav" };
    }
  }
  if (buffer.length >= 4) {
    const ogg = buffer.subarray(0, 4).toString("ascii");
    if (ogg === "OggS") {
      return { mime: "audio/ogg", ext: "ogg" };
    }
  }
  if (buffer.length >= 4) {
    const flac = buffer.subarray(0, 4).toString("ascii");
    if (flac === "fLaC") {
      return { mime: "audio/flac", ext: "flac" };
    }
  }
  if (buffer.length >= 3) {
    const id3 = buffer.subarray(0, 3).toString("ascii");
    if (id3 === "ID3") {
      return { mime: "audio/mpeg", ext: "mp3" };
    }
  }
  if (buffer.length >= 2 && buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0) {
    return { mime: "audio/mpeg", ext: "mp3" };
  }
  if (buffer.length >= 12) {
    const ftyp = buffer.subarray(4, 8).toString("ascii");
    if (ftyp === "ftyp") {
      return { mime: "video/mp4", ext: "mp4" };
    }
  }
  return null;
}

function isCompatibleMime(provided: string, sniffed: string) {
  if (!provided) return true;
  if (provided === sniffed) return true;
  const providedPrefix = provided.split("/")[0];
  const sniffedPrefix = sniffed.split("/")[0];
  return providedPrefix === sniffedPrefix;
}

export function validateUploadFile({
  file,
  buffer,
  allowedMimePrefixes,
  allowedMimeTypes,
}: {
  file: File;
  buffer: Buffer;
  allowedMimePrefixes: string[];
  allowedMimeTypes: string[];
}): UploadValidationResult {
  const providedMime = normalizeMime(file.type);
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const signature = sniffSignature(buffer);

  if (signature) {
    if (!isMimeAllowed(signature.mime, allowedMimePrefixes, allowedMimeTypes)) {
      return { ok: false, reason: "is not an allowed file type." };
    }
    if (!isCompatibleMime(providedMime, signature.mime)) {
      return { ok: false, reason: "has a mismatched file signature." };
    }
    return { ok: true, mime: signature.mime, ext: signature.ext };
  }

  if (hasZipHeader(buffer)) {
    if (ext in EXT_MIME && ["docx", "xlsx", "pptx"].includes(ext)) {
      return { ok: true, mime: EXT_MIME[ext], ext };
    }
    return { ok: false, reason: "has an unsupported archive signature." };
  }

  if (hasOleHeader(buffer)) {
    if (ext in EXT_MIME && ["doc", "xls", "ppt"].includes(ext)) {
      return { ok: true, mime: EXT_MIME[ext], ext };
    }
    return { ok: false, reason: "has an unsupported document signature." };
  }

  if (providedMime === "text/plain" && isLikelyText(buffer)) {
    return { ok: true, mime: "text/plain", ext: ext || "txt" };
  }

  return { ok: false, reason: "has an unrecognized file signature." };
}
