import React from 'react'

interface Props {
  inputs: {
    firstName: string
    lastName: string
    email: string
    phone: string
    city: string
    password: string
  }
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSignin: boolean
}

export default function AuthModalInputs({ inputs, handleChangeInput, isSignin }: Props) {
  return (
    <div>
      {isSignin ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input
            className="p-2 py-3 border rounded w-[49%]"
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChangeInput}
            value={inputs.firstName}
          />
          <input
            className="p-2 py-3 border rounded w-[49%]"
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChangeInput}
            value={inputs.lastName}
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          className="w-full p-2 py-3 border rounded"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChangeInput}
          value={inputs.email}
        />
      </div>
      {isSignin ? null : (
        <div className="flex justify-between my-3 text-sm">
          <input
            className="p-2 py-3 border rounded w-[49%]"
            type="text"
            placeholder="Phone"
            name="phone"
            onChange={handleChangeInput}
            value={inputs.phone}
          />
          <input
            className="p-2 py-3 border rounded w-[49%]"
            type="text"
            placeholder="City"
            name="city"
            onChange={handleChangeInput}
            value={inputs.city}
          />
        </div>
      )}
      <div className="flex justify-between my-3 text-sm">
        <input
          className="w-full p-2 py-3 border rounded"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChangeInput}
          value={inputs.password}
        />
      </div>
    </div>
  )
}
