import { PRICE } from '@prisma/client'
import React from 'react'

export default function Price({ price }: { price: PRICE }) {
  const renderPrice = () => {
    switch (price) {
      case 'CHEAP':
        return (
          <>
            <span>$$</span>
            <span className="text-gray-400">$$</span>
          </>
        )
      case 'REGULAR':
        return (
          <>
            <span>$$$</span>
            <span className="text-gray-400">$</span>
          </>
        )
      default:
        return (
          <>
            <span>$$$$</span>
          </>
        )
    }
  }
  return <p className="flex mr-3">{renderPrice()}</p>
}
