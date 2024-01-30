import CarData from '../models/car-data';
import Notification from './Notification';
import Dialog from './Dialog';
import React from 'react';
import ReservationDetails from './ReservationDetails';
import ReservationData from '../models/reservation';
import UserData from '../models/user';
import ReservationService from '../services/ReservationService';
import ReservationsElement from './ReservationsElement';
import '../css/Reservation.css';

interface ReservationState {
    reservations: ReservationData[],
    detailsReservation?: ReservationData,
    deleteReservation?:ReservationData,
    defaultReservation: ReservationData[],
    showNotification: boolean
}
interface ReservationProps {}

class Reservations extends React.Component<ReservationProps, ReservationState>{
    notificationRef = React.createRef<HTMLDialogElement>();
    dialogRef = React.createRef<HTMLDialogElement>();
    constructor(props:ReservationProps){
        super(props);
        this.state = {
            reservations: [],
            detailsReservation: undefined,
            deleteReservation: undefined,
            defaultReservation: [],
            showNotification: false
        };
    }
    componentDidMount(){
        this.fetchReservations();
    }
    changeDetailsVisibility = (reservation?:ReservationData):void => {
        this.setState({
            detailsReservation: reservation
        });
    }
    fetchReservations = async () => {
        try {
          const result = await ReservationService.getReservations();
          this.setState({
            reservations: result.map((new_reservation:any)=>{
                let reservation:ReservationData = new ReservationData({
                    carId: new_reservation.carId,
                    userId: new_reservation.userId,
                    start_of_reservation:this.FormatDate( new_reservation.start_of_reservation),
                    end_of_reservation: this.FormatDate(new_reservation.end_of_reservation),
                    total_cost: new_reservation.total_cost
                    
                });
                reservation.Id = new_reservation.id;
                reservation.Car = new CarData({
                    manufacturerId: new_reservation.car.manufacturerId,
                    typeId: new_reservation.car.typeId,
                    model: new_reservation.car.model,
                    date_of_manufacture: this.FormatDate(new_reservation.car.date_of_manufacture),
                    available_count: new_reservation.car.available_count,
                    rental_cost: new_reservation.car.rental_cost,
                    gearbox: new_reservation.car.gearbox
                });
                reservation.Car.Id=new_reservation.car.id;
                reservation.User = new UserData({
                    name:new_reservation.user.name,
                    surname:new_reservation.user.surname,
                    email:new_reservation.user.email,
                    ephone_number:new_reservation.user.phone_number
                })
                reservation.User.Id=new_reservation.user.id
                console.log('POST reservation:', reservation.Total_cost);
                return reservation;
            }),
          }, ()=>{
            this.setState({
                defaultReservation: this.state.reservations
            })
        });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    FormatDate = (date:string):string => {
        const originalDate:Date = new Date(date.split('T')[0]);
    
        const options:object = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate:string = new Intl.DateTimeFormat('pl-PL', options).format(originalDate);
        return formattedDate;
    }
    setDeleteReservation = (reservation:ReservationData) => {
        this.setState({
            deleteReservation: reservation
        }, ()=>{
            this.dialogRef.current?.showModal();
        })
    }
    getDialogRef=( ref: React.RefObject<HTMLDialogElement>)=>{
        this.dialogRef = ref;
        if(this.state.deleteReservation!==undefined){
            this.dialogRef.current?.showModal();
        }
    }
    deleteReservation = async () => {
        try {
            const result = await ReservationService.deleteReservation(this.state.deleteReservation?.Id);
            this.setState({
                reservations: this.state.reservations,
                showNotification:true,
                deleteReservation: undefined
            });
            console.log("DELETE reservation:", result);
        } catch (error) {
            console.error('Error DELETE data:', error);
        }
    }
    getNotificationRef=( ref: React.RefObject<HTMLDialogElement>)=>{
        this.notificationRef = ref;
        if(this.state.showNotification){
             this.showNotification();
         }
     }
     showNotification=()=>{
        this.notificationRef.current?.showModal();
        setTimeout(()=>{
          this.notificationRef.current?.close();
        }, 1500);
    }

    render() {
        const {reservations, deleteReservation} = this.state
        const textDialog:string = `Czy napewno chcesz usunąć rezerwacje ?`
        const textNotification:string = `Pomyślnie usunięto rezerwacje  `
        
        return(
            <>
                {(this.state.detailsReservation!==undefined) ? (
                    <ReservationDetails reservation={this.state.detailsReservation} changeDetailsVisibility={this.changeDetailsVisibility}></ReservationDetails>
                ) :   
                <div className="table-div"> 
                    <div className="table_inner_div">
                        <div className="table-responsive">
                            <table className="table table-dark table-hovers">
                                <thead>
                                <tr>

                                <th scope="col">Imie</th>
                                <th scope="col">Nazwisko</th>
                                <th scope="col">Id samochodu</th>
                                <th scope="col">Początek wypożyczenia</th>
                                <th scope="col">Koniec wypożyczenia</th>
                                <th scope="col">Koszt</th>
                                <th scope="col">Akcja</th>
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {reservations.map((reservation: ReservationData) => (
                                        <ReservationsElement key={reservation.Id} reservation={reservation} changeDetailsVisibility={this.changeDetailsVisibility} setDeleteReservation={this.setDeleteReservation}/>
                                    ))}
                                </tbody>    
                            </table>
                            <Dialog text={textDialog} getRef={this.getDialogRef} deleteCar={this.deleteReservation}/>
                            <Notification text={textNotification} getRef={this.getNotificationRef}/>
                        </div>
                    </div>
                </div>
                }
            </>
        );
    }
}

export default Reservations;
            
        

    

