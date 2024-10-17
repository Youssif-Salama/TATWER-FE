import InputCommon from "@/common/InputCommon";
import InputDateCommon from "@/common/InputDateCommon";


const EstateForm = ({ formik }: { formik: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"

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

            id="ConstructionAndMaintenanceExpenses"
            name="ConstructionAndMaintenanceExpenses"
            placeholder="مصاريف الانشاء و الصيانة"
            label=" مصاريف الانشاء و الصيانة"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ConstructionAndMaintenanceExpenses}
            error={
              formik.errors &&
              formik.touched.ConstructionAndMaintenanceExpenses &&
              formik.errors.ConstructionAndMaintenanceExpenses
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
        <InputCommon
            type="text"

            id="BuildingPermit"
            name="BuildingPermit"
            placeholder="رخصة البناء"
            label="رخصة البناء"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.BuildingPermit}
            error={
              formik.errors &&
              formik.touched.BuildingPermit &&
              formik.errors.BuildingPermit
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
        <InputCommon
            type="text"

            id="ConstructionCompletionPermit"
            name="ConstructionCompletionPermit"
            placeholder="رخصة إتمام البناء"
            label="رخصة إتمام البناء"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ConstructionCompletionPermit}
            error={
              formik.errors &&
              formik.touched.ConstructionCompletionPermit &&
              formik.errors.ConstructionCompletionPermit
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
        <InputCommon
            type="text"

            id="ComplianceCertificate"
            name="ComplianceCertificate"
            placeholder="شهادة امتثال"
            label="شهادة امتثال"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ComplianceCertificate}
            error={
              formik.errors &&
              formik.touched.ComplianceCertificate &&
              formik.errors.ComplianceCertificate
            }
          />
        </div>
        <div className="w-[45%] max-sm:w-full flex items-center gap-4">
        <label htmlFor="Situation" className="text-[#0077bc] text-[14px]">حاله العقار</label>
        <div className="w-full">
          <select
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Situation}
          name="Situation" id="Situation" className="bg-white w-full p-3 border-2 border-slate-200 text-[#1f1f1f] text-[12px]">
            <option value="">حدد حاله العقار</option>
            <option value="active">نشط</option>
            <option value="inactive">مسوده</option>
          </select>
        </div>
        </div>
        <div className="w-[45%] max-sm:w-full">
        <InputDateCommon
            id="EstateDate"
            name="EstateDate"
            placeholder="تاريح العقار"
            label="تاريخ العقار"
            onBlur={formik.handleBlur}
            formik={formik}
            value={formik.values.EstateDate}
            error={
              formik.errors &&
              formik.touched.EstateDate &&
              formik.errors.EstateDate
            }
          />
        </div>

      </div>
      <div className="w-full">
        <label htmlFor="Notes" className="text-[#0077bc] text-[14px]">الملاحظات</label>
        <textarea
            id="Notes"
            name="Notes"
            placeholder="ادخل الملاحظات هنا"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Notes}
            className="w-full border-2 border-gray-200 p-2"
          />
        </div>
    </div>
  );
};

export default EstateForm;
