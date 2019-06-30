export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    dob: Date;
    addressline: string;
    zipcode: string;
    city: string;
    country: string;
    billingAddress: string;
    billingZipcode: string;
    billingCity: string;
    billingCountry: string;
}