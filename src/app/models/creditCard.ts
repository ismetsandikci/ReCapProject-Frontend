export interface CreditCard {
    creditCardId?:number;
    customerId:number;
    cardNameSurname:string;
    cardNumber:string;
    cardExpiryDateMonth:string;
    cardExpiryDateYear:string;
    cardCvv:string;
}