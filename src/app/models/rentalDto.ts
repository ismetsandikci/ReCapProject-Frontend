export interface RentalDto{
    rentalId:number;
    brandName:string;
    modelName:string;
    modelYear:number;
    dailyPrice:number;
    userName:string;
    companyName:string;
    rentDate:Date;
    returnDate:Date;
    amountPaye:number;
    cardNameSurname:string;
    cardNumber:string;
    cardExpiryDateMonth:string;
    cardExpiryDateYear:string;
    cardCvv:string;
}