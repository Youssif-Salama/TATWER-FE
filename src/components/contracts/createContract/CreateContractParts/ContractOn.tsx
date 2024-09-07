import InputCommon from "@/common/InputCommon";
import { Input } from "@/componentsShadcn/ui/input";

import { useState } from "react";

const ContractOn = ({ formik }: { formik: any }) => {
  const [typeOfOwnerIdentity, setTypeOfOwnerIdentity] = useState<string>();
  return (
    <div className="w-full flex flex-col gap-4">
      <div
        className={`${
          typeOfOwnerIdentity == "others"
            ? "flex items-center flex-wrap w-full gap-4 justify-between"
            : "flex items-center flex-wrap w-full gap-[49px] max-md:gap-4"
        }`}
      >
        <div className="flex items-center w-[30%] max-md:w-[45%] max-sm:w-full">
          <div className="flex items-center h-10 w-full" dir="rtl">
            <select
              className="bg-[#0077bc] text-white h-full translate-y-[10px] w-[23%] px-1"
              onChange={(e) => setTypeOfOwnerIdentity(e.target.value)}
            >
              <option value="identity">الهويه الوطنيه</option>
              <option value="uniCode">الرقم الموحد</option>
              <option value="others">معرف اخر</option>
            </select>

            <div className="w-full">
              {
                <div className="text-red-500 text-[10px] mb-1 h-[15px]">
                  {formik.errors.Identity &&
                    formik.touched.Identity &&
                    formik.errors.Identity}
                </div>
              }
              <Input
                type="text"
                className="rounded-none w-full mx-auto placeholder:text-gray-400 text-[14px] px-2 py-3 border-2 border-slate-200"
                value={formik.values.Identity}
                onChange={formik.handleChange}
                name="Identity"
                required
                id="Identity"
                placeholder="ادخل المعرف هنا"
              />
            </div>
          </div>
        </div>

        {typeOfOwnerIdentity === "others" && (
          <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
            <InputCommon
              type="text"
              required={false}
              id="AdditionalName"
              name="AdditionalName"
              placeholder="ادخل الاسم الاخر هنا"
              label="اسم المعرف الاخر"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.AdditionalName}
              error={
                formik.errors &&
                formik.touched.AdditionalName &&
                formik.errors.AdditionalName
              }
            />
          </div>
        )}
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="Name"
            name="Name"
            placeholder="ادخل الاسم هنا"
            label="الاسم"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            error={formik.errors && formik.touched.Name && formik.errors.Name}
          />
        </div>
      </div>

      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required
            id="Phone"
            name="Phone"
            placeholder="ادخل رقم الهاتف هنا"
            label="الهاتف"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Phone}
            error={formik.errors && formik.touched.Phone && formik.errors.Phone}
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required
            id="Mobile"
            name="Mobile"
            placeholder="ادخل رقم الجوال هنا"
            label=" الجوال"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Mobile}
            error={
              formik.errors && formik.touched.Mobile && formik.errors.Mobile
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="tel"
            required={false}
            id="AdditionalPhone"
            name="AdditionalPhone"
            placeholder="ادخل رقم اضافي هنا"
            label="  رقم اضافي"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.AdditionalPhone}
            error={
              formik.errors &&
              formik.touched.AdditionalPhone &&
              formik.errors.AdditionalPhone
            }
          />
        </div>
      </div>

      <div className="flex items-center flex-wrap w-full gap-4 justify-between">
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required
            id="TaxNumber"
            name="TaxNumber"
            placeholder="ادخل  الرقم الضريبي هنا"
            label="الرقم الضريبي"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.TaxNumber}
            error={
              formik.errors &&
              formik.touched.TaxNumber &&
              formik.errors.TaxNumber
            }
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="email"
            required={false}
            id="Email"
            name="Email"
            placeholder="ادخل البريد الالكتروني هنا"
            label=" البريد الالكتروني"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Email}
            error={formik.errors && formik.touched.Email && formik.errors.Email}
          />
        </div>
        <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
          <InputCommon
            type="text"
            required={false}
            id="Website"
            name="Website"
            placeholder="ادخل  الموقع الالكتروني هنا"
            label="   الموقع الالكتروني"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Website}
            error={
              formik.errors && formik.touched.Website && formik.errors.Website
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContractOn;
