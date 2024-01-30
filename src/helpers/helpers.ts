export const parseDate = (dateString?: string): string => {
  let parts: string[] | undefined = dateString?.split(".");
  if (parts !== undefined && parts.length > 1) {
    return new Date(+parts[2], +parts[1] - 1, +parts[0] + 1).toISOString().split("T")[0];
  } else {
    let date_parts: string = "";
    if (parts !== undefined) {
      date_parts = parts[0];
    }
    return date_parts;
  }
};
export const convertDateForSaveToDb = (date: string): string => {
  const newDate: Date = new Date(`${parseDate(date)}T00:00:00.000Z`);
  return newDate.toISOString();
};
export const mapGearbox = (gearbox: string): boolean => {
  if (gearbox === "Automatyczna") {
    return true;
  } else {
    return false;
  }
};
export const scrollToElement = (elementRef: React.RefObject<HTMLElement>): void => {
  if (elementRef.current) {
    elementRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};
export const openCloseAccordion = (elementRef: React.RefObject<HTMLElement>): void => {
  elementRef.current?.classList.toggle("accordion-content_active");
  const handleEscapeKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      elementRef.current?.classList.remove("accordion-content_active");
    }
  };
  document.addEventListener("keydown", handleEscapeKeyPress);
};
export const closeDialogAndChangeTitle = (elementRef: React.RefObject<HTMLDialogElement>): void => {
  elementRef.current?.close();
  document.title = "Strona główna - CarRental";
};
