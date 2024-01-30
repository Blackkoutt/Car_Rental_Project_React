import React, { ChangeEvent } from "react";
import DefaultSelect from "./DefaultSelect";
import Input from "./Input";
import CarData from "../models/car-data";
import '../css/FilterList.css';


// Interfejs stanu definiujący typy wartości stanu komponentu
interface FilterListState {
    select_criteria: string;
    search: string;
}

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface FilterListProps {
    setFilteredList: (filtredCars?:CarData[]) => void
    cars:CarData[]
}

// Komponent renderujący formularz filtracji i filtujący listę samochodów
class FilterList extends React.Component<FilterListProps, FilterListState>{
    constructor(props:FilterListProps){
        super(props);
        this.state = {
            select_criteria: "manufacturer",
            search: ""
        };
    }

    // Metoda wywoływana w momecie zmiany wartości pól formularza
    onChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>):void =>{
        this.setState(
            {...this.state, [e.target.id]: e.target.value},
            () => {
                this.filterList();
            }
        );
    }

    // Metoda filtrująca listę samochodów
    filterList = ():void =>{
        const {select_criteria, search} = this.state;
        if(search.length >= 3){
            const filteredCars:CarData[] = this.props.cars.filter(car =>{
                switch(select_criteria){
                  case 'manufacturer':{
                    if(car.Manufacturer?.Name.toLowerCase().includes(search.toLowerCase())){
                      return car;
                    }
                    break;
                  }
                  case 'model':{
                    if(car.Model.toLowerCase().includes(search.toLowerCase())){
                      return car;
                    }
                    break;
                  }
                  case 'date_of_manufacture':{
                    if(car.DateOfManufacture.includes(search)){
                      return car;
                    }
                    break;
                  }
                  case 'available_count':{
                    if(car.AvailableCount.toString().includes(search)){
                      return car;
                    }
                    break;
                  }
                  case 'rental_cost':{
                    if(car.RentalCost.toString().includes(search)){
                      return car;
                    }
                    break;
                  }
                  case 'seats_count':{
                    if(car.Type?.SeatsCount.toString().includes(search)){
                      return car;
                    }
                    break;
                  }
                  case 'gearbox':{
                    const gearboxText:string = car.GearBox ? "automatyczna" : "manualna";
                    if(gearboxText.includes(search.toLowerCase())){
                      return car;
                    }
                    break;
                  }
                  case 'type':{
                    if(car.Type?.Name.toLowerCase().includes(search.toLowerCase())){
                      return car;
                    }
                    break;
                  }
                }
                return null;
            });
            this.props.setFilteredList(filteredCars);
        }
        else{
            this.props.setFilteredList();
        }
    }   
    
    // Metoda renderująca komponent 
    render(){
        const values ={
            manufacturer:"Producent",
            model:"Model",
            date_of_manufacture:"Data produkcji",
            available_count:"Liczba dostępnych",
            rental_cost:"Koszt wynajmu",
            seats_count:"Liczba miejsc",
            gearbox:"Skrzynia biegów",
            type:"Typ"
        }
        return(
            <div className="filter_list">
                <DefaultSelect label={"Kategoria"} id={"select_criteria"} values={values} onChange={this.onChange}/>
                <Input  label="Wyszukaj" type="text" id="search" placeholder="Wyszukaj samochód" onChange={this.onChange}/>
            </div>
        )
    }
}

export default FilterList;