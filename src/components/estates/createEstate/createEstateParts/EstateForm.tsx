import InputCommon from "@/common/InputCommon";


const EstateForm = ({ formik }: { formik: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="EstateName"
            name="EstateName"
            placeholder="ادخل الاسم هنا"
            label="العقار/المشروع"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.EstateName}
            error={formik.errors && formik.touched.EstateName && formik.errors.EstateName}
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="TitleDeedNumber"
            name="TitleDeedNumber"
            placeholder="ادخل رقم وثيقه الملكيه هنا"
            label="رقم وثيقه الملكيه "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.TitleDeedNumber}
            error={
              formik.errors && formik.touched.TitleDeedNumber && formik.errors.TitleDeedNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required
            id="EstateSpace"
            name="EstateSpace"
            placeholder="ادخل مساحه العقار هنا"
            label="مساحه العقار  "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.EstateSpace}
            error={
              formik.errors &&
              formik.touched.EstateSpace &&
              formik.errors.EstateSpace
            }
          />
        </div>
      </div>
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="PieceNumber"
            name="PieceNumber"
            placeholder="ادخل رقم القطعه هنا"
            label="رقم القطعه "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PieceNumber}
            error={
              formik.errors &&
              formik.touched.PieceNumber &&
              formik.errors.PieceNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="PlanNumber"
            name="PlanNumber"
            placeholder="ادخل رقم المخطط  هنا"
            label=" رقم المخطط"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PlanNumber}
            error={
              formik.errors &&
              formik.touched.PlanNumber &&
              formik.errors.PlanNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
        <InputCommon
            type="text"
            required
            id="Notes"
            name="Notes"
            placeholder="ادخل رقم الحساب البنكي  هنا"
            label=" الحساب البنكي"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Notes}
            error={
              formik.errors &&
              formik.touched.Notes &&
              formik.errors.Notes
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full flex items-center gap-4">
        <label htmlFor="Situation" className="text-[#0077bc] text-[14px]">حاله العقار</label>
        <div className="w-full">
          <select
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Situation}
          name="Situation" id="Situation" className="bg-white w-full p-3 border-2 border-slate-200 text-[#1f1f1f] text-[12px]">
            <option>حدد حاله العقار</option>
            <option value="active">مكتمل</option>
            <option value="inactive">غير مكتمل</option>
          </select>
        </div>
        </div>
      </div>
    </div>
  );
};

export default EstateForm;
