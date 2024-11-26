import { createSlice } from "@reduxjs/toolkit"

interface PdfSliceTypes{
  reportContractsPdf:any
}


const initialState:PdfSliceTypes = {
  reportContractsPdf:null
}

export const PdfReducer=createSlice({
  name:"pdf",
  initialState,
  reducers:{
    setReportContractsPdf(state,action){
      state.reportContractsPdf=action.payload
    }
  }
})


export const {setReportContractsPdf}=PdfReducer.actions;

export default PdfReducer.reducer