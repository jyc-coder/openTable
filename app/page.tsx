import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { Metadata } from 'next/types'
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client'

export interface RestaurantCardType {
  id: number
  name: string
  main_image: string
  cuisine: Cuisine
  location: Location
  price: PRICE
  slug: string
  reviews: Review[]
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true,
    },
  })

  return restaurants
}

export const metadata: Metadata = {
  title: '냠냠쩝쩝',
  description: '밥은 먹고 다니세요?',
  icons: {
    icon: '/favicon.ico',
  },
}
export default async function Home() {
  const restaurants = await fetchRestaurants()

  return (
    <main>
      {/* HEADER */}
      <Header />
      {/* HEADER */} {/* CARDS */}
      <div className="flex flex-wrap py-3 mt-10 px-36">
        {/* CARD */}
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} />
        ))}
        {/* CARD */}
      </div>
      {/* CARDS */}
    </main>
  )
}

// e8FmtvJ2dl0JR5Am
