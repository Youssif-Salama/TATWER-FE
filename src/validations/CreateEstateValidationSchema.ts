import * as Yup from "yup";

export const CreateEstateValidationSchema = Yup.object().shape({
  EstateName: Yup.string()
    .min(3, "يجب ألا يقل اسم العقار عن 3 أحرف")
    .required("اسم العقار مطلوب"),
  TitleDeedNumber: Yup.string()
    .min(5, "يجب ألا يقل رقم صك الملكية عن 5 أحرف")
    .optional(),
  EstateSpace: Yup.string()
    .matches(/^\d+(\.\d{1,2})?$/, "المساحة يجب أن تكون عددًا صحيحًا أو عشريًا")
    .optional(),
  PieceNumber: Yup.string()
    .min(1, "يجب ألا يقل رقم القطعة عن 1 حرف")
    .optional(),
  PlanNumber: Yup.string()
    .min(1, "يجب ألا يقل رقم المخطط عن 1 حرف")
    .optional(),
  Notes: Yup.string()
    .optional(),
    Situation:Yup.string().optional(),
    ConstructionAndMaintenanceExpenses:Yup.string().optional(),
    BuildingPermit:Yup.string().optional(),
    ConstructionCompletionPermit:Yup.string().optional(),
    ComplianceCertificate:Yup.string().optional()
});
