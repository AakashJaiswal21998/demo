// the types used for authentication

// user registration form data
export interface RegisterFormData {
  email: string;
  password: string;
  userType: number;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  province?: string;
  countryOption: string;
  country?: string;
  zip: string;
  phone: string;
  fax?: string;
  website?: string;
  federalId?: string;
  businessType: string;
  otherInformation?: string;
  shippingSameAsAbove: boolean;
  shippingAddress?: string;
  shippingType?: string;
}

// login form data
export interface LoginData {
  email: string;
  password: string;
}
