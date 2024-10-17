import * as Yup from "yup";

export const CreateContractValidationSchema = Yup.object().shape({
  Type: Yup.string()
    .oneOf(["tenant", "landlord"], "النوع غير صالح")
    .required("النوع مطلوب"),
  Name: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .required("الاسم مطلوب"),
  AdditionalName: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .optional(),
  Phone: Yup.string().optional(),
  Email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "تنسيق البريد الإلكتروني غير صالح")
    .optional(),
  TaxNumber: Yup.string().optional(),
  Mobile: Yup.string().optional(),
  AdditionalPhone: Yup.string().optional(),
  // Website: Yup.string()
  //   .matches(
  //     /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
  //     "الرابط غير صالح"
  //   )
  //   .optional(),
  Agent: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .optional(),
  RepresentationDocument: Yup.string().optional(),
  IdNumber: Yup.string().optional(),
  Identity: Yup.string().required("الرقم الوطني مطلوب"),
  DocumentNumber: Yup.string().optional(),
  MobileNumber: Yup.string().optional(),
  DocumentDate: Yup.date().optional(),
  ContractNumber: Yup.string().optional(),
  ContractCopy: Yup.string().optional(),
  RelyOn: Yup.string().optional(),
  ContractReleaseDate: Yup.date().optional(),
  ContractDate: Yup.date().optional(),
  PaymentWay: Yup.string()
    .optional(),
  Price: Yup.number().optional(),
  FixedPrice: Yup.number().optional(),
  Times: Yup.number().optional(),
  BankAccount: Yup.string().optional(),
  HasTax: Yup.boolean().optional(),
  TaxValue: Yup.string().optional(),
});
