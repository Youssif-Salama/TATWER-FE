import { useEffect, useState } from "react";
import ContractUnitesLandlords from "./ContractUnitesTypes/ContractUnitesLandlords/ContractUnitesLandlords";
import ContractUnitesTenants from "./ContractUnitesTypes/ContractUnitesTenants/ContractUnitesTenants";
import UnitesForLandlords from "./ContractUnitesTypes/ContractUnitesLandlords/UnitesForLandlords";
import UnitesForTenants from "./ContractUnitesTypes/ContractUnitesTenants/UnitesForTenants";
import { Button } from "@/componentsShadcn/ui/button";
import LoadingSpinner from "@/common/LoadingSpinner";
import { AddContractUnitesApi } from "@/api/contractUnites/AddContractUnitesApi";
import LandlordUnitesTable from "./ContractUnitesTypes/ContractUnitesLandlords/displayContractLandlordsUnites/LandlordUnitesTable";
import TenantUnitesTable from "./ContractUnitesTypes/ContractUnitesTenants/displayContractTenantsUnites /TenantUnitesTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setRefreshLandlordunites, setRefreshonAddNewLanlordFiles, setRefreshonAddNewTenantFiles, setRefreshTenantUnites } from "@/store/slices/GlobalSlice";
import AddLandLordUniteFiles from "@/componentsShadcn/dialogs/AddLandLordUniteFiles";
import { AddLandLordFilesApi } from "@/api/landlordFiles/AddLandLordFilesApi";
import AddTenantUNiteFiles from "@/componentsShadcn/dialogs/AddTenantUNiteFiles";
import { AddTenantFile } from "@/api/tenantFiles/AddTenantFile";

const ContractUnites = () => {
  const [tenantId, setTenantId] = useState(null);
  const [landlordId, setLandlordId] = useState(null);
  const [loadingTenant, setLoadingTenant] = useState(false);

  const [tenantUnit, setTenantUnit] = useState(null);
  const [landlordUnit, setLandlordUnit] = useState(null);
  const [loadingLandlord, setLoadingLandlord] = useState(false);
  const dispatch:AppDispatch=useDispatch();


  const [landlordFiles, setLandlordFiles] = useState<any>(null);
  const [landlordNames, setLandlordNames] = useState<any>([]);


  const [tenantFiles, setTenantFiles] = useState<any>(null);
  const [tenantNames, setTenantNames] = useState<any>([]);




  const addTenantContractUnite = async () => {
    const data = {
      ContractId: tenantId,
      UniteId: tenantUnit,
    };
    const result=await AddContractUnitesApi(data, setLoadingTenant);
    result && setTenantUnit(null);
    result && setTenantId(null);
    result && dispatch(setRefreshTenantUnites(Math.random()));
    if(result &&tenantFiles?.length>0 && tenantNames?.length>0){
      let formData=new FormData();
      // @ts-ignore
      formData.append("contractId",tenantId);
      // @ts-ignore
      formData.append("uniteId",tenantUnit);
      Array.from(tenantFiles).forEach((file:any)=>{
        formData.append("File",file);
      })

      formData.append("Names",JSON.stringify(tenantNames));
      const response=await AddTenantFile(formData);
      if(response){
        setTenantFiles(null);
        setTenantNames([]);
        dispatch(setRefreshonAddNewTenantFiles(Math.random()))
      }
    }
  };

  const addLandlordContractUnite = async () => {
    const data = {
      ContractId: landlordId,
      UniteId: landlordUnit,
    };
    const result:any=await AddContractUnitesApi(data, setLoadingLandlord);
    result && setLandlordUnit(null);
    result && setLandlordId(null);
    result && dispatch(setRefreshLandlordunites(Math.random()));
  if(result &&landlordFiles?.length>0 && landlordNames?.length>0){
    let formData=new FormData();
    // @ts-ignore
    formData.append("contractId",landlordId);
    // @ts-ignore
    formData.append("uniteId",landlordUnit);
    Array.from(landlordFiles).forEach((file:any)=>{
      formData.append("File",file);
    })

    formData.append("Names",JSON.stringify(landlordNames));
    const response=await AddLandLordFilesApi(formData);
    if(response){
      setLandlordFiles(null);
      setLandlordNames([]);
      dispatch(setRefreshonAddNewLanlordFiles(Math.random()))
    }
  }
  };

  useEffect(() => {
    console.log(landlordFiles,landlordNames);

  }, [tenantUnit, tenantId,landlordFiles,landlordNames]);

  return (
    <div>
      <div>
        <div className="flex items-start justify-between">
          <div>
            <ContractUnitesTenants setTenantId={setTenantId} />
          </div>
          <div>
            <UnitesForTenants setTenantUnit={setTenantUnit}  />
          </div>
        </div>
        <div className="text-[12px]  mt-4" dir="rtl">
              <AddTenantUNiteFiles setFiles={setTenantFiles} names={tenantNames} tenantNames={tenantNames} setTenantNames={setTenantNames}/>
            </div>
        <div>
          <Button
            disabled={tenantId && tenantUnit ? false : true}
            type="submit"
            onClick={addTenantContractUnite}
            className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
          >
            {loadingTenant ? (
              <LoadingSpinner color="text-[#fff]" />
            ) : (
              "ريط المؤجر مع هذه الوحده"
            )}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <TenantUnitesTable/>
      </div>

      <div className="my-6">
        <p className="h-[2px] bg-gray-300" />
      </div>

      <div>
        <div className="flex items-start justify-between">
          <div>
            <ContractUnitesLandlords setLandlordId={setLandlordId} />
          </div>
          <div>
            <UnitesForLandlords setLandlordUnit={setLandlordUnit} />
          </div>
        </div>

            <div className="text-[12px]  mt-4" dir="rtl">
              <AddLandLordUniteFiles setLandlordFiles={setLandlordFiles} landlordNames1={landlordNames} landlordNames={landlordNames} setLandlordNames={setLandlordNames}/>
            </div>

        <Button
          disabled={landlordId && landlordUnit ? false : true}
          type="submit"
          onClick={addLandlordContractUnite}
          className="my-6 w-full bg-[#0077bc] rounded-none hover:bg-[#0078bdc7] transition ease-in-out duration-300 transform flex items-center justify-center"
        >
          {loadingLandlord ? (
            <LoadingSpinner color="text-[#fff]" />
          ) : (
            "ربط المستأجر مع هذه الوحده"
          )}
        </Button>
      </div>
      <div className="mt-6">
        <LandlordUnitesTable/>
      </div>
    </div>
  );
};

export default ContractUnites;
