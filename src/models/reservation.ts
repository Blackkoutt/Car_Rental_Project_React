import CarData from "./car-data";
import UserData from "./user";

class ReservationData{
    private id?:number;
    private car?:CarData;
    private carId:number;
    private user?:UserData;
    private userId:number;
    private start_of_reservation:string;
    private end_of_reservation:string;
    private total_cost:number;

    constructor(data:any){
        this.carId = data.carId;
        this.userId = data.userId;
        this.start_of_reservation = data.start_of_reservation;
        this.end_of_reservation = data.end_of_reservation;
        this.total_cost = data.total_cost;
    }

    get Id():number|undefined{
        return this.id;
    }
    set Id(value:number|undefined){
        this.id=value;
    }
    get CarId():number{
        return this.carId;
    }
    set CarId(value:number){
        this.carId=value;
    }
    get Car():CarData|undefined{
        return this.car;
    }
    set Car(value:CarData|undefined){
        this.car=value;
    }
    get UserId():number{
        return this.userId;
    }
    set UserId(value:number){
        this.userId=value;
    }
    get User():UserData|undefined{
        return this.user;
    }
    set User(value:UserData|undefined){
        this.user=value;
    }
    get Start_of_reservation():string{
        return this.start_of_reservation;
    }
    set Start_of_reservation(value:string){
        this.start_of_reservation=value;
    }
    get End_of_reservation():string{
        return this.end_of_reservation;
    }
    set End_of_reservation(value:string){
        this.end_of_reservation=value;
    }
    get Total_cost():number{
        return this.total_cost;
    }
    set Total_cost(value:number){
        this.total_cost=value;
    }

}
export default ReservationData;