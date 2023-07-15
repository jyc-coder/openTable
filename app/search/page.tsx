import Header from '../components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { Metadata } from 'next/types'
import { useSearchParams } from 'next/navigation'
import { PRICE, PrismaClient } from '@prisma/client'
import { RestaurantCardType } from '../page'

export const metadata: Metadata = {
  title: 'Search | 냠냠쩝쩝',
  description: '밥은 먹고 다니세요?',
}
interface SearchParams {
  city?: string
  cuisine?: string
  price?: PRICE
}
const prisma = new PrismaClient()

const fetchSearchResult = async (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    slug: true,
    location: true,
    price: true,
    reviews: true,
  }
  const where: any = {}
  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    }
  }

  if (searchParams.cuisine) {
    where.cuisine = {
      name: { equals: searchParams.cuisine.toLowerCase() },
    }
  }

  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    }
  }

  return prisma.restaurant.findMany({
    where,
    select,
  })
}

const fetchLocation = async () => {
  return prisma.location.findMany()
}

const fetchCuisine = async () => {
  return prisma.cuisine.findMany()
}

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string; cuisine: string; price?: PRICE }
}) {
  const restaurants = await fetchSearchResult(searchParams)
  const locations = await fetchLocation()
  const cuisines = await fetchCuisine()
  return (
    <>
      <Header />
      <div className="flex w-2/3 py-4 m-auto ">
        <div className="sticky top-0 h-screen max-h-screen pr-4 overflow-y-auto w-36">
          <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        </div>

        <div className="flex flex-col w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} />)
          ) : (
            <p>검색 결과가 없습니다</p>
          )}
        </div>
      </div>
    </>
  )
}
