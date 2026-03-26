import { useState } from 'react'
import { createTrip } from '../services/trips'
import { X } from 'lucide-react'

export default function AddTripModal({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
        budget: '',
        isPublic: false,
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await createTrip(formData)
            onSuccess()  // close modal + refresh list
        } catch (error) {
            setError(error.message || 'Failed to create trip')
        } finally {
            setLoading(false)
        }
    }

    return (
        // Backdrop
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            {/* Modal Box */}
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                {/* Modal Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>Add New Trip</h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {/* Error */}
                {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type='text'
                        name='title'
                        placeholder='Trip Title *'
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <input
                        type='text'
                        name='country'
                        placeholder='Country *'
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                    <div className='flex gap-3'>
                        <input
                            type='date'
                            name='startDate'
                            value={formData.startDate}
                            onChange={handleChange}
                            className='border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                        <input
                            type='date'
                            name='endDate'
                            value={formData.endDate}
                            onChange={handleChange}
                            className='border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>
                    <textarea
                        name='description'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                    />
                    <input
                        type='number'
                        name='budget'
                        placeholder='Budget (₹)'
                        value={formData.budget}
                        onChange={handleChange}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {/* isPublic toggle */}
                    <label className='flex items-center gap-3 cursor-pointer'>
                        <input
                            type='checkbox'
                            name='isPublic'
                            checked={formData.isPublic}
                            onChange={handleChange}
                            className='w-4 h-4 accent-blue-600'
                        />
                        <span className='text-sm text-gray-600'>Make this trip public</span>
                    </label>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                    >
                        {loading ? 'Creating...' : 'Create Trip'}
                    </button>
                </form>
            </div>
        </div>
    )
}