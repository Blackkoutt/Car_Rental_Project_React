import React, { Component } from 'react';
import CarData from '../models/car-data';

interface CarProps {
    car: CarData;
  }
interface CarState {
    car: CarData;
  }

class CarListElement extends Component<CarProps, CarState>{
    constructor(props:{car:CarData}){
        super(props);
        this.state = {
            car: props.car,
        };
    }
    // componentDidMount() {
    //     this.setState({
    //       car: this.props.car,
    //     });
    //   }
    render(){
        const { car } = this.state;
        return(
            <tr>
                <td>{car.Manufacturer?.Name}</td>
                <td>{car.Model}</td>
                <td>{car.DateOfManufacture}</td>
                <td>{car.AvailableCount}</td>
                <td>{car.RentalCost} zł</td>
                <td>{car.Type?.SeatsCount}</td>
                <td>{car.GearBox ? 'Automatyczna' : 'Manualna' }</td>
                <td>{car.Type?.Name}</td>
            </tr>
        );
    }
}
export default CarListElement;