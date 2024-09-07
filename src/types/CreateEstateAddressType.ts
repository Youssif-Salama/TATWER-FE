export interface CreateEstateAddressType {
  City: string;
  Town: string;
  Neighborhood: string;
  Street: string;
  PostalCode: string;
  BuildingNumber: string;
  AdditionalBuildingNumber?: string;
  lat: string;
  lang: string;
  Link?: string;
}
