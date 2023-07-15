import Stars from '@/app/components/Stars'
import { calculateReviewRatingAverage } from '@/utils/calculateRevieRatingAverage'
import { Review } from '@prisma/client'
import React from 'react'

export default function Rating({ reviews }: { reviews: Review[] }) {
  return (
    <div className="flex items-end">
      <div className="flex items-center mt-2 ratings">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">{calculateReviewRatingAverage(reviews).toFixed(1)}</p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {reviews.length} Review{reviews.length === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  )
}
