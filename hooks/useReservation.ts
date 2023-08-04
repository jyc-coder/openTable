import { useState } from 'react'
import axios from 'axios'

export default function useReservation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequests,
    setDidBook,
  }: {
    slug: string
    partySize: string
    day: string
    time: string
    bookerFirstName: string
    bookerLastName: string
    bookerPhone: string
    bookerEmail: string
    bookerOccasion: string
    bookerRequests: string
    setDidBook: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    setLoading(true)

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOccasion,
          bookerRequests,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      )
      setLoading(false)
      setDidBook(true)
      return response.data
    } catch (error: any) {
      setLoading(error.response.data.errorMessage)
    }
  }

  return { loading, error, createReservation }
}
