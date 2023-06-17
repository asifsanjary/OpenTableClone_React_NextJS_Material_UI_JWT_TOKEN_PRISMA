"use client";

import React, { useState } from "react";
import { partySize, times } from "../../../../data";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  openTime, closeTime
}: {
  openTime: string; closeTime: string
}) => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    if (date) return setSelectedDate(date);
    return setSelectedDate(null);
  }

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];
    let isWithinWindos = false;
    times.forEach(time => {
      if (!isWithinWindos && time.time === openTime) {
        timesWithinWindow.push(time);
        isWithinWindos = true;
      }
      else if (isWithinWindos && time.time !== closeTime) {
        timesWithinWindow.push(time);
      }
      else if (isWithinWindos && time.time === closeTime) {
        timesWithinWindow.push(time);
        isWithinWindos = false;
      }
    });
    return timesWithinWindow
  }

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party Size</label>
        <select name="" className="py-3 border-b font-light " id="">
          {partySize.map((size, index) => (
            <option key={index} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor=""> Date </label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
            className="py-3 border-b text-reg font-light w-28" />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor=""> Time </label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimeByRestaurantOpenWindow().map((time, index) => (
              <option key={index} value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;
