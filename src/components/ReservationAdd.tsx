import React, { ChangeEvent, useEffect, useState } from 'react';
import ReservationData from '../models/reservation';
import ReservationService from '../services/ReservationService';
import CarData from '../models/car-data';
import '../css/ReservationAdd.css';
import CarService from '../services/CarService';
import UserData from '../models/user';
import UserService from '../services/UserService';
import Select from './Select'
import Input from './Input'
import { DateValidator, EmailValidator, EndDateValidator, NameValidator, PhoneNumberValidator, ReservationDateValidator, StartDateValidator, SurnameValidator } from '../validators/validators';
import FormError from './FormError';
import { parseDate, convertDateForSaveToDb, mapGearbox } from '../helpers/helpers'
import { Navigate, useParams } from 'react-router-dom';

interface ReservationAddProps {
}

const ReservationAdd: React.FC<ReservationAddProps> = () => {
    const {carId} = useParams();
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [car, setCar] = useState<CarData | undefined>(undefined);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState(0);
    const [start_of_reservation, setStartOfReservation] = useState('');
    const [end_of_reservation, setEndOfReservation] = useState('');
    const [rental_cost, setRentalCost] = useState(0);
    const [total_cost, setTotalCost] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [submited, setSubmited] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {  
                console.log('Samochód istnieje:', carId);             
                const carData = await CarService.getOneCar(ParseToInt(carId));
                setCar(carData);
                setRentalCost(carData.rental_cost);
            } catch (error) {
                console.error('Błąd przy wyszukiwaniu samochodu:', error);
            }
        };

        fetchData();
    }, [carId]);
    const ParseToInt= (value:string|undefined)=>{
        if(value!==undefined)
        {
            return parseInt(value);
        }else{
            return 1;
        }
    }
    useEffect(() => {
        ValidateForm();
        calculateTotalCost();
    }, [name, surname, email, phone_number, start_of_reservation, end_of_reservation]);
    const onChange = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> {
        const { id, value } = e.target;
        console.log('wartosc:', value);
        switch (id) {
            case 'name':
                await setName(value);
                break;
            case 'surname':
                await setSurname(value);
                break;
            case 'email':
                await setEmail(value);
                break;
            case 'phone_number':
                await setPhoneNumber(Number(value));
                break;
            case 'start_of_reservation':
                await setStartOfReservation(value);
                console.log('wartosc:', start_of_reservation);
                break;
            case 'end_of_reservation':
                await setEndOfReservation(value);
                console.log('wartosc:', end_of_reservation);
                break;
            default:
                break;
        }

        // ValidateForm();
         //await calculateTotalCost();
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        await ValidateForm();
        await checkUsers();

        if (errors.length !== 0) {
            e.preventDefault();
        }else{
            const reservationAdd = new ReservationData({
                carId: car?.Id,
                userId: user?.Id,
                start_of_reservation: convertDateForSaveToDb(start_of_reservation),
                end_of_reservation: convertDateForSaveToDb(end_of_reservation),
                total_cost: Number(total_cost)
            });

            await postReservation(reservationAdd);
            await setSubmited(true);
        }
    }

    const checkUsers = async () => {
        try {
            const userFromService = await UserService.getUser(email);

            if (userFromService) {
                setUser(userFromService);
                console.log('Użytkownik istnieje:', userFromService);
            } else {
                const newUser = new UserData({
                    name: name,
                    surname: surname,
                    email: email,
                    phone_number: phone_number
                });

                await postUser(newUser);
                await setUser(newUser);
                console.log('Użytkownik o podanym adresie email nie istnieje.');
            }
        } catch (error) {
            console.error('Błąd przy sprawdzaniu użytkownika:', error);
        }
    }

    const ValidateForm =async () => {
        const errorArray: string[] = [];
        errorArray.push(...NameValidator(name));
        errorArray.push(...SurnameValidator(surname));
        errorArray.push(...EmailValidator(email));
        errorArray.push(...PhoneNumberValidator(phone_number.toString()));
        errorArray.push(...StartDateValidator(start_of_reservation));
        errorArray.push(...EndDateValidator(end_of_reservation));
        errorArray.push(...ReservationDateValidator(start_of_reservation,end_of_reservation));
        await setErrors(errorArray);
    }

    const calculateTotalCost = async () => {
        // Logika obliczania kosztu
        if (start_of_reservation==='' || end_of_reservation==='') {
            console.error('Data rozpoczęcia lub zakończenia rezerwacji nie została określona.');
            return;
        }
        const start = new Date(start_of_reservation).getTime();
        const end = new Date(end_of_reservation).getTime();
        if (start >= end) {
            console.error('Data zakończenia rezerwacji musi być późniejsza niż data rozpoczęcia.');
            return;
        } 
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const totalCostValue = days * rental_cost;
        await setTotalCost(totalCostValue);
        

    };

    const postReservation = async (reservation: ReservationData) => {
        try {
            const result = await ReservationService.postReservation(reservation);
            console.log('POST reservation:', result);
        } catch (error) {
            console.error('Error PUT data:', error);
        }
    }

    const postUser = async (user: UserData) => {
        try {
            const result = await UserService.postUser(user);
            console.log('POST user', result);
        } catch (error) {
            console.error('Error PUT data:', error);
        }
    }

    return (
        <>
             {submited && <Navigate to="/" />}
            <div className="edit-outer-div">
                <form onSubmit={onSubmit}>
                    <h3>Wypożyczenie </h3>
                    <div className="edit-inner-div">
                        <div className="half">
                            <Input label="Imie:" id="name" type="text" value={name} onChange={(e)=>onChange(e)} />
                            <Input label="Nazwisko:" id="surname" type="text" value={surname} onChange={(e)=>onChange(e)} />
                            <Input label="Email:" id="email" type="text" value={email} onChange={(e)=>onChange(e)} />
                        </div>
                        <div className="half">
                            <Input label="Numer telefonu:" id="phone_number" type="number" value={phone_number.toString()} onChange={(e)=>onChange(e)} />
                            <Input label="Data rozpoczecia:" id="start_of_reservation" type="date" value={start_of_reservation} onChange={(e)=>onChange(e)} />
                            <Input label="Data zakonczenia:" id="end_of_reservation" type="date" value={end_of_reservation} onChange={(e)=>onChange(e)} />
                        </div>
                    </div>
                    <div>
                        <p className="filter">Koszt całkowity: {total_cost.toFixed(2)} zł</p>
                    </div>
                    {errors?.map((value: string, index: number) => (
                        <FormError key={index} message={value} />
                    ))}
                    <div>
                        <input type="submit" value="Zatwierdź" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default ReservationAdd;
