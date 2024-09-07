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
  refreshEstateFiles: any
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
  refreshEstateFiles: null
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
  setCatchEstateIdChange
} = GlobalReducer.actions;

export default GlobalReducer.reducer;
