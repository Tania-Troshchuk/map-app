import { ILocationErrors } from "../types/location";

export const getErrorText = (key: keyof ILocationErrors, value: string | number) => {
  if (!value) {
    return key === "lat" || key === "lng"
      ? "Будь ласка, додайте маркер на карту"
      : "Будь ласка, заповніть поле";
  }

  if (key === "title" && String(value).length > 100) {
    return "Назва має бути меншою за 100 символів";
  }

  if (key === "info" && String(value).length > 500) {
    return "Опис має бути меншим за 100 символів";
  }

  if (key === "location" && String(value).length > 100) {
    return "Місце розташування має бути меншим за 100 символів";
  }

  if (key === "rating" && +value > 10) {
    return "Рейтинг не може бути більшим за 10";
  }

  return null;
};
