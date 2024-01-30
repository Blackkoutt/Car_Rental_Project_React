import { parseDate } from "../helpers/helpers";

// DEFAULT VALIDATORS
const IsValueStartsWithUppercase = (value: string): boolean => {
  const startsWithUppercaseRegEx: RegExp = /^[A-ZĄĆĘŁŃÓŚŹŻ]/;
  return startsWithUppercaseRegEx.test(value);
};
const IsAlphanumericValue = (value: string): boolean => {
  const alphanumericRegEx: RegExp = /^[a-zA-Z0-9\s]+$/;
  return alphanumericRegEx.test(value);
};
const IsCorrectDateValidator = (value: string): boolean => {
  const inputDate = new Date(parseDate(value));
  const minDate = new Date("2010-01-01");
  const maxDate = new Date();

      inputDate.setHours(0, 0, 0, 0);
      minDate.setHours(0, 0, 0, 0);
      maxDate.setHours(0, 0, 0, 0);
      
      console.log(inputDate);
      console.log(maxDate);
      return (inputDate >= minDate && inputDate <= maxDate);
}
const IsStartDateCorrect = (value: string): boolean =>{
    const inputDate = new Date(parseDate(value));
    const nowDate = new Date();
    return (inputDate>=nowDate);
}
const IsDatesCorrect = (value1: string, value2: string): boolean =>{
    const startDate = new Date(parseDate(value1));
    const endDate = new Date(parseDate(value2));

    return(startDate<endDate);
}
const IsPhoneNumber = (value: string):boolean =>{
    
    const isValid = /^\d{9}$/.test(String(value));
    return isValid;

}
const RequiredValidator = (value: string): boolean => { 
    return (value!==""&&value!==undefined);
}
const LengthValidator = (value: string, length:number): boolean => { 
    return (value.length<=length);
}
const MinValidator = (value: string, minValue:number): boolean => { 
    return (Number(value)>=minValue);
}
const MaxValidator = (value: string, maxValue:number): boolean => { 
    return (Number(value)<=maxValue);
}
const CarTypeValidator = (value:string):boolean => {
      const types:string[] = ["SUV", "Coupe", "Kabriolet", "Kompakt", "Mini Van", "Van", "Sedan", "Hatchback", "Kombi"]; 
      return types.includes(value);
}
const IsCorrectSeatsCount = (typeValue:string, seatsValue:string): boolean => {
      const seat = +seatsValue;
      const allowedSeats: number[] = GetAllowedSeats(typeValue);
      return allowedSeats.includes(seat);  
}
const GetAllowedSeats = (type: string): number[] => {
  switch (type) {
    case "SUV":
      return [4, 5, 6, 7];
    case "Coupe":
      return [2, 4];
    case "Kabriolet":
      return [2, 4, 5];
    case "Kompakt":
      return [2, 4, 5];
    case "Mini Van":
      return [3, 4, 5];
    case "Van":
      return [6, 7];
    case "Sedan":
      return [4, 5];
    case "Hatchback":
      return [4, 5];
    case "Kombi":
      return [5];
    default:
      return [];
  }
};

// CONCRETE VALIDATORS
export const SeatsValidator = (seats:string, type:string): string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(seats)){
        errors.push("Liczba miejsc samochodu jest wymagana!");
    }
    if(!MinValidator(seats, 2)){
        errors.push("Liczba miejsc nie może być mniejsza niż 2!");
    }
    if(!MaxValidator(seats, 7)){
        errors.push("Liczba miejsc nie może być większa niż 7!");
    }
    if(!IsCorrectSeatsCount(type, seats)){
        errors.push(`Typ samochodu ${type} nie może zawierać ${seats} miejsc! ${type} może zawierać ${GetAllowedSeats(type)} miejsc`);
    }
    return errors;
}
export const TypeValidator = (type:string): string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(type)){
        errors.push("Typ samochodu jest wymagany!");
    }
    if(!IsValueStartsWithUppercase(type)){
        errors.push("Typ samochodu musi zaczynać się od wielkiej litery.");
    }
    if(!CarTypeValidator(type)){
        errors.push("Wypożyczalnia nie oferuje samochodów o podanym typie.");
    }
    return errors;
}
export const DateValidator = (date:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(date)){
        errors.push("Data produkcji jest wymagana!");
    }
    if(!IsCorrectDateValidator(date)){
        errors.push("Data nie może być wcześniejsza niż 01.01.2010 ani późniejsza niż obecna data.");
    }
    return errors; 
}
export const ModelValidator = (model:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(model)){
        errors.push("Nazwa modelu jest wymagana!");
    }
    if(!LengthValidator(model, 50)){
        errors.push("Nazwa modelu może mieć co najwyżej 50 znaków.");
    }
    if(!IsAlphanumericValue(model)){
        errors.push("Nazwa modelu może składać się tylko z znaków i cyfr.");
    }
    return errors; 
}
export const AvailableCountValidator = (count:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(count)){
        errors.push("Liczba dostępnych samochodów jest wymagana!");
    }
    if(!MinValidator(count, 0)){
        errors.push("Liczba dostępnych samochodów nie może być mniejsza od 0!");
    }
    return errors; 
}
export const RentalCostValidator = (cost:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(cost)){
        errors.push("Koszt wynajęcia samochodu jest wymagany!");
    }
    if(!MinValidator(cost, 0)){
        errors.push("Koszt wynajęcia samochodu nie może być mniejszy od 0!");
    }
    if(!MaxValidator(cost, 2000)){
        errors.push("Koszt wynajęcia samochodu nie może być większy niż 2000!");
    }
    return errors; 
}
export const NameValidator = (name:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(name)){
        errors.push("Imie jest wymagane!");
    }
    if(!LengthValidator(name, 50)){
        errors.push("Imie może mieć co najwyżej 50 znaków.");
    }
    if(!IsValueStartsWithUppercase(name)){
        errors.push("Imie musi zaczynać się z dużej litery");
    }

    return errors; 
}
export const SurnameValidator = (surname:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(surname)){
        errors.push("Nazwisko jest wymagane!");
    }
    if(!LengthValidator(surname, 50)){
        errors.push("Nazwisko może mieć co najwyżej 50 znaków.");
    }   
     if(!IsValueStartsWithUppercase(surname)){
        errors.push("Nazwisko musi zaczynać się z dużej litery");
    }
    return errors; 
}
export const EmailValidator = (email:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(email)){
        errors.push("Email jest wymagany!");
    }
    if(!LengthValidator(email, 50)){
        errors.push("Email może mieć co najwyżej 50 znaków.");
    }
    return errors; 
}
export const PhoneNumberValidator = (phone_number:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(phone_number)){
        errors.push("Numer telefonu jest wymagany!");
    }
    if(!IsPhoneNumber(phone_number)){
        errors.push("Numer musi miec 9 cyfr");
    }
    return errors; 
}
export const StartDateValidator = (start_of_reservation:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(start_of_reservation)){
        errors.push("Data rozpoczęcia jest wymagana!");
    }
    if(!IsStartDateCorrect(start_of_reservation)){
        errors.push("Data rozpoczęcia nie może być wcześniejsza niż dzisiejsza.");
    }
    return errors; 
}
export const EndDateValidator = (end_of_reservation:string) : string[] =>{
    let errors:string[]=[];
    if(!RequiredValidator(end_of_reservation)){
        errors.push("Data zakończenia jest wymagana!");
    }
    return errors; 
}
export const ReservationDateValidator = (start_of_reservation:string, end_of_reservation:string) : string[] =>{
    let errors:string[]=[];
    if(!IsDatesCorrect(start_of_reservation, end_of_reservation)){
        errors.push("Data zakończenia nie moze być wczescniejsza niz data rozpoczęcia!");
    }
    return errors; 
}



