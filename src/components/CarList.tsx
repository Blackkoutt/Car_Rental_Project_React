import CarData from '../models/car-data';
import ManufacturerData from '../models/manufacturer';
import TypeData from '../models/type';
import CarService from '../services/CarService';
import React from 'react';
import CarListElement from './CarListElement'
import CarEdit from './CarEdit'
import '../css/CarList.css';
import CarDetails from './CarDetails';


interface CarsState {
    cars: CarData[],
    detailsCar: CarData|undefined
}

class CarList extends React.Component<{}, CarsState>{
    constructor(){
        super({});
        this.state = {
            cars: [],
            detailsCar: undefined
        };
    }
    componentDidMount(){
        this.fetchCars();
    }
    changeDetailsVisibility = (car?:CarData):void => {
        console.log("here");
        this.setState({
            detailsCar: car
        });
    }
    fetchCars = async () => {
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
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    FormatDate(date:string):string{
        const originalDate:Date = new Date(date.split('T')[0]);
    
        const options:object = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate:string = new Intl.DateTimeFormat('pl-PL', options).format(originalDate);
        return formattedDate;
    }
    render(){
        const {cars} = this.state
        return(
            <>
                {(this.state.detailsCar!==undefined) ? (
                    <CarDetails car={this.state.detailsCar} changeDetailsVisibility={this.changeDetailsVisibility}></CarDetails>
                ) :   
                <div className="table-div">
                    <div className="filter">
                        <div className="search_div">
                        <label htmlFor="select_criteria">Szukaj według</label>
                        <select id="select_criteria">
                            <option value="manufacturer">Producent</option>
                            <option value="model">Model</option>
                            <option value="date_of_manufacture">Data produkcji</option>
                            <option value="available_count">Liczba dostępnych</option>
                            <option value="rental_cost">Koszt wynajęcia</option>
                            <option value="seats_count">Liczba miejsc</option>
                            <option value="gearbox">Skrzynia biegów</option>
                            <option value="type">Typ</option>
                        </select>
                        </div>
                        <div className="search_div">
                        <label htmlFor="search">Wyszukaj</label>
                        <input id="search" type="text"/>
                        </div>
                    </div>
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
                                <CarListElement key={car.Id} car={car} changeDetailsVisibility={this.changeDetailsVisibility}/>
                            ))}
                        </tbody>    
                    </table>
                    <dialog className="delete_dialog">
                    <form method="dialog">
                        <div>
                            <p></p>
                            <button className="delete_button_dialog" type="submit">Usuń</button>
                            <button className="cancel_button_dialog" type="reset">Anuluj</button>
                        </div>
                    </form>
                    </dialog>
                    <dialog className="success_dialog">
                    <div className="success_dialog_div">
                        <div></div>
                        <p>Pomyślnie usunięto rezerwację</p>
                    </div>     
                    </dialog>
                </div>
                }
            </>
        );
    }
}
export default CarList;