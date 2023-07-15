import Price from '@/app/components/Price'
import Stars from '@/app/components/Stars'
import { RestaurantCardType } from '@/app/page'
import { calculateReviewRatingAverage } from '@/utils/calculateRevieRatingAverage'
import Link from 'next/link'
import React from 'react'

interface Props {
  restaurant: RestaurantCardType
}
export default function RestaurantCard({ restaurant }: Props) {
  const renderRatingText = () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews)
    if (rating > 4) return 'Awesome'
    else if (rating <= 4 && rating > 3) return 'Good'
    else if (rating <= 3 && rating > 0) return 'Average'
    else ''
  }
  return (
    <div className="flex w-4/6 pb-5 border-b">
      <img src={restaurant.main_image} alt="" className="rounded w-44 h-36" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="flex font-light text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  )
}
