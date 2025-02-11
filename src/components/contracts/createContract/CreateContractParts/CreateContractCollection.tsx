import { Button } from "@/componentsShadcn/ui/button";
import ContractAgent from "./ContractAgent";
import ContractData from "./ContractData";
import ContractOn from "./ContractOn";
import { useFormik } from "formik";
import { CreateContractCollectionTypes } from "@/types/CreateContractCollection.types";
import { CreateContractValidationSchema } from "@/validations/CreateContractValidationSchema";
import { AddContractApi } from "@/api/contract/AddContractApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { successToaster } from "@/utils/ReactToatify";
import LoadingSpinner from "@/common/LoadingSpinner";
import Cookies from "js-cookie";
import { setCatchContractIdChange, setContractDateType, setContractType, setRefreshOnAddNewContractSystem } from "@/store/slices/GlobalSlice";
import CreateContractPayments from "../CreateContractPayments/CreateContractPayments";
import { UpdateContractApi } from "@/api/contract/UpdateContractApi";
import { GetSpecifiContractApi } from "@/api/contract/GetSpecificContractApi";
import ContractMoreEmails from "./ContractMoreEmails";
import ContractDates from "./ContractDates";
const CreateContractCollection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const contractId = Cookies.get("contractId");
  const [hasTax, setHasTax] = useState(false);
  const [currentMoreEmails, setCurrentMoreEmails] = useState<string[]>([]);

  const formik = useFormik<CreateContractCollectionTypes>({
    initialValues: {
      Type: "tenant",
      DateType:"G",
      Identity: "",
      Name: "",
      AdditionalName: "",
      Nickname: "",
      Phone: "",
      Email: "",
      TaxNumber: "",
      Mobile: "",
      AdditionalPhone: "",
      Agent: "",
      RepresentationDocument: "",
      IdNumber: "",
      DocumentNumber: "",
      MobileNumber: "",
      DocumentDate: new Date(),
      ContractNumber: "",
      ContractCopy: "",
      RelyOn: "",
      ContractReleaseDate: "",
      ContractDate: new Date(),
      PaymentWay: "",
      Price: 1,
      FixedPrice: 1,
      Times: 1,
      BankAccount:"",
      HasTax:hasTax,
      TaxValue:"",
      MoreEmails: [],
      ContractStartsDate: new Date(),
      ContractSigningDate: new Date(),
      ContractEndsDate: new Date(),
    },
    validationSchema: CreateContractValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (contractId) {
        const result: any = await UpdateContractApi(values,contractId,values?.Type);
        result && successToaster(result?.data?.message);
        result && setLoading(false);
        !result && setLoading(false);
        result && Cookies.set("contractType", result?.data?.data?.Type);
        result && dispatch(setRefreshOnAddNewContractSystem(Math.random()));
        if(result?.date?.data?.DateType=="H"){
          formik.setFieldValue("ContractReleaseDate",result?.data?.data[0]?.ContractReleaseDateH?.split("T")[0])
        }
      } else {
        const result: any = await AddContractApi(values,values?.Type);
        result && successToaster(result?.data?.message);
        result && Cookies.set("contractId", result?.data?.data?._id);
        result && Cookies.set("contractType", result?.data?.data?.Type);
        result && dispatch(setCatchContractIdChange(Math.random()));
        result && dispatch(setRefreshOnAddNewContractSystem(Math.random()))
        result && setLoading(false);
        !result && setLoading(false);

      }
    },
  });

  const { contractType,contractDateType,resetForm,refreshOnAddNewContractSystem,refreshOnDeleteContractSystems } = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  useEffect(() => {
    formik.setFieldValue("Type", contractType);
  }, [contractType]);

  useEffect(() => {
    formik.setFieldValue("DateType", contractDateType);
  }, [contractDateType]);


  const getOneContract = async (id: any) => {
    const result = await GetSpecifiContractApi(id);
    result?.data?.data.length>0 && formik.setValues(result?.data?.data[0]);
    result?.data?.data.length>0 && formik.setFieldValue("Times",result?.data?.data[0].Times);
    formik.setFieldValue("ContractReleaseDate",result?.data?.data[0]?.ContractReleaseDate?.split("T")[0])
    result?.data?.data.length>0 && formik.setFieldValue("PaymentWay",result?.data?.data[0]?.PaymentWay[0]);
    result?.data?.data.length>0 && (
      result?.data?.data[0]?.HasTax ? setHasTax(true) : setHasTax(false)
    )
    result?.data?.data.length>0 && setCurrentMoreEmails(result?.data?.data[0]?.MoreEmails);
    if(result?.date?.data[0]?.DateType=="H"){
      formik.setFieldValue("ContractReleaseDate",result?.data?.data[0]?.ContractReleaseDateH?.split("T")[0])
    }
    dispatch(setContractType(result?.data?.data[0]?.Type));
    dispatch(setContractDateType(result?.data?.data[0]?.DateType))
  };

  useEffect(()=>{
    if(contractId){
      getOneContract(contractId)
    }
  },[contractId,refreshOnAddNewContractSystem,refreshOnDeleteContractSystems])

  useEffect(() => {
    formik.resetForm();
    document.querySelectorAll("input").forEach(element => {
      element.value = "";
    });
    document.querySelectorAll("textarea").forEach((element) => {
      element.value = "";
    })
    document.querySelectorAll("select").forEach((element) => {
      element.value = "";
    })
  }, [resetForm]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <ContractOn formik={formik} setHasTax={setHasTax} hasTax={hasTax}/>
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <ContractMoreEmails formik={formik}  currentMoreEmail={currentMoreEmails}/>
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <ContractAgent formik={formik} />
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <ContractData formik={formik} />
      <ContractDates  formik={formik}/>
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <CreateContractPayments formik={formik} hasTax={hasTax} />

        <Button
        disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
        >
          {loading ? (
            <LoadingSpinner color="text-[#fff]" />
          ) : (
            contractId?"تعديل العقد":"حفظ العقد"
          )}
        </Button>
    </form>
  );
};

export default CreateContractCollection;
