import React, { useState } from 'react'
import { auth } from '../firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

const ChangePassword = () => {
  const [email, setEmail] = useState(auth.currentUser?.email || "")
  const [message, setMessage] = useState("")

  const handleReset = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage("Password reset email sent!")
    } catch (err) {
      setMessage("Failed to send reset email.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <form onSubmit={handleReset} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        <label className="block mb-2 text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full p-2 border border-gray-200 rounded bg-gray-100"
        />

        <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
