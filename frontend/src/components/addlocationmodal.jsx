import { useState } from 'react'
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
    const [error, setError] = useState('')
    const [locationFound, setLocationFound] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // search place name → get lat/lng from Nominatim
    const handleSearchLocation = async () => {
        if (!formData.placeName.trim()) return
        setSearching(true)
        setError('')
        setLocationFound(false)

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.placeName)}&format=json&limit=1`,
                {
                    headers: {
                        'Accept-Language': 'en',
                        'User-Agent': 'Pathfolio/1.0'  // Nominatim requires this
                    }
                }
            )
            const data = await res.json()

            if (data.length === 0) {
                setError('Place not found! Try a different name.')
                return
            }

            // automatically set lat/lng from result
            setFormData(prev => ({
                ...prev,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
                placeName: data[0].display_name.split(',')[0] // clean name
            }))
            setLocationFound(true)

        } catch (error) {
            setError('Failed to search location. Try again.')
        } finally {
            setSearching(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.latitude || !formData.longitude) {
            setError('Please search and confirm a location first!')
            return
        }
        setLoading(true)
        setError('')
        try {
            await createLocation(tripId, formData)
            onSuccess()
        } catch (error) {
            setError(error.message || 'Failed to add location')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>Add Location</h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* Place search */}
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            name='placeName'
                            placeholder='Search place name *'
                            value={formData.placeName}
                            onChange={handleChange}
                            required
                            className='border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
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

                    {/* Show confirmed location */}
                    {locationFound && (
                        <div className='bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm text-green-700'>
                            ✅ Location found: {formData.latitude}, {formData.longitude}
                        </div>
                    )}

                    <input
                        type='date'
                        name='visitDate'
                        value={formData.visitDate}
                        onChange={handleChange}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <textarea
                        name='notes'
                        placeholder='Notes'
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                    />
                    <input
                        type='number'
                        name='expense'
                        placeholder='Expense (₹)'
                        value={formData.expense}
                        onChange={handleChange}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

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