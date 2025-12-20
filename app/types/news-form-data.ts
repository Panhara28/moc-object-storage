import type { MediaItem } from "@/app/types/media";
import type { SerializedEditorState } from "lexical";

export interface DescriptionHTMLWrapper {
  html: string;
}

export interface NewsFormData {
  title: string;
  summary: string;
  new_category_id: number | null;
  isAvailable: string;
  description: SerializedEditorState | string | DescriptionHTMLWrapper | null;
  thumbnail: MediaItem | null;
}
