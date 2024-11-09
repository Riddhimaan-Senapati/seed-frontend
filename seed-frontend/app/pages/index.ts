// pages/index.tsx

import { useState } from "react"

// Mock API function
const fetchPlantingInfo = async (zipCode: string, crop: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock data
  const mockData = {
    optimalTime: "Mid-April to Early-May",
    topCrops: ["Corn", "Soybeans", "Wheat"]
  }

  // Add the custom crop to the topCrops list if it's not already present
  if (crop.toLowerCase() !== "corn" && crop.toLowerCase() !== "soybeans" && crop.toLowerCase() !== "wheat") {
    mockData.topCrops = mockData.topCrops.filter(c => c.toLowerCase() !== crop.toLowerCase())
    mockData.topCrops.unshift(crop)
  }

  return mockData
}

const Home = () => {
  const [zipCode, setZipCode] = useState("")
  const [crop, setCrop] = useState("")
  const [results, setResults] = useState<{ optimalTime: string; topCrops: string[] } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await fetchPlantingInfo(zipCode, crop)
      setResults(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#556B2F] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-[#FDFCF7] shadow-lg rounded-3xl overflow-hidden">
        <div className="bg-[#7CB342] text-[#FDFCF7] rounded-t-3xl p-6">
          <h1 className="text-2xl font-light">Farmers Planting Guide</h1>
          <p className="text-[#F0F7DA] font-light">Enter your zip code and crop for planting info</p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="zipCode" className="block text-[#4A6741] font-medium">Zip Code</label>
              <input
                id="zipCode"
                type="text"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
                className="w-full border border-[#A4C639] focus:border-[#7CB342] focus:ring-[#7CB342] rounded-xl bg-[#FDFCF7] p-2"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="crop" className="block text-[#4A6741] font-medium">Crop</label>
              <select
                id="crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                required
                className="w-full border border-[#A4C639] focus:border-[#7CB342] focus:ring-[#7CB342] rounded-xl bg-[#FDFCF7] p-2"
              >
                <option value="">Select a crop</option>
                <option value="Corn">Corn</option>
                <option value="Soybeans">Soybeans</option>
                <option value="Wheat">Wheat</option>
                <option value="Tomatoes">Tomatoes</option>
                <option value="Potatoes">Potatoes</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#7CB342] hover:bg-[#689F38] text-[#FDFCF7] rounded-xl p-2 transition-colors duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Planting Info"}
            </button>
          </form>
        </div>
        {results && (
          <div className="flex flex-col items-start bg-[#F0F7DA] rounded-b-3xl mt-4 p-6">
            <h3 className="text-lg font-semibold mb-2 text-[#4A6741]">Results:</h3>
            <p className="text-[#4A6741]"><span className="font-medium">Optimal Planting Time:</span> {results.optimalTime}</p>
            <p className="text-[#4A6741] mt-2 font-medium">Top 3 Suitable Crops:</p>
            <ul className="list-none pl-0 text-[#4A6741]">
              {results.topCrops.map((crop, index) => (
                <li key={index} className="mt-1 flex items-center">
                  <span className="text-[#7CB342] mr-2">•</span> {crop}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
