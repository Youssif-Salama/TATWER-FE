import * as Yup from "yup";

export const AddressValidationSchema = Yup.object().shape({
  City: Yup.string()
    .min(2, "يجب الا يقل اسم المدينة عن حرفين")
    .max(25, "يجب الا يزيد اسم المدينة عن 25 حرفًا")
    .required("اسم المدينة مطلوب"),
  Town: Yup.string()
    .min(2, "يجب الا يقل اسم البلدة عن حرفين")
    .max(25, "يجب الا يزيد اسم البلدة عن 25 حرفًا")
    .required("اسم البلدة مطلوب"),
  Neighborhood: Yup.string()
    .min(2, "يجب الا يقل اسم الحي عن حرفين")
    .max(30, "يجب الا يزيد اسم الحي عن 30 حرفًا")
    .required("اسم الحي مطلوب"),
  Street: Yup.string()
    .min(2, "يجب الا يقل اسم الشارع عن حرفين")
    .max(30, "يجب الا يزيد اسم الشارع عن 30 حرفًا")
    .required("اسم الشارع مطلوب"),
  PostalCode: Yup.string().required("الرمز البريدي مطلوب"),
  BuildingNumber: Yup.string().required("رقم المبنى مطلوب"),
  AdditionalBuildingNumber: Yup.string(),
  lat: Yup.string().required("خط العرض مطلوب"),
  lang: Yup.string().required("خط الطول مطلوب"),
});
