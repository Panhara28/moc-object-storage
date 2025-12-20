import { BookFormData } from "@/app/types/book";

type BookInput = Partial<BookFormData>;

export const mapBookToFormData = (book: BookInput): BookFormData => {
  return {
    title: book.title ?? "",
    author: book.author ?? "",
    description: book.description ?? null,
    isbn: book.isbn ?? "",
    year: book.year ?? "",
    publisher: book.publisher ?? "",
    type: book.type ?? "",
    language: book.language ?? "English",
    pages: book.pages ?? "",
    location: book.location ?? "",
    coverImage: book.coverImage ?? null,
    mediaId: book.mediaId ?? null,
    categoryId: book.categoryId ?? null,
    isAvailable: book.isAvailable ?? "DRAFTED",
  };
};
