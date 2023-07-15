'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const handleSearch = () => {
    const queryParam = new URLSearchParams({ city: location }).toString()
    router.push(`/search?${queryParam}`)
    setLocation('')
  }
  return (
    <div className="flex justify-center py-3 m-auto text-lg text-left">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="py-2 text-white bg-red-600 rounded px-9" onClick={handleSearch}>
        Let's go
      </button>
    </div>
  )
}
