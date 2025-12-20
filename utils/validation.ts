// utils/validation.ts

import * as Yup from "yup";

export const itemValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required(),
  age: Yup.number().min(1).max(100),
  color: Yup.string(),
  category: Yup.string(),
});

export const bookInformationSchema = Yup.object({
  title: Yup.string().required("Book title is required"),
  author: Yup.string().required("Author name is required"),
  isbn: Yup.string().required("ISBN is required"),
  year: Yup.string().required("Publication year is required"),
  publisher: Yup.string().required("Publisher is required"),
  type: Yup.string().required("Book type is required"),
  language: Yup.string().required("Language is required"),
  pages: Yup.string().required("Number of pages is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.object().required("Description is required"),
  categoryId: Yup.number().required("Category is required"),
  coverImage: Yup.string().required("Cover image is required"),
  mediaId: Yup.number().required("Book file is required"),
});
