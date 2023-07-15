import React from 'react'

export default function Header({ title }: { title: string }) {
  const renderTitle = () => {
    const titleArray = title.split('-')

    titleArray[titleArray.length - 1] = `(${titleArray[titleArray.length - 1]})`

    return titleArray.join(' ')
  }
  return (
    <div className="overflow-hidden h-96">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-center text-white capitalize text-7xl text-shadow">{renderTitle()}</h1>
      </div>
    </div>
  )
}
