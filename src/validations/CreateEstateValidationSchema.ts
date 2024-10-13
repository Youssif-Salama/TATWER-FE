import * as Yup from "yup";

export const CreateEstateValidationSchema = Yup.object().shape({
  EstateName: Yup.string()
    .min(3, "يجب ألا يقل اسم العقار عن 3 أحرف")
    .max(50, "يجب ألا يزيد اسم العقار عن 50 حرفًا")
    .required("اسم العقار مطلوب"),
  TitleDeedNumber: Yup.string()
    .min(5, "يجب ألا يقل رقم صك الملكية عن 5 أحرف")
    .max(20, "يجب ألا يزيد رقم صك الملكية عن 20 حرفًا")
    .required("رقم صك الملكية مطلوب"),
  EstateSpace: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "المساحة يجب أن تكون عددًا صحيحًا أو عشريًا")
    .required("المساحة مطلوبة"),
  PieceNumber: Yup.string()
    .min(1, "يجب ألا يقل رقم القطعة عن 1 حرف")
    .max(10, "يجب ألا يزيد رقم القطعة عن 10 أحرف")
    .required("رقم القطعة مطلوب"),
  PlanNumber: Yup.string()
    .min(1, "يجب ألا يقل رقم المخطط عن 1 حرف")
    .max(10, "يجب ألا يزيد رقم المخطط عن 10 أحرف")
    .required("رقم المخطط مطلوب"),
  Notes: Yup.string()
    .max(200, "يجب ألا تزيد الملاحظات عن 200 حرف")
    .required("الملاحظات مطلوبة"),
  Situation: Yup.string().required("الحاله مطلوبة"),
});
