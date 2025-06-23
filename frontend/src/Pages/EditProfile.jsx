import React, { useState } from 'react'
import { useAuth } from '../Components/AuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || "")
  const [email] = useState(user?.email || "")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(db, 'users', user.uid), { name })
      setMessage("Profile updated successfully!")
      setTimeout(() => navigate('/profile'), 1000)
    } catch (err) {
      setMessage("Update failed. Try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-6">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        <label className="block mb-2 text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        <label className="block mb-2 text-gray-700">Email (read-only)</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full p-2 border border-gray-200 rounded bg-gray-100"
        />

        <button type="submit" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  )
}

export default EditProfile
