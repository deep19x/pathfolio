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
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const validate = () => {
        let newError = {};

        // Title
        if (!formData.title) {
            newError.title = "Title is required";
        } else if (formData.title.length < 3) {
            newError.title = "Minimum 3 characters required";
        }

        // Country
        if (!formData.country) {
            newError.country = "Country is required";
        }

        // Dates (optional but logical)
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);

            if (start > end) {
                newError.endDate = "End date must be after start date";
            }
        }

        // Description (optional)
        if (formData.description && formData.description.length > 1000) {
            newError.description = "Maximum 1000 characters";
        }

        // Budget (optional)
        if (formData.budget && Number(formData.budget) < 0) {
            newError.budget = "Budget cannot be negative";
        }

        return newError;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error while typing
        setError(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateError = validate();

        if (Object.keys(validateError).length > 0) {
            setError(validateError);
            return;
        }

        setLoading(true); // ✅ moved after validation

        try {
            await createTrip(formData);
            onSuccess();
        } catch (err) {
            setError({ general: "Failed to create trip" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>Add New Trip</h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {/* General Error */}
                {error.general && (
                    <p className='text-red-500 text-sm mb-4'>{error.general}</p>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* Title */}
                    <input
                        type='text'
                        name='title'
                        placeholder='Trip Title *'
                        value={formData.title}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                        ${error.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />
                    {error.title && <p className='text-red-500 text-sm'>{error.title}</p>}

                    {/* Country */}
                    <input
                        type='text'
                        name='country'
                        placeholder='Country *'
                        value={formData.country}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                        ${error.country ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />
                    {error.country && <p className='text-red-500 text-sm'>{error.country}</p>}

                    {/* Dates */}
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
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2
                            ${error.endDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                        />
                    </div>
                    {error.endDate && <p className='text-red-500 text-sm'>{error.endDate}</p>}

                    {/* Description */}
                    <textarea
                        name='description'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 resize-none
                        ${error.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />
                    {error.description && <p className='text-red-500 text-sm'>{error.description}</p>}

                    {/* Budget */}
                    <input
                        type='number'
                        name='budget'
                        placeholder='Budget (₹)'
                        value={formData.budget}
                        onChange={handleChange}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                        ${error.budget ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />
                    {error.budget && <p className='text-red-500 text-sm'>{error.budget}</p>}

                    {/* Public toggle */}
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

                    {/* Button */}
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