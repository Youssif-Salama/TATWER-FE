import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useFormik } from "formik";

import { useDispatch } from "react-redux";
import EstateAddressForm from "./EstateAddressForm";
import EstateAddressMap from "./EstateAddressMap";
import { UpdateEstateAddressApi } from "@/api/estateAddress/UpdateEstateAddressApi";
import { AddEstateAddressApi } from "@/api/estateAddress/AddEstateAddressApi";
import { GetSpecificEstateAddressApi } from "@/api/estateAddress/GetSpecificEstateAddressApi";
import { successToaster } from "@/utils/ReactToatify";
import { setMapLocation } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { CreateEstateAddressType } from "@/types/CreateEstateAddressType";
import { CreateEstateAddressValidationSchema } from "@/validations/CreateEstateAddressValidationSchema";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/common/LoadingSpinner";
import { Button } from "@/componentsShadcn/ui/button";

const CreateEstateAddress = () => {

    const dispatch:AppDispatch=useDispatch();
    const estateAddressId = Cookies.get("estateAddressId");
    const [estateId, setEstateId] = useState<any>();

    useEffect(() => {
        setEstateId(Cookies.get("estateId"));
    }, [])

    const [loading, setLoading] = useState(false);
    const formik = useFormik<CreateEstateAddressType>({
        initialValues: {
            City: "",
            Town: "",
            Neighborhood: "",
            Street: "",
            PostalCode: "",
            BuildingNumber: "",
            AdditionalBuildingNumber: "",
            lat: "",
            lang: "",
            Link:""
        },
        validationSchema: CreateEstateAddressValidationSchema,
        onSubmit: async (values: CreateEstateAddressType, { resetForm }: any) => {
            setLoading(true);
            if(estateAddressId){
                const result: any = await UpdateEstateAddressApi(values,estateAddressId);
                result && successToaster(result?.data?.message);
                result && setLoading(false);
                !result && setLoading(false);
            }else {
                const result: any = await AddEstateAddressApi(values,estateId);
                result && successToaster(result?.data?.message);
                result && resetForm();
                result && setLoading(false);
                !result && setLoading(false);
                result && Cookies.set("estateAddressId", result?.data?.addressId);
            }
        }
    })

    const getONeAddress=async(id:any)=>{
        const result=await GetSpecificEstateAddressApi(id);
        if(result?.data?.data.length>0){
             formik.setValues(result?.data?.data[0]);
             dispatch(setMapLocation({lat:result?.data?.data[0].lat,lng:result?.data?.data[0].lang}));
        }
    }
    useEffect(()=>{
        if(estateAddressId){
            getONeAddress(estateAddressId);
        }
    },[estateAddressId])

    return (
        <>
            <div className={`flex items-center justify-center min-h-screen ${estateId ? "hidden" : ""} border-2 border-gray-300`}>
                <div className="font-bold">
                    <p className="text-[#0077bc]">لا يمكنك اضافه عنوان قبل اضافه العقار</p>
                    <Link to="/estates/create" className='my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center p-2 text-white'>
                        الرجوع لاضافه عقار
                    </Link>
                </div>
            </div>
            <form className={`${estateId ? "" : "hidden"} flex flex-col gap-4 py-2`} onSubmit={formik.handleSubmit}>
                <EstateAddressForm formik={formik} />
                <div className='my-6'>
                    <p className="h-[2px] bg-gray-300" />
                </div>
                <EstateAddressMap formik={formik} />
                <Button disabled={!(formik.dirty)}
                    type="submit" className='my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center'>
                    {
                        loading ? <LoadingSpinner color="text-[#fff]" /> : (
                            estateAddressId ? "تعديل عنوان" : "اضافه عنوان"
                        )

                    }
                </Button>
            </form>
        </>
    );
}

export default CreateEstateAddress;
