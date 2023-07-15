'use client'
import React, { useState } from 'react'
import { partySize, times } from '../../../../data'
import DatePicker from 'react-datepicker'

export default function ReservationCard({
  openTime,
  closeTime,
}: {
  openTime: string
  closeTime: string
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date)
    }
    return setSelectedDate(null)
  }

  const filterTimesByRestaurantOpenWindow = () => {
    const timesWithInWindow: typeof times = []
    let isWithinWindow = false
    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinWindow = true
      }
      if (isWithinWindow) {
        timesWithInWindow.push(time)
      }
      if (time.time === closeTime) {
        isWithinWindow = false
      }
    })
    return timesWithInWindow
  }
  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="pb-2 font-bold text-center border-b">
        <h4 className="text-lg mr-7">Make a Reservation</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 font-light border-b" id="">
          {partySize.map((size) => (
            <option value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className="w-24 py-3 font-light border-b text-reg"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 font-light border-b">
            {filterTimesByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded">
          Find a Time
        </button>
      </div>
    </div>
  )
}
