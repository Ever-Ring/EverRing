import { useState } from "react";

interface UseDateTimePickerProps {
  initialDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

export default function useDateTimePicker({
  initialDate,
  minDate,
  maxDate,
}: UseDateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    return initialDate || new Date();
  });

  const currentHours = selectedDate.getHours();
  const currentHour12 = currentHours % 12 || 12;
  const currentAmPm: "AM" | "PM" = currentHours >= 12 ? "PM" : "AM";
  const currentMinutes = selectedDate.getMinutes();

  function handleDateChange(date: Date | null) {
    if (!date) return;
    const newDate = new Date(selectedDate);
    newDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  }

  function handleHourChange(hour12: number) {
    const newDate = new Date(selectedDate);
    let newHour24 = hour12;
    if (currentAmPm === "PM" && hour12 < 12) {
      newHour24 = hour12 + 12;
    }
    if (currentAmPm === "AM" && hour12 === 12) {
      newHour24 = 0;
    }
    newDate.setHours(newHour24);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  }

  function handleMinuteChange(m: number) {
    const newDate = new Date(selectedDate);
    newDate.setMinutes(m);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  }

  function handleAmPmChange(ampm: "AM" | "PM") {
    const newDate = new Date(selectedDate);
    let hour24 = currentHour12;
    if (ampm === "PM" && currentHour12 < 12) {
      hour24 = currentHour12 + 12;
    }
    if (ampm === "AM" && currentHour12 === 12) {
      hour24 = 0;
    }
    newDate.setHours(hour24);

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
  }

  return {
    selectedDate,
    setSelectedDate,
    currentHours,
    currentHour12,
    currentAmPm,
    currentMinutes,
    handleDateChange,
    handleHourChange,
    handleMinuteChange,
    handleAmPmChange,
  };
}
