"use client"
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import useReservation from "../../../../hooks/useReservation";

const Form = (
  { slug,
    partySize,
    date }:
    {
      slug: string;
      partySize: string;
      date: string;
    }) => {

  const [day, time] = date.split("T")
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerOccasion: "",
    bookerRequest: ""
  })

  const { error, loading, createReservation } = useReservation()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
    ) {
      setDisabled(false);

    }
    else {
      setDisabled(true);
    }
  }, [inputs]);

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      day,
      time,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook
    })
  }

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ?
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div> :
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First Name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last Name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone Number"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name="bookerRequest"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
          />
          <button
            className="
              bg-red-600
              w-full
              p-3
              text-white
              font-bold
              rounded
              disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}>
            {loading ? <CircularProgress color="inherit" /> : "Complete Reservation"}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms of
            Use and Privacy Policy. Message & data rates may apply. You can opt out
            of receiving text messages at any time in your account settings or by
            replying STOP.
          </p>
        </>}

    </div>
  );
};

export default Form;
