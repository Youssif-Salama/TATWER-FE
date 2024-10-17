import * as Yup from "yup";

export const AddressValidationSchema = Yup.object().shape({
  City: Yup.string()
    .min(2, "يجب الا يقل اسم المدينة عن حرفين")
    .required("اسم المدينة مطلوب"),
  Town: Yup.string()
    .optional(),
  Neighborhood: Yup.string()
    .optional(),
  Street: Yup.string()
    .optional(),
  PostalCode: Yup.string().optional(),
  BuildingNumber: Yup.string().optional(),
  AdditionalBuildingNumber: Yup.string(),
  lat: Yup.string().optional(),
  lang: Yup.string().optional(),
});
