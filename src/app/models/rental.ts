export interface Rental{
    rentalId?:number;
    carId:number;
    customerId:number;
    creditCardId?:number;
    rentDate:Date;
    returnDate:Date;
    amountPaye:number;
}