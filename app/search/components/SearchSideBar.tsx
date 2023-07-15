import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[]
  cuisines: Cuisine[]
  searchParams: { city?: string; cuisine?: string; price?: PRICE }
}) {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: '$',
      className: 'w-40 p-2 font-light text-center border rounded-l text-reg',
    },
    {
      price: PRICE.REGULAR,
      label: '$$',
      className: 'w-40 p-2 font-light text-center border  text-reg',
    },
    {
      price: PRICE.EXPENSIVE,
      label: '$$$',
      className: 'w-403 p-2 font-light text-center border rounded-r text-reg',
    },
  ]
  return (
    <div className="w-1/5 ">
      <div className="pb-4 border-b">
        <h1 className="mb-2">Region</h1>
        <div className="flex flex-col">
          {locations.map((location) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  city: location.name,
                },
              }}
              key={location.id}
              className="font-light capitalize text-reg"
            >
              {location.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-4 mt-3 border-b">
        <h1 className="mb-2">Cuisine</h1>
        <div className="flex flex-col">
          {cuisines.map((cuisine) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
              key={cuisine.id}
              className="font-light capitalize text-reg"
            >
              {cuisine.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="pb-4 mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
