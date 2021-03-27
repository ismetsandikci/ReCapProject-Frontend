export interface Payment{
    paymentId?:number;
    cardNameSurname:string;
    cardNumber:string;
    cardExpiryDate:string;
    cardCvv:string;
    amountPaye:number;
}