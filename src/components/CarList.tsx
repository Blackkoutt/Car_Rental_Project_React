import CarData from '../models/car-data';
import ManufacturerData from '../models/manufacturer';
import TypeData from '../models/type';
import CarService from '../services/CarService';
import React from 'react';
import CarListElement from './CarListElement'
import '../css/CarList.css';
import CarDetails from './CarDetails';
import FilterList from './FilterList';
import Notification from './Notification';
import Dialog from './Dialog';

// Interfejs stanu definiujący typy dla wartości stanu
interface CarsState {
    cars: CarData[],
    detailsCar?: CarData,
    deleteCar?:CarData,
    defaultCars: CarData[]
    showNotification: boolean
}

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface CarsProps{}

// Komponent wyświetlający listę samochodów
class CarList extends React.Component<CarsProps, CarsState>{
    notificationRef = React.createRef<HTMLDialogElement>();
    dialogRef = React.createRef<HTMLDialogElement>();
    constructor(props:CarsProps){
        super(props);
        this.state = {
            cars: [],
            detailsCar: undefined,
            deleteCar: undefined,
            defaultCars: [],
            showNotification: false
        };
    }

    // Metoda wywoływana przy montowaniu komponentu - pobranie danych samochodów z serwera
    componentDidMount():void{
        document.title="Strona główna - CarRental"
        this.fetchCars();
    }

    // Metoda zmieniająca widzialność komponentu CarDetails
    changeDetailsVisibility = (car?:CarData):void => {
        this.setState({
            detailsCar: car
        });
    }

    // Metoda pobierająca dane z serwera
    fetchCars = async ():Promise<any> => {
        try {
          const result = await CarService.getCars();
          this.setState({
            cars: result.map((new_car:any)=>{
                let car:CarData = new CarData({
                    manufacturerId: new_car.manufacturerId,
                    typeId: new_car.typeId,
                    model: new_car.model,
                    date_of_manufacture: this.FormatDate(new_car.date_of_manufacture),
                    available_count: new_car.available_count,
                    rental_cost: new_car.rental_cost,
                    gearbox: new_car.gearbox,
                });
                car.Id = new_car.id;
                car.Manufacturer = new ManufacturerData({
                    name: new_car.manufacturer.name
                });
                car.Manufacturer.Id=new_car.manufacturer.id;
                car.Type = new TypeData({
                    name: new_car.type.name,
                    seats_count: new_car.type.seats_count
                });
                car.Type.Id=new_car.type.id;
                return car;
            }),
          }, ()=>{
            this.setState({
                defaultCars: this.state.cars
            })
        });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    // Metoda formatująca datę 
    FormatDate = (date:string):string => {
        const originalDate:Date = new Date(date.split('T')[0]);
    
        const options:object = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate:string = new Intl.DateTimeFormat('pl-PL', options).format(originalDate);
        return formattedDate;
    }


    // Metoda ustawiająca przefiltrowaną listę samochodów 
    setFilteredList = (filtredCars?:CarData[]):void => {
        if(filtredCars!==undefined){
            this.setState({
                cars: filtredCars
            });
        }
        else{
            this.setState({
                cars: this.state.defaultCars
            });
        }       
    }

    // Metoda ustawiająca usuwany samochód
    setDeleteCar = (car:CarData):void => {
        document.title="Usuwanie pojazdu - CarRental"
        this.setState({
            deleteCar: car
        }, ()=>{
            this.dialogRef.current?.showModal();
        })
    }

    // Metoda pobierająca referencję do dialogu w komponencie Dialog
    getDialogRef=( ref: React.RefObject<HTMLDialogElement>):void=>{
        this.dialogRef = ref;
        if(this.state.deleteCar!==undefined){
            this.dialogRef.current?.showModal();
        }
    }

    // Metoda usuwająca samochód
    deleteCar = async ():Promise<any> => {
        try {
            const result = await CarService.deleteCar(this.state.deleteCar?.Id);
            this.setState({
                cars: this.state.cars.filter(c => c!==this.state.deleteCar),
                showNotification:true,
                deleteCar: undefined
            });
            console.log("DELETE car:", result);
        } catch (error) {
            console.error('Error DELETE data:', error);
        }
    }

    // Metoda pobierająca referencję do powiadomienia w komponencie Notification
    getNotificationRef=( ref: React.RefObject<HTMLDialogElement>):void=>{
       this.notificationRef = ref;
       if(this.state.showNotification){
            this.showNotification();
        }
    }

    // Metoda wyświetlająca powiadomienie o poprawnym usunięciu samochodu
    showNotification=():void=>{
        this.notificationRef.current?.showModal();
        setTimeout(()=>{
          this.notificationRef.current?.close();
        }, 1500);
    }

    // Metoda renderująca komponent
    render(){
        const {cars, deleteCar} = this.state
        const textDialog:string = `Czy napewno chcesz usunąć samochód ${deleteCar?.Manufacturer?.Name} ${deleteCar?.Model} ?`
        const textNotification:string = `Pomyślnie usunięto samochód ${deleteCar?.Manufacturer?.Name} ${deleteCar?.Model}`
        
        return(
            <article id="car_list">
                {(this.state.detailsCar!==undefined) ? (
                    <CarDetails car={this.state.detailsCar} changeDetailsVisibility={this.changeDetailsVisibility}></CarDetails>
                ) :   
                <div className="table-div">
                    <FilterList cars={this.state.defaultCars} setFilteredList={this.setFilteredList} />
                    <div className="table_inner_div">
                        <div className="table-responsive">
                                <table className="table table-dark table-hovers table-responsive">
                                    <thead>
                                        <tr>
                                        <th scope="col">Producent</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Data produkcji</th>
                                        <th scope="col">Liczba dostępnych</th>
                                        <th scope="col">Koszt wynajęcia</th>
                                        <th scope="col">Liczba miejsc</th>
                                        <th scope="col">Skrzynia biegów</th>
                                        <th scope="col">Typ</th>
                                        <th scope="col">Akcja</th>
                                        </tr>
                                    </thead> 
                                    <tbody className="table-group-divider">
                                        {cars.map((car: CarData) => (
                                            <CarListElement key={car.Id} car={car} changeDetailsVisibility={this.changeDetailsVisibility} setDeleteCar={this.setDeleteCar}/>
                                        ))}
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    <Dialog text={textDialog} getRef={this.getDialogRef} deleteCar={this.deleteCar}/>
                    <Notification text={textNotification} getRef={this.getNotificationRef}/>
                </div>
                }
            </article>
        );
    }
}

export default CarList;