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
import { setCatchContractIdChange, setContractType, setRefreshOnAddNewContractSystem } from "@/store/slices/GlobalSlice";
import CreateContractPayments from "../CreateContractPayments/CreateContractPayments";
import { UpdateContractApi } from "@/api/contract/UpdateContractApi";
import { GetSpecifiContractApi } from "@/api/contract/GetSpecificContractApi";
const CreateContractCollection = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const contractId = Cookies.get("contractId");
  const [hasTax, setHasTax] = useState(false);

  const formik = useFormik<CreateContractCollectionTypes>({
    initialValues: {
      Type: "tenant",
      Identity: "",
      Name: "",
      AdditionalName: "",
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
      ContractReleaseDate: new Date(),
      ContractDate: new Date(),
      PaymentWay: "",
      Price: 1,
      FixedPrice: 1,
      Times: 1,
      BankAccount:"",
      HasTax:hasTax,
      TaxValue:"",
    },
    validationSchema: CreateContractValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      if (contractId) {
        const result: any = await UpdateContractApi(values,contractId,values?.Type);
        result && successToaster(result?.data?.message);
        result && setLoading(false);
        !result && setLoading(false);
        result && dispatch(setRefreshOnAddNewContractSystem(Math.random()))
      } else {
        const result: any = await AddContractApi(values,values?.Type);
        result && successToaster(result?.data?.message);
        result && Cookies.set("contractId", result?.data?.contractId);
        result && Cookies.set("contractType", result?.data?.Type);
        result && dispatch(setCatchContractIdChange(Math.random()));
        result && dispatch(setRefreshOnAddNewContractSystem(Math.random()))
        result && setLoading(false);
        !result && setLoading(false);
      }
    },
  });

  const { contractType,resetForm } = useSelector(
    (state: RootState) => state.GlobalReducer
  );
  useEffect(() => {
    formik.setFieldValue("Type", contractType);
  }, [contractType]);


  const getOneContract = async (id: any) => {
    const result = await GetSpecifiContractApi(id);
    result?.data?.data.length>0 && formik.setValues(result?.data?.data[0]);
    result?.data?.data.length>0 && formik.setFieldValue("PaymentWay",result?.data?.data[0]?.PaymentWay[0]);
    result?.data?.data.length>0 && (
      result?.data?.data[0]?.HasTax ? setHasTax(true) : setHasTax(false)
    )
    dispatch(setContractType(result?.data?.data[0]?.Type));
  };

  useEffect(()=>{
    if(contractId){
      getOneContract(contractId)
    }
  },[contractId])

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
      <ContractOn formik={formik} setHasTax={setHasTax}/>
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <ContractAgent formik={formik} />
      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>
      <ContractData formik={formik} />
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
