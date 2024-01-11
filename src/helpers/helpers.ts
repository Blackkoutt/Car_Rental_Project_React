export const parseDate = (dateString?: string): string => {
    let parts:string[]|undefined = dateString?.split('.');
    if(parts!==undefined && parts.length>1){
          return new Date(+parts[2], +parts[1] -1 , +parts[0] +1).toISOString().split("T")[0];
    }
    else{
        let date_parts:string =""
        if(parts != undefined){
            date_parts = parts[0];
        }
        return date_parts;
    }   
}
export const convertDateForSaveToDb = (date:string):string => {
    console.log(date);
    const newDate:Date = new Date(`${parseDate(date)}T00:00:00.000Z`);
    return newDate.toISOString();
}
export const mapGearbox = (gearbox:string) => {
    if(gearbox === "Automatyczna"){
      return true;
    }
    else{
      return false;
    }
}