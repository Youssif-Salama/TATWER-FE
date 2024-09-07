import * as Yup from "yup";

export const CreateContractValidationSchema = Yup.object().shape({
  Type: Yup.string()
    .oneOf(["tenant", "landlord"], "النوع غير صالح")
    .required("النوع مطلوب"),
  Name: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .max(25, "يجب ألا يزيد الاسم عن 25 حرفًا")
    .required("الاسم مطلوب"),
  AdditionalName: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .max(25, "يجب ألا يزيد الاسم عن 25 حرفًا")
    .optional(),
  Phone: Yup.string().required("رقم الهاتف مطلوب"),
  Email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "تنسيق البريد الإلكتروني غير صالح")
    .optional(),
  TaxNumber: Yup.string().required("رقم الضريبة مطلوب"),
  Mobile: Yup.string().required("رقم الجوال مطلوب"),
  AdditionalPhone: Yup.string().optional(),
  Website: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/,
      "الرابط غير صالح"
    )
    .optional(),
  Agent: Yup.string()
    .min(3, "يجب ألا يقل الاسم عن 3 أحرف")
    .max(25, "يجب ألا يزيد الاسم عن 25 حرفًا")
    .required("الوكيل مطلوب"),
  RepresentationDocument: Yup.string().required("مستند التمثيل مطلوب"),
  IdNumber: Yup.string().required("رقم الهوية مطلوب"),
  Identity: Yup.string().required("رقم الهوية مطلوب"),
  DocumentNumber: Yup.string().required("رقم المستند مطلوب"),
  MobileNumber: Yup.string().required("رقم الجوال مطلوب"),
  DocumentDate: Yup.date().required("تاريخ المستند مطلوب"),
  ContractNumber: Yup.string().required("رقم العقد مطلوب"),
  ContractCopy: Yup.string().required("نسخة العقد مطلوبة"),
  RelyOn: Yup.string().required("الاعتماد مطلوب"),
  ContractReleaseDate: Yup.date().required("تاريخ إصدار العقد مطلوب"),
  ContractDate: Yup.date().required("تاريخ العقد مطلوب"),
  PaymentWay: Yup.string()
    .oneOf(["1", "3", "6", "12"], "طريقة الدفع غير صالحة")
    .required("طريقة الدفع مطلوبة"),
  Price: Yup.number().required("السعر مطلوب"),
  FixedPrice: Yup.number().required("السعر الثابت مطلوب"),
  Times: Yup.number().required("عدد مرات الدفع مطلوب"),
});
