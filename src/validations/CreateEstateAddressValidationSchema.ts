import * as Yup from "yup";

export const CreateEstateAddressValidationSchema = Yup.object().shape({
  City: Yup.string()
  .required("اسم المدينة مطلوب"),
  Town: Yup.string()
  .optional(),
  Neighborhood:
    Yup.string()
    .optional(),
  Street:
    Yup.string()
    .optional(),
  PostalCode: Yup.string().optional(),
  BuildingNumber: Yup.string().optional(),
  AdditionalBuildingNumber: Yup.string(),
  lat: Yup.string().optional(),
  lang: Yup.string().optional(),
});
