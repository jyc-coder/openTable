'use client'
import Image from 'next/image'
import React from 'react'
import errorMascot from '../../public/icons/error.png'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <Image src={errorMascot} alt="error" className="w-56 mb-8" />
      <div className="bg-white rounded shadow p-9 py-14">
        <h3 className="text-3xl font-bold">에고! </h3>
        <p className="font-bold text-reg">{error.message}</p>
        <p className="mt-6 text-sm font-light">Error Code: 400</p>
      </div>
    </div>
  )
}
