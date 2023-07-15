import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
      <div className="mt-10 text-center">
        <h1 className="mb-2 text-5xl font-bold text-white">Find your table for any occasion</h1>
        {/* SEARCH BAR */}
        <SearchBar />
        {/* SEARCH BAR */}
      </div>
    </div>
  )
}
