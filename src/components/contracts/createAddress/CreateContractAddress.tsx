import { useEffect, useState } from "react";
import ContractAddressForm from "./ContractAddressForm";
import ContractAddressMap from "./ContractAddressMap";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { CreateContractAddressTypes } from "@/types/CreateContractAddressTypes";
import { AddressValidationSchema } from "@/validations/CreateContractAddressValidationSchema";
import { AddContractAddressApi } from "@/api/address/AddContractAddressApi";
import { successToaster } from "@/utils/ReactToatify";
import { Button } from "@/componentsShadcn/ui/button";
import LoadingSpinner from "@/common/LoadingSpinner";
import { GetSpecificAddressApi } from "@/api/address/GetSpecificAddressApi";
import { setMapLocation } from "@/store/slices/GlobalSlice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { UpdateContractAddressApi } from "@/api/address/UpdateContractAddressApi";

const CreateContractAddress = () => {

    const dispatch:AppDispatch=useDispatch();
    const addressId = Cookies.get("addressId");
    const [contractId, setContractId] = useState<any>();
    useEffect(() => {
        setContractId(Cookies.get("contractId"));
    }, [])

    const [loading, setLoading] = useState(false);
    const formik = useFormik<CreateContractAddressTypes>({
        initialValues: {
            City: "",
            Town: "",
            Neighborhood: "",
            Street: "",
            PostalCode: "",
            BuildingNumber: "",
            AdditionalBuildingNumber: "",
            lat: "",
            lang: ""
        },
        validationSchema: AddressValidationSchema,
        onSubmit: async (values: CreateContractAddressTypes, { resetForm }: any) => {
            setLoading(true);
            if(addressId){
                const result: any = await UpdateContractAddressApi(values,addressId);
                result && successToaster(result?.data?.message);
                result && setLoading(false);
                !result && setLoading(false);
            }else {
                const result: any = await AddContractAddressApi(values,contractId);
                result && successToaster(result?.data?.message);
                result && resetForm();
                result && setLoading(false);
                !result && setLoading(false);
                result && Cookies.set("addressId", result?.data?.addressId);
            }
        }
    })

    const getONeAddress=async(id:any)=>{
        const result=await GetSpecificAddressApi(id);
        if(result?.data?.data.length>0){
             formik.setValues(result?.data?.data[0]);
             dispatch(setMapLocation({lat:result?.data?.data[0].lat,lng:result?.data?.data[0].lang}));
        }
    }
    useEffect(()=>{
        if(addressId){
            getONeAddress(addressId);
        }
    },[addressId])

    return (
        <>
            <div className={`flex items-center justify-center min-h-screen ${contractId ? "hidden" : ""} border-2 border-gray-300`}>
                <div className="font-bold">
                    <p className="text-[#0077bc]">لا يمكنك اضافه عنوان قبل اضافه العقد</p>
                    <Link to="/contracts/create" className='my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center p-2 text-white'>
                        الرجوع لاضافه عقد
                    </Link>
                </div>
            </div>
            <form className={`${contractId ? "" : "hidden"} flex flex-col gap-4 py-2`} onSubmit={formik.handleSubmit}>
                <ContractAddressForm formik={formik} />
                <div className='my-6'>
                    <p className="h-[2px] bg-gray-300" />
                </div>
                <ContractAddressMap formik={formik} />
                <Button disabled={!(formik.dirty)}
                    type="submit" className='my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center'>
                    {
                        loading ? <LoadingSpinner color="text-[#fff]" /> : (
                            addressId ? "تعديل عنوان" : "اضافه عنوان"
                        )

                    }
                </Button>
            </form>
        </>
    );
}

export default CreateContractAddress;
