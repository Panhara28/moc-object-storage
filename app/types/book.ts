import { SerializedEditorState } from "lexical";

export interface BookFormData {
  title: string;
  author: string;
  description: any | null;
  isbn: string;
  year: string;
  publisher: string;
  type: string;
  language: string;
  pages: string;
  location: string;
  coverImage: string | null;
  mediaId: number | null;
  categoryId: number | null;
  isAvailable:
    | "DRAFTED"
    | "AVAILABLE"
    | "PUBLIC"
    | "PRIVATE"
    | "RESTRICTED"
    | "REMOVE"
    | "RECOVERY"
    | "PUBLISHED"
    | "UNPUBLISHED";
}
