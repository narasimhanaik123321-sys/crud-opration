import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function UpdateStudent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [loading, setLoading] = useState(false)

  const API_URL = "https://crud-opration-1.onrender.com"

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${API_URL}/students`)
        const student = res.data.find((s: any) => s._id === id)

        if (student) {
          setName(student.name)
          setEmail(student.email)
          setAge(student.age)
        }
      } catch (error) {
        console.error("Failed to fetch student:", error)
        alert("Unable to fetch student data")
      }
    }

    fetchStudent()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put(`${API_URL}/update/${id}`, { name, email, age })
      navigate("/")
    } catch (error) {
      console.error("Failed to update student:", error)
      alert("Update failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-400 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Student
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-3">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default UpdateStudent
