import React, { ChangeEvent } from 'react';
import '../css/CarAddEdit.css';
import ManufacturerData from '../models/manufacturer';
import TypeData from '../models/type';
import ManufacturerService from '../services/ManufacturerService';
import CarService from '../services/CarService';
import TypeService from '../services/TypeService';
import Select from './Select'
import Input from './Input'
import CarData from '../models/car-data';
import { RentalCostValidator, DateValidator, ModelValidator, AvailableCountValidator,
        SeatsValidator, TypeValidator} from '../validators/validators';
import FormError from './FormError';
import { parseDate, convertDateForSaveToDb, mapGearbox} from '../helpers/helpers'

// Interfejs stanu definiujący typy wartości stanu komponentu
interface CarEditState {
    manufacturers: ManufacturerData[],
    types: TypeData[],
    manufacturer?: string,
    model: string,
    date_of_manufacture: string,
    available_count:number,
    rental_cost:number,
    seats_count?: number,
    gearbox:string,
    type?:string,
    errors: string[]
}

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface CarEditProps {
    car: CarData;
}

// Komponent wyświetlający formularz edycji samochodu
class CarEdit extends React.Component<CarEditProps, CarEditState>{
    constructor(props:CarEditProps){
        super(props);
        this.state = {
            manufacturers: [],
            types: [],
            manufacturer: props.car.Manufacturer?.Name,
            model: props.car.Model,
            date_of_manufacture: props.car.DateOfManufacture,
            available_count: props.car.AvailableCount,
            rental_cost: props.car.RentalCost,
            seats_count: Number(props.car.Type?.SeatsCount),
            gearbox: props.car.GearBox ? "Automatyczna" : "Manualna",
            type: props.car.Type?.Name,
            errors: []
        };
    }

    // Pobranie danych z serwera
    componentDidMount(){
        this.fetchManufacturers();
        this.fetchTypes();
    }

    // Metoda pobierająca producentów z serwera
    fetchManufacturers = async () => {
        try {
          const result = await ManufacturerService.getManufacturers();
          this.setState({
            manufacturers: result.map((man:any)=>{
                let manufacturer:ManufacturerData = new ManufacturerData({
                    name: man.name
                });
                manufacturer.Id = man.id;
                return manufacturer;
            }),
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    // Metoda pobierająca typy samochodów z serwera
    fetchTypes = async () => {
        try {
          const result = await TypeService.getTypes();
          this.setState({
            types: result.map((type:any)=>{
                let newType = new TypeData({
                    name: type.name,
                    seats_count: type.seats_count
                  })
                newType.Id = type.id;;
                return newType;
            }),
          });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Metoda modyfikująca dane w bazie danych
    putCar = async (car:CarData) => {
        try {
          const result = await CarService.updateCar(car);
          console.log("PUT car:", result);
        } catch (error) {
            console.error('Error PUT data:', error);
        }
    }

    // Metoda modyfikująca state z każdą zmianą formularza
    onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>):void => {
        this.setState(
            {...this.state, [e.target.id]: e.target.value},
            () => {
                this.ValidateForm();
            }
        );
    }

    // Metoda wywoływana w momencie submitu formularza
    onSubmit= async (e: React.FormEvent<HTMLFormElement>)=>{
        await this.ValidateForm();
        if (this.state.errors.length) { 
            e.preventDefault();
        } else {
            const{manufacturers, types, manufacturer, model,  date_of_manufacture,
                available_count, rental_cost, seats_count, gearbox,  type} = this.state;
            let man:ManufacturerData|undefined = manufacturers.find(m=>(m.Name === manufacturer));
            let car_type:TypeData|undefined = types.find(t=>(t.Name === type && t.SeatsCount === Number(seats_count)));           
            
            let carEdit = new CarData({
                manufacturerId: man?.Id,
                typeId: car_type?.Id,
                model: model,
                date_of_manufacture: convertDateForSaveToDb(date_of_manufacture),
                available_count: Number(available_count),
                rental_cost: Number(rental_cost),
                gearbox: mapGearbox(gearbox)
            });
            carEdit.Id = this.props.car.Id;
            carEdit.Manufacturer = undefined;
            carEdit.Type = undefined;
            this.putCar(carEdit);
        }
    }

    // Metoda walidująca formularz
    ValidateForm= async ()=>{
        const{manufacturer, model,  date_of_manufacture,
             available_count, rental_cost, seats_count, gearbox,  type} = this.state;
        
        let error_array:string[] = [];
        error_array.push(...AvailableCountValidator(available_count.toString()));
        error_array.push(...ModelValidator(model));
        error_array.push(...DateValidator(date_of_manufacture));
        error_array.push(...RentalCostValidator(rental_cost.toString()));
        if (seats_count !== undefined && type !== undefined) {
            error_array.push(...SeatsValidator(seats_count.toString(), type));
            error_array.push(...TypeValidator(type));
        }

        await this.setState({
            errors: [...error_array]
        });      
    }

    // Metoda renderująca komponent
    render(){
        const {manufacturers,types} = this.state

        const type_names:string[] = types
        .map(type => type.Name)
        .filter((value, index, self) => self.indexOf(value) === index);

        const seats_count: number[] = types
        .map(type => type.SeatsCount)
        .filter((value, index, self) => self.indexOf(value) === index).sort((a:number,b:number)=>a-b);

        return(
            <tr>
                <td colSpan={9}>
                    <div className="edit-outer-div"> 
                        <form onSubmit={this.onSubmit}>
                            <h3>Edycja samochodu:</h3>
                            <div className="edit-inner-div">
                                <div className="half"> 
                                    <Select label="Producent:" id="manufacturer" mans={manufacturers} selected_man={this.state.manufacturer} onChange={this.onChange}></Select>
                                    <Input label="Model:" id="model" type="text" value={this.props.car.Model} onChange={this.onChange}></Input>
                                    <Input label="Data produkcji:" id="date_of_manufacture" type="date" min="2010-01-01" value={parseDate(this.props.car.DateOfManufacture)} onChange={this.onChange}></Input>
                                    <Input label="Liczba dostępnych:" id="available_count" type="number" min={0} value={this.props.car.AvailableCount} onChange={this.onChange}></Input>
                                </div>
                                <div className="half"> 
                                    <Input label="Koszt wynajmu:" id="rental_cost" type="number" min={0} max={2000} value={this.props.car.RentalCost} onChange={this.onChange}></Input>
                                    <Select label="Liczba miejsc:" id="seats_count" seats_count={seats_count} selected_seats={this.state.seats_count} onChange={this.onChange}></Select>
                                    <Select label="Skrzynia biegów:" id="gearbox" gearbox={["Automatyczna","Manualna"]} selected_gearbox={this.state.gearbox} onChange={this.onChange}></Select>
                                    <Select label="Typ:" id="type" type_names={type_names} selected_type={this.state.type} onChange={this.onChange}></Select>
                                </div>
                            </div>
                            {this.state.errors?.map((value: string, index: number) => (   
                                <FormError key={index} message={value} />
                            ))}
                            <div>
                                <input type="submit" value="Zatwierdź"/>
                            </div>
                        </form>
                    </div>
                </td>
            </tr>
        )
    }
}

export default CarEdit;