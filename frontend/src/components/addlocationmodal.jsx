import { useState,useEffect } from 'react'
import { createLocation } from '../services/location'
import { X, Search } from 'lucide-react'

export default function AddLocationModal({ tripId, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        placeName: '',
        latitude: '',
        longitude: '',
        visitDate: '',
        notes: '',
        expense: ''
    })

    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [locationFound, setLocationFound] = useState(false)

    const validate = () => {
        let newError = {}

        // Place validation
        if (!formData.placeName) {
            newError.placeName = "Place name is required"
        }

        return newError
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Reset location if place name changes
        if (name === "placeName") {
            setLocationFound(false)
        }

        // Clear errors
        setError(prev => ({
            ...prev,
            [name]: "",
            general: ""
        }))
    }

    const handleSearchLocation = async () => {
        if (!formData.placeName.trim()) return

        setSearching(true)
        setLocationFound(false)

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.placeName)}&format=json&limit=1`,
                {
                    headers: {
                        'Accept-Language': 'en',
                        'User-Agent': 'Pathfolio/1.0'
                    }
                }
            )

            const data = await res.json()

            if (data.length === 0) {
                setError({ general: 'Place not found! Try a different name.' })
                return
            }

            setFormData(prev => ({
                ...prev,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
                placeName: data[0].display_name.split(',')[0]
            }))

            setLocationFound(true)

        } catch (err) {
            setError({ general: 'Failed to search location. Try again.' })
        } finally {
            setSearching(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validateError = validate()

        if (Object.keys(validateError).length > 0) {
            setError(validateError)
            return
        }

        if (!formData.latitude || !formData.longitude) {
            setError({ general: 'Please search and confirm a location first!' })
            return
        }

        setLoading(true)

        try {
            await createLocation(tripId, formData)
            onSuccess()
        } catch (err) {
            setError({ general: err.message || 'Failed to add location' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        let newError = {};

        if(formData.placeName && !locationFound){
            newError.placeName = "Please search and confirm location";
        }

        if(formData.expense && Number(formData.expense) < 0){
            newError.expense = "Expense cannot be negative";
        }

        setError((prev) => ({
            ...prev,
            ...newError
        }));
        
    },[formData.placeName,formData.expense,locationFound]);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>Add Location</h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {/* General Error */}
                {error.general && (
                    <p className='text-red-500 text-sm mb-4'>{error.general}</p>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* Place Search */}
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            name='placeName'
                            placeholder='Search place name *'
                            value={formData.placeName}
                            onChange={handleChange}
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2
                            ${error.placeName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                        />
                        <button
                            type='button'
                            onClick={handleSearchLocation}
                            disabled={searching}
                            className='bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                        >
                            {searching ? (
                                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            ) : (
                                <Search size={18} />
                            )}
                        </button>
                    </div>
                    {error.placeName && (
                        <p className='text-red-500 text-sm'>{error.placeName}</p>
                    )}

                    {/* Location Found */}
                    {locationFound && (
                        <div className='bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-700'>
                            ✅ Location found: {formData.latitude}, {formData.longitude}
                        </div>
                    )}

                    {/* Visit Date */}
                    <input
                        type='date'
                        name='visitDate'
                        value={formData.visitDate}
                        onChange={handleChange}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {/* Notes */}
                    <textarea
                        name='notes'
                        placeholder='Notes'
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                    />

                    {/* Expense */}
                    <input
                        type='number'
                        name='expense'
                        placeholder='Expense (₹)'
                        value={formData.expense}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                        ${error.expense ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />
                    {error.expense && (
                        <p className='text-red-500 text-sm'>{error.expense}</p>
                    )}

                    {/* Submit */}
                    <button
                        type='submit'
                        disabled={loading || !locationFound}
                        className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                    >
                        {loading ? 'Adding...' : 'Add Location'}
                    </button>

                </form>
            </div>
        </div>
    )
}