'use client'
import useReservation from '@/hooks/useReservation'
import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string
  date: string
  partySize: string
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequests: '',
  })
  const [day, time] = date.split('T')
  const [didBook, setDidBook] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }
  const { error, loading, createReservation } = useReservation()
  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequests: inputs.bookerRequests,
      setDidBook,
    })
  }
  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false)
    }
    return setDisabled(true)
  }, [inputs])

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up!</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="First name"
            name="bookerFirstName"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Last name"
            name="bookerLastName"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Phone number"
            name="bookerPhone"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Email"
            name="bookerEmail"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Occasion (optional)"
            name="bookerOccasion"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="p-3 mb-4 border rounded w-80"
            placeholder="Requests (optional)"
            name="bookerRequests"
            value={inputs.bookerRequests}
            onChange={handleChangeInput}
          />
          <button
            disabled={disabled || loading}
            className="w-full p-3 font-bold text-white bg-red-600 rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? <CircularProgress color="inherit" /> : 'Complete reservation'}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy
            Policy. Standard text message rates may apply. You may opt out of receiving text
            messages at any time.
          </p>
        </>
      )}
    </div>
  )
}
