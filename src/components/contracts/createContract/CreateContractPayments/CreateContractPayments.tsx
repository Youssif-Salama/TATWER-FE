import InputCommon from "@/common/InputCommon";




const CreateContractPayments = ({formik}:{formik:any}) => {
    return (
        <div className="flex items-center flex-wrap w-full gap-4 justify-between">
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="text" required id="Price" name="Price" placeholder="ادخل المبلغ هنا" label="مبلغ الدفع" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Price} error={formik.errors && formik.touched.Price && formik.errors.Price} />
                </div>
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="text" required id="FixedPrice" name="FixedPrice" placeholder="ادخل المبلغ هنا" label="المبالغ الثابته " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.FixedPrice} error={formik.errors && formik.touched.FixedPrice && formik.errors.FixedPrice} />
                </div>
                <div className="w-[30%] max-md:w-[35%] max-sm:w-full">
                    <InputCommon type="number" required id="Times" name="Times" placeholder="ادخل التكرار هنا" label=" التكرار " onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.Times} error={formik.errors && formik.touched.Times && formik.errors.Times} />
                </div>
        </div >
    );
}

export default CreateContractPayments;
