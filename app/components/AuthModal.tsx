'use client'
import { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AuthModalInputs from './AuthModalInputs'
import useAuth from '@/hooks/useAuth'
import { AuthenticationContext } from '../context/AuthContext'
import { Alert, CircularProgress } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
}

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const { error, setAuthState, data, loading } = useContext(AuthenticationContext)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { signin, signup } = useAuth()

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent
  }

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  })
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (isSignin) {
      if (inputs.password && inputs.email) {
        return setDisabled(false)
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false)
      }
    }
    setDisabled(true)
  }, [inputs])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose)
    } else {
      signup(inputs, handleClose)
    }
  }

  return (
    <div>
      <button
        className={`${renderContent('text-white bg-blue-400', '')} border p-1 px-4 rounded mr-3 `}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="h-[600px] flex justify-center py-24 px-2">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error ? error.map((err) => <Alert severity="error">{err}</Alert>) : null}
              <div className="pb-2 mb-2 font-bold text-center uppercase border-b">
                <p className="text-sm">{renderContent('Sign In', 'Create Account')}</p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContent('Log Into Your Account', 'Create Your OpenTable Account')}
                </h2>

                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignin}
                />
                <button
                  className="w-full p-3 mb-5 text-sm text-white uppercase bg-red-600 rounded disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContent('Sign In', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  )
}
