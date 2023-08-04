import Header from './components/Header'
import Form from './components/Form'
import { Metadata } from 'next/types'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const prisma = new PrismaClient()

const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  })
  if (!restaurant) {
    notFound()
  }
  return restaurant
}

export const metadata: Metadata = {
  title: 'Milestones Grill (Toronto) 냠냠쩝쩝',
  description: '밥은 먹고 다니세요?',
}
export default async function RestaurantReserve({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { date: string; partySize: string }
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug)

  return (
    <div className="h-screen border-t">
      <div className="w-3/5 m-auto py-9">
        {/* HEADER */}
        <Header
          image={restaurant.main_image}
          name={restaurant.name}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        {/* HEADER */} {/* FORM */}
        <Form date={searchParams.date} partySize={searchParams.partySize} slug={params.slug} />
      </div>
    </div>
  )
}
