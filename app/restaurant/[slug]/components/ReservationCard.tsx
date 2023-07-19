'use client'
import React, { useState } from 'react'
import { partySize as partySizes, times } from '../../../../data'
import DatePicker from 'react-datepicker'
import useAvailabilities from '@/hooks/useAvailabilities'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { Time, convertToDisplayTime } from '@/utils/convertToDisplayTime'

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string
  closeTime: string
  slug: string
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const { data, loading, error, fetchAvailabilities } = useAvailabilities()
  const [time, setTime] = useState(openTime)
  const [partySize, setPartySize] = useState('2')
  const [day, setDay] = useState(new Date().toISOString().split('T')[0])
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const offset = date.getTimezoneOffset() * 60000
      const localDate = new Date(date.getTime() - offset)
      setDay(localDate.toISOString().split('T')[0])
      return setSelectedDate(localDate)
    }
    return setSelectedDate(null)
  }

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    })
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
        <h4 className="text-lg mr-7">Make a Reservation {time}</h4>
      </div>
      <div className="flex flex-col my-3">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 font-light border-b"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map((size) => (
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
          <select
            name=""
            id=""
            className="py-3 font-light border-b"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterTimesByRestaurantOpenWindow().map((time) => (
              <option value={time.time}>{time.displayTime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="w-full h-16 px-4 font-bold text-white bg-red-600 rounded"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : 'Find a Time'}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="w-24 p-2 mb-3 mr-3 text-center text-white bg-red-600 rounded cursor-pointer"
                >
                  <p className="text-sm font-bold">{convertToDisplayTime(time.time as Time)}</p>
                </Link>
              ) : (
                <p className="w-24 p-2 mb-3 mr-3 bg-gray-300 rounded"></p>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
