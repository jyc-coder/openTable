import Header from './components/Header'
import Form from './components/Form'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Milestones Grill (Toronto) 냠냠쩝쩝',
  description: '밥은 먹고 다니세요?',
}
export default function RestaurantReserve() {
  return (
    <div className="h-screen border-t">
      <div className="w-3/5 m-auto py-9">
        {/* HEADER */}
        <Header />
        {/* HEADER */} {/* FORM */}
        <Form />
      </div>
    </div>
  )
}
