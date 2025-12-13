import * as Yup from "yup";

export const userCreateSchema = Yup.object().shape({
  // User Information
  fullNameEn: Yup.string()
    .required("Full Name (English) is required")
    .min(3, "Must be at least 3 characters"),

  fullNameKh: Yup.string()
    .required("Full Name (Khmer) is required")
    .min(3, "Must be at least 3 characters"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["MALE", "FEMALE", "OTHER"], "Invalid gender"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9\s+()-]+$/, "Invalid phone number"),

  generalDepartment: Yup.string().required("General Department is required"),
  department: Yup.string().required("Department is required"),
  office: Yup.string().required("Office is required"),
  currentRole: Yup.string().required("Current Role is required"),

  // Security
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: Yup.string()
    .required("Confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const userUpdateInfovalidation = Yup.object().shape({
  // User Information
  fullNameEn: Yup.string()
    .required("Full Name (English) is required")
    .min(3, "Must be at least 3 characters"),

  fullNameKh: Yup.string()
    .required("Full Name (Khmer) is required")
    .min(3, "Must be at least 3 characters"),

  gender: Yup.string()
    .required("Gender is required")
    .oneOf(["MALE", "FEMALE", "OTHER"], "Invalid gender"),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9\s+()-]+$/, "Invalid phone number"),

  generalDepartment: Yup.string().required("General Department is required"),
  department: Yup.string().required("Department is required"),
  office: Yup.string().required("Office is required"),
  currentRole: Yup.string().required("Current Role is required"),
});
