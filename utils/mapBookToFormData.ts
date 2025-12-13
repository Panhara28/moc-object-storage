import { BookFormData } from "@/app/types/book";

export const mapBookToFormData = (book: any): BookFormData => {
  return {
    title: book.title || "",
    author: book.author || "",
    description: book.description || null,
    isbn: book.isbn || "",
    year: book.year || "",
    publisher: book.publisher || "",
    type: book.type || "",
    language: book.language || "English",
    pages: book.pages || "",
    location: book.location || "",
    coverImage: book.coverImage || null,
    mediaId: book.mediaId || null,
    categoryId: book.categoryId || null,
    isAvailable: book.isAvailable || "DRAFTED",
  };
};
