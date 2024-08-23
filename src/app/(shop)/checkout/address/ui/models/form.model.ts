export type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string; // this is a countryId like: "US"
  phone: string;
  rememberAddress: boolean;
};
