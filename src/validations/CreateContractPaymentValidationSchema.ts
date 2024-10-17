import * as Yup from "yup";

export const CreateContractPaymentValidationSchema = Yup.object({
  RentValue: Yup.number()
    .typeError("مبلغ الدفع يجب أن يكون عدد")
    .optional(),
  ServiceValue: Yup.number()
    .typeError("مبلغ الخدمة يجب أن يكون عدد")
    .optional(),
});
