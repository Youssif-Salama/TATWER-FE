import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  contractType: string;
  getContractType:string;
  catchContractIdChange: any;
  refreshOnAddNewContractSystem: any;
  mapLocation: any;
  refreshContractFiles:any,
  refreshONDeleteContracts:any,
  refreshOnDeleteContractSystems:any,
  resetForm:any,
  refreshOnApplyOrSetSystemMessage:any,
  refreshTax:any,
  paymentWay:any,
  catchEstateIdChange: any;
  refreshEstateFiles: any;
  refrehEstateUnites:any;
  uniteAddonsLength:any;
  resetUniteAddons:any;
  refreshOnDeleteUnite:any;
  refreshTenantUnites:any;
  refreshLandlordUnites:any;
  refreshOnDeleteContractUnites:any;
  refreshONDeleteEmployee:any;
  refreshOnUpdateEmployee:any;
  refreshFileUploaderInSendMessage:any;
  refreshOnChangeMessages:any;
  refreshonAddNewLanlordFiles:any;
  refreshonAddNewTenantFiles:any;
  resfreshObjects:any,
  refreshProfile:any,
  refreshRemindings:any
  refreshonDeleteMessage:any,
  currentEstateTenantId:any
  currentEstateLandlordId:any,
  refreshAllRoles:any
}

const initialState: InitialState = {
  contractType: "tenant",
  catchContractIdChange: null,
  refreshOnAddNewContractSystem: null,
  mapLocation: null,
  refreshContractFiles:null,
  getContractType:"tenant",
  refreshONDeleteContracts:null,
  refreshOnDeleteContractSystems:null,
  resetForm:null,
  refreshOnApplyOrSetSystemMessage:null,
  refreshTax:null,
  paymentWay:null,
  catchEstateIdChange: null,
  refreshEstateFiles: null,
  refrehEstateUnites:null,
  uniteAddonsLength:0,
  resetUniteAddons:null,
  refreshOnDeleteUnite:null,
  refreshTenantUnites:null,
  refreshLandlordUnites:null,
  refreshOnDeleteContractUnites:null,
  refreshONDeleteEmployee:null,
  refreshOnUpdateEmployee:null,
  refreshFileUploaderInSendMessage:null,
  refreshOnChangeMessages:null,
  refreshonAddNewLanlordFiles:null,
  refreshonAddNewTenantFiles:null,
  resfreshObjects:null,
  refreshProfile:null,
  refreshRemindings:null,
  refreshonDeleteMessage:null,
  currentEstateTenantId:null,
  currentEstateLandlordId:null,
  refreshAllRoles:null
};

const GlobalReducer = createSlice({
  name: "global",
  initialState,
  reducers: {
    setContractType: (state, action) => {
      state.contractType = action.payload;
    },
    setCatchContractIdChange: (state, action) => {
      state.catchContractIdChange = action.payload;
    },
    setRefreshOnAddNewContractSystem: (state, action) => {
      state.refreshOnAddNewContractSystem = action.payload;
    },
    setMapLocation: (state, action) => {
      state.mapLocation = action.payload;
    },
    setRefreshContractFiles:(state,action)=>{
      state.refreshContractFiles=action.payload
    },
    setGetContractType:(state,action)=>{
      state.getContractType=action.payload
    },
    setRefreshOnDeleteContracts:(state,action)=>{
      state.refreshONDeleteContracts=action.payload
    },
    setRefreshOnDeleteContractSystems:(state,action)=>{
      state.refreshOnDeleteContractSystems=action.payload
    },
    setResetForm:(state,action)=>{
      state.resetForm=action.payload
    },
    setRefreshOnApplyOrSetSystemMessage:(state,action)=>{
      state.refreshOnApplyOrSetSystemMessage=action.payload
    },
    setRefrehTax:(state,action)=>{
      state.refreshTax=action.payload
    },
    setRefrehPaymentWay:(state,action)=>{
      state.paymentWay=action.payload
    },
    setCatchEstateIdChange: (state, action) => {
      state.catchEstateIdChange = action.payload;
    },
    setRefreshEstateFiles: (state, action) => {
      state.refreshEstateFiles = action.payload;
    },
    setRefrehEstateUnites:(state,action)=>{
      state.refrehEstateUnites=action.payload
    },
    setUniteAddonsLength:(state,action)=>{
      state.uniteAddonsLength=action.payload
    },
    setResetUniteAddons:(state,action)=>{
      state.resetUniteAddons=action.payload
    },
    setRefreshOnDeleteUnite:(state,action)=>{
      state.refreshOnDeleteUnite=action.payload
    },
    setRefreshTenantUnites:(state,action)=>{
      state.refreshTenantUnites=action.payload
    },
    setRefreshLandlordunites:(state,action)=>{
      state.refreshLandlordUnites=action.payload
    },
    setRefreshOnDeleteContractUnites:(state,action)=>{
      state.refreshOnDeleteContractUnites=action.payload
    },
    setRefreshONDeleteEmployee:(state,action)=>{
      state.refreshONDeleteEmployee=action.payload
    },
    setRefreshOnUpdateEmployee:(state,action)=>{
      state.refreshOnUpdateEmployee=action.payload
    },
    setRefreshFileUploaderInSendMessage:(state,action)=>{
      state.refreshFileUploaderInSendMessage=action.payload
    },
    setRefreshOnChangeMessages:(state,action)=>{
      state.refreshOnChangeMessages=action.payload
    },
    setRefreshonAddNewLanlordFiles:(state,action)=>{
      state.refreshonAddNewLanlordFiles=action.payload
    },
    setRefreshonAddNewTenantFiles:(state,action)=>{
      state.refreshonAddNewTenantFiles=action.payload
    },
    setResfreshObjects:(state,action)=>{
      state.resfreshObjects=action.payload
    },
    setRefreshProfile:(state,action)=>{
      state.refreshProfile=action.payload
    },
    setRefreshRemindings:(state,action)=>{
      state.refreshRemindings=action.payload
    },
    setRefreshOnDeleteMessage:(state,action)=>{
      state.refreshonDeleteMessage=action.payload
    },
    setCurrentEstateTenantId:(state,action)=>{
      state.currentEstateTenantId=action.payload
    },
    setCurrentEstateLandlordId:(state,action)=>{
      state.currentEstateLandlordId=action.payload
    },
    setRefreshAllRoles:(state,action)=>{
      state.refreshAllRoles=action.payload
    }
  },
});

export const {
  setContractType,
  setCatchContractIdChange,
  setRefreshOnAddNewContractSystem,
  setMapLocation,
  setRefreshContractFiles,
  setRefreshEstateFiles,
  setGetContractType,
  setRefreshOnDeleteContracts,
  setRefreshOnDeleteContractSystems,
  setResetForm,
  setRefreshOnApplyOrSetSystemMessage,
  setRefrehTax,
  setRefrehPaymentWay,
  setCatchEstateIdChange,
  setRefrehEstateUnites,
  setUniteAddonsLength,
  setResetUniteAddons,
  setRefreshOnDeleteUnite,
  setRefreshTenantUnites,
  setRefreshLandlordunites,
  setRefreshOnDeleteContractUnites,
  setRefreshONDeleteEmployee,
  setRefreshOnUpdateEmployee,
  setRefreshFileUploaderInSendMessage,
  setRefreshOnChangeMessages,
  setRefreshonAddNewLanlordFiles,
  setRefreshonAddNewTenantFiles,
  setResfreshObjects,
  setRefreshProfile,
  setRefreshRemindings,
  setRefreshOnDeleteMessage,
  setCurrentEstateTenantId,
  setCurrentEstateLandlordId,
  setRefreshAllRoles
} = GlobalReducer.actions;

export default GlobalReducer.reducer;
