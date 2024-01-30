import React, { Component} from 'react';
import CarData from '../models/car-data';
import CarEdit from './CarEdit';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface CarProps {
    car: CarData,
    changeDetailsVisibility: (car?:CarData) => void,
    setDeleteCar: (car:CarData) => void,
}

// Interfejs stanu definiujący typy wartości stanu komponentu
interface CarState {
    car: CarData,
    visible: boolean
}

// Komponent wyświetlający pojedyńczy wiersz listy (dane pojedyńczego samochodu)
class CarListElement extends Component<CarProps, CarState>{
    editButtonRef = React.createRef<HTMLButtonElement>();
    constructor(props:CarProps){
        super(props);    
        this.state = {
            car: props.car,
            visible: false
        };
    }

    // Metoda ustawiająca edytowany samochód
   setEditCar=():void=>{
    this.setState((prevState) => ({
        visible: !prevState.visible,
      }));
    this.changeModifyButton(this.state.visible);
   }

   // Metoda zmieniająca wygląd przycisku "Modyfikuj"
   changeModifyButton=(visible:boolean):void=>{
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

   // Metoda renderująca komponent
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
                    <button ref={this.editButtonRef} onClick={this.setEditCar} className="modify_button">Modyfikuj</button>
                    <button className="details_button" onClick={()=>this.props.changeDetailsVisibility(this.props.car)} >Szczegóły/Wynajem</button>
                    <button onClick={()=>this.props.setDeleteCar(car)} className="delete_button">Usuń</button>
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