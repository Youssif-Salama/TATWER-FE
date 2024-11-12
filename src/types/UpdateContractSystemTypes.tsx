export interface UpdateContractSystemDialogProps {
  RentValue?: string;
  FixedPrice?: string;
  CurrentReleaseDate?:string;
  CurrentPaymentWay?:string
  Applied?:boolean
  TaxValue?:string
}
export interface UpdateContractMultipleSystemDialogProps {
  Id: string;
  FixedPrice: string;
  Price: string;
  Times: string;
  ContractReleaseDate:string;
  PaymentWay:string
  TaxValue:string
}
