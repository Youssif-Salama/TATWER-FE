export interface CreateContractCollectionTypes {
  Type: "tenant" | "landlord";
  Name: string;
  AdditionalName?: string;
  Phone: string;
  Email: string;
  TaxNumber: string;
  Mobile: string;
  AdditionalPhone?: string;
  Website?: string;
  Agent: string;
  RepresentationDocument: string;
  IdNumber: string;
  DocumentNumber: string;
  MobileNumber: string;
  DocumentDate: Date|"";
  ContractNumber: string;
  ContractCopy: string;
  RelyOn: string;
  ContractReleaseDate: Date|"";
  PaymentWay: "1" | "3" | "6" | "12" | string;
  Identity:string;

  ContractDate:Date |string;
  Price:number;
  FixedPrice:number;
  Times:number
  BankAccount:string
}
