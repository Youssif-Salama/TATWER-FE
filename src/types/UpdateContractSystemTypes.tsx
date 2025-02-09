export interface UpdateContractSystemDialogProps {
  RentValue?: string;
  FixedPrice?: string;
  CurrentReleaseDate?:string | null | undefined;
  CurrentPaymentWay?:string
  Applied?:boolean
  TaxValue?:string
  IsHanded:boolean
  DateType:"H"|"G"
}
export interface UpdateContractMultipleSystemDialogProps {
  Id: string;
  FixedPrice: string;
  Price: string;
  Times: string;
  ContractReleaseDate:string;
  PaymentWay:string
  TaxValue:string,
  IsHanded:boolean
  DateType:"H"|"G"
}
