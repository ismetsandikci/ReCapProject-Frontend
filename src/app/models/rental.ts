export interface Rental{
    rentalId?:number;
    carId:number;
    customerId:number;
    paymentId?:number;
    rentDate:Date;
    returnDate:Date;
}