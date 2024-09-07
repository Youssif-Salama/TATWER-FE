import InputCommon from "@/common/InputCommon";
import InputDateCommon from "@/common/InputDateCommon";

const ContractAgent = ({ formik }: { formik: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="Agent"
            name="Agent"
            placeholder="ادخل الاسم هنا"
            label="الممثل"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Agent}
            error={formik.errors && formik.touched.Agent && formik.errors.Agent}
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="IdNumber"
            name="IdNumber"
            placeholder="ادخل رقم الهويه هنا"
            label="رقم الهويه "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.IdNumber}
            error={
              formik.errors && formik.touched.IdNumber && formik.errors.IdNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required
            id="MobileNumber"
            name="MobileNumber"
            placeholder="ادخل رقم الجوال هنا"
            label="رقم الجوال  "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.MobileNumber}
            error={
              formik.errors &&
              formik.touched.MobileNumber &&
              formik.errors.MobileNumber
            }
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="RepresentationDocument"
            name="RepresentationDocument"
            placeholder="ادخل مستند الممثل هنا"
            label="مستند الممثل"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.RepresentationDocument}
            error={
              formik.errors &&
              formik.touched.RepresentationDocument &&
              formik.errors.RepresentationDocument
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="DocumentNumber"
            name="DocumentNumber"
            placeholder="ادخل رقم المستند  هنا"
            label=" رقم المستند"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.DocumentNumber}
            error={
              formik.errors &&
              formik.touched.DocumentNumber &&
              formik.errors.DocumentNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputDateCommon
            required={true}
            id="DocumentDate"
            name="DocumentDate"
            label="تاريخ المستند"
            placeholder="تاريخ المستند"
            formik={formik}
            onBlur={formik.handleBlur}
            value={formik.values.DocumentDate}
            error={formik.errors && formik.touched.DocumentDate && formik.errors.DocumentDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractAgent;
