import React, { Component, useRef } from 'react';
import CarData from '../models/car-data';
import CarEdit from './CarEdit';

interface CarProps {
    car: CarData,
    changeDetailsVisibility: (car?:CarData) => void
}
interface CarState {
    car: CarData,
    visible: boolean
}

class CarListElement extends Component<CarProps, CarState>{
    editButtonRef = React.createRef<HTMLButtonElement>();
    constructor(props:CarProps){
        super(props);
        
        this.state = {
            car: props.car,
            visible: false
        };
    }
    modifyCar = (modified_car:CarData) => {
        this.setState(state => {
            let car:CarData = state.car;
            Object.assign(car, {
                manufacturerId: Number(modified_car.Manufacturer?.Id), // to trzeba potem zmienić
                typeId: modified_car.Type?.Id, // to też
                model: modified_car.Model,
                date_of_manufacture: modified_car.DateOfManufacture, // convet date for save
                available_count: Number(modified_car.AvailableCount),
                rental_cost: Number(modified_car.RentalCost),
                gearbox: modified_car.GearBox // map gearbox
              });
            car.Manufacturer = undefined;
            car.Type = undefined;
            return { car: car };
        })
   }
   setEditCar=()=>{
    this.setState((prevState) => ({
        visible: !prevState.visible,
      }));
    this.changeModifyButton(this.state.visible);
   }
   changeModifyButton=(visible:boolean)=>{
    if (this.editButtonRef.current) {
        if(visible){
            this.editButtonRef.current.textContent = "Modyfikuj";
            this.editButtonRef.current.style.background = "linear-gradient(90deg, rgb(1, 106, 1), transparent) rgb(34, 213, 17)";
        }
        else{
            this.editButtonRef.current.textContent = "Ukryj";
            this.editButtonRef.current.style.background = "linear-gradient(90deg, rgb(1, 32, 117), transparent) rgb(17, 115, 213)";
        }       
    }
   }
    // componentDidMount() {
    //     this.setState({
    //       car: this.props.car,
    //     });
    //   }
    render(){
        const { car } = this.state;
        return(
        <>
            <tr>
                <td>{car.Manufacturer?.Name}</td>
                <td>{car.Model}</td>
                <td>{car.DateOfManufacture}</td>
                <td>{car.AvailableCount}</td>
                <td>{car.RentalCost} zł</td>
                <td>{car.Type?.SeatsCount}</td>
                <td>{car.GearBox ? 'Automatyczna' : 'Manualna' }</td>
                <td>{car.Type?.Name}</td>
                <td className="action_buttons">
                    {/* <button appChangeEditButton [carInput]="car" (outputCarEvent)="fun($event)" (click)="editCar(car)">Modyfikuj</button> */}
                    <button ref={this.editButtonRef} onClick={this.setEditCar} className="modify_button">Modyfikuj</button>
                    {/* <a [routerLink]="['/modify',car.Id]" ><button (click)="editCar(car)">Modyfikuj</button></a>--> */}
                    <button className="details_button" onClick={()=>this.props.changeDetailsVisibility(this.props.car)} >Szczegóły/Wynajem</button>
                    <button className="delete_button">Usuń</button>
                </td> 
            </tr>
            {this.state.visible ? (
                    <CarEdit car={car}></CarEdit>
                ) : null}          
        </>
        );
    }
}
export default CarListElement;