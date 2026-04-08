import { useEffect, useState } from 'react'
import { createLocation, updateLocation } from '../services/location'
import { X, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function AddLocationModal({ tripId, location, onClose, onSuccess }) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
        watch
    } = useForm()

    const [searching, setSearching] = useState(false)
    const [loading, setLoading] = useState(false)
    const [locationFound, setLocationFound] = useState(false)

    const placeName = watch("placeName")
    const isEdit = !!location

    // ✅ Prefill in edit mode
    useEffect(() => {
        if (location) {
            setValue("placeName", location.placeName)
            setValue("latitude", location.latitude)
            setValue("longitude", location.longitude)
            setValue("visitDate", location.visitDate?.split("T")[0])
            setValue("notes", location.notes)
            setValue("expense", location.expense)

            setLocationFound(true) // allow submit without re-search
        }
    }, [location, setValue])

    // ✅ Search location
    const handleSearchLocation = async () => {
        if (!placeName?.trim()) return

        setSearching(true)
        setLocationFound(false)

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`,
                {
                    headers: {
                        'Accept-Language': 'en',
                        'User-Agent': 'Pathfolio/1.0'
                    }
                }
            )

            const data = await res.json()

            if (data.length === 0) {
                setError("placeName", {
                    message: "Place not found! Try another name"
                })
                return
            }

            setValue("latitude", parseFloat(data[0].lat))
            setValue("longitude", parseFloat(data[0].lon))
            setValue("placeName", data[0].display_name.split(',')[0])

            setLocationFound(true)
        } catch {
            setError("root", {
                message: "Failed to search location"
            })
        } finally {
            setSearching(false)
        }
    }

    // ✅ Submit (Create + Edit)
    const onSubmit = async (data) => {

        if (!locationFound && !isEdit) {
            setError("placeName", {
                message: "Please search and confirm location"
            })
            return
        }

        setLoading(true)

        try {
            if (isEdit) {
                await updateLocation(tripId, location._id, data)
            } else {
                await createLocation(tripId, data)
            }

            onSuccess()
        } catch (err) {
            setError("root", {
                message: err.message || "Failed to save location"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>
                        {isEdit ? "Edit Location" : "Add Location"}
                    </h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {/* Error */}
                {errors.root && (
                    <p className='text-red-500 text-sm mb-4'>{errors.root.message}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    {/* Search */}
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            placeholder='Search place name *'
                            {...register("placeName", {
                                required: "Place name is required"
                            })}
                            className={`border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2
                            ${errors.placeName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
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

                    {errors.placeName && (
                        <p className='text-red-500 text-sm'>{errors.placeName.message}</p>
                    )}

                    {/* Date */}
                    <input
                        type='date'
                        {...register("visitDate")}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />

                    {/* Notes */}
                    <textarea
                        placeholder='Notes'
                        {...register("notes")}
                        rows={3}
                        className='border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                    />

                    {/* Expense */}
                    <input
                        type='number'
                        placeholder='Expense (₹)'
                        {...register("expense", {
                            validate: (value) => {
                                if (!value) return true
                                return value >= 0 || "Expense cannot be negative"
                            }
                        })}
                        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2
                        ${errors.expense ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"}`}
                    />

                    {errors.expense && (
                        <p className='text-red-500 text-sm'>{errors.expense.message}</p>
                    )}

                    {/* Submit */}
                    <button
                        type='submit'
                        disabled={loading || (!locationFound && !isEdit)}
                        className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                    >
                        {loading
                            ? (isEdit ? 'Updating...' : 'Adding...')
                            : (isEdit ? 'Update Location' : 'Add Location')
                        }
                    </button>

                </form>
            </div>
        </div>
    )
}