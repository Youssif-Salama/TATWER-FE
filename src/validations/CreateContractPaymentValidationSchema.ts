import * as Yup from "yup";

export const CreateContractPaymentValidationSchema = Yup.object({
  RentValue: Yup.number()
    .typeError("مبلغ الدفع يجب أن يكون عدد")
    .required("مبلغ الدفع مطلوب"),
  ServiceValue: Yup.number()
    .typeError("مبلغ الخدمة يجب أن يكون عدد")
    .required("مبلغ الخدمة مطلوب"),
});
