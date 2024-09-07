import InputCommon from "@/common/InputCommon";


const ContractAddressForm = ({ formik }: { formik: any }) => {

    return (
        <form onSubmit={formik.handleSubmit} >
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center flex-wrap w-full gap-4 justify-between">
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="City" name="City" placeholder="ادخل اسم المنطقه هنا" label="المنطقه" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.City} error={formik.errors && formik.touched.City && formik.errors.City}/>
                    </div>
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="Town" name="Town" placeholder="ادخل اسم المدينه هنا" label="المدينه " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Town} error={formik.errors && formik.touched.Town && formik.errors.Town}/>
                    </div>
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="Neighborhood" name="Neighborhood" placeholder=" ادخل اسم الحي هنا" label="اسم الحي " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Neighborhood} error={formik.errors && formik.touched.Neighborhood && formik.errors.Neighborhood}/>
                    </div>
                </div>
                <div className="flex items-center flex-wrap w-full gap-4 justify-between">
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="Street" name="Street" placeholder="ادخل اسم الشارع هنا" label="الشارع" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Street} error={formik.errors && formik.touched.Street && formik.errors.Street}/>
                    </div>
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="PostalCode" name="PostalCode" placeholder="ادخل الرمز البريدي هنا" label="الرمز البريدي" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.PostalCode} error={formik.errors && formik.touched.PostalCode && formik.errors.PostalCode}/>
                    </div>
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="BuildingNumber" name="BuildingNumber" placeholder="ادخل رقم مبني هنا" label="   رقم المبني " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.BuildingNumber} error={formik.errors && formik.touched.BuildingNumber && formik.errors.BuildingNumber}/>
                    </div>
                    <div className="w-[30%] max-md:w-[45%] max-sm:w-full">
                        <InputCommon type="text" required id="AdditionalBuildingNumber" name="AdditionalBuildingNumber" placeholder="ادخل رقم مبني اضافي هنا" label="رقم المبني الاضافي" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.AdditionalBuildingNumber} error={formik.errors && formik.touched.AdditionalBuildingNumber && formik.errors.AdditionalBuildingNumber}/>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContractAddressForm;
