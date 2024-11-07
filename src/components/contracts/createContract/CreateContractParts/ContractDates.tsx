import InputDateCommonG from "@/common/InputDateCommonG"

const ContractDates = ({formik}:{formik:any}) => {
  return (
    <div className="flex items-center flex-wrap w-full gap-4 justify-between my-4">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommonG
            required={true}
            id="ContractSigningDate"
            name="ContractSigningDate"
            label="تاريخ ابرام العقد"
            placeholder="ادخل تاريخ ابرام العقد هنا"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.ContractSigningDate}
            error={
              formik.errors &&
              formik.touched.ContractSigningDate &&
              formik.errors.ContractSigningDate
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommonG
            required={true}
            id="ContractStartsDate"
            name="ContractStartsDate"
            label="تاريخ البدء"
            placeholder="ادخل تاريخ البدء هنا"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.ContractStartsDate}
            error={
              formik.errors &&
              formik.touched.ContractStartsDate &&
              formik.errors.ContractStartsDate
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommonG
            required={true}
            id="ContractEndsDate"
            name="ContractEndsDate"
            label="تاريخ الانتهاء"
            placeholder="ادخل تاريخ الانتهاء هنا"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.ContractEndsDate}
            error={
              formik.errors &&
              formik.touched.ContractEndsDate &&
              formik.errors.ContractEndsDate
            }
          />
        </div>
    </div>
  )
}

export default ContractDates
