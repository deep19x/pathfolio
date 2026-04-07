import { useState,useEffect } from 'react';
import { createTrip,editTrip } from '../services/trips';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function AddTripModal({ onClose, onSuccess,trip }) {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm();

    const formatDate = (date) => {
        return date ? date.split("T")[0] : "";
    }

    useEffect(() => {
    if (trip) {
        reset({
            ...trip,
            startDate: trip.startDate ? formatDate(trip.startDate) : "",
            endDate: trip.endDate ? formatDate(trip.endDate) : "",
        });
    }
}, [trip, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const cleanData = {
            title: data.title,
            description: data.description,
            country: data.country,
            startDate: data.startDate,
            endDate: data.endDate,
            budget: data.budget,
            isPublic: data.isPublic,
            }
            if(trip){
                await editTrip(trip._id,cleanData);
            } else {
                await createTrip(data);
            }
            onSuccess();
        } catch (err) {
            console.log(err);
            setError("root", {
                message: trip ? "Failed to update Trip" : "Failed to create Trip"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-xl w-full max-w-md p-6'>

                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold'>
                        {trip ? "Edit Trip" : "Add new Trip"}
                    </h2>
                    <X onClick={onClose} className='cursor-pointer text-gray-400 hover:text-gray-600' />
                </div>

                {errors.root?.message && (
                    <p className='text-red-500 text-sm mb-4'>{errors.root.message}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

                    {/* Title */}
                    <input
                        type='text'
                        placeholder='Trip Title *'
                        {...register("title", {
                            required: "Title is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required"
                            }
                        })}
                        className={`border rounded-lg px-4 py-2
                        ${errors.title ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}

                    {/* Country */}
                    <input
                        type='text'
                        placeholder='Country *'
                        {...register("country", {
                            required: "Country is required"
                        })}
                        className={`border rounded-lg px-4 py-2
                        ${errors.country ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.country && <p className='text-red-500 text-sm'>{errors.country.message}</p>}

                    {/* Dates */}
                    <div className='flex gap-3'>
                        <input
                            type='date'
                            {...register("startDate")}
                            className='border rounded-lg px-4 py-2 w-full'
                        />
                        <input
                            type='date'
                            {...register("endDate", {
                                validate: (value, formValues) => {
                                    if (!value || !formValues.startDate) return true;
                                    return new Date(value) >= new Date(formValues.startDate)
                                        || "End date must be after start date";
                                }
                            })}
                            className={`border rounded-lg px-4 py-2 w-full
                            ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
                        />
                    </div>
                    {errors.endDate && <p className='text-red-500 text-sm'>{errors.endDate.message}</p>}

                    {/* Description */}
                    <textarea
                        placeholder='Description'
                        rows={3}
                        {...register("description", {
                            maxLength: {
                                value: 1000,
                                message: "Maximum 1000 characters"
                            }
                        })}
                        className='border rounded-lg px-4 py-2'
                    />
                    {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}

                    {/* Budget */}
                    <input
                        type='number'
                        placeholder='Budget (₹)'
                        {...register("budget", {
                            validate: (value) => {
                                if (!value) return true;
                                return value >= 0 || "Budget cannot be negative";
                            }
                        })}
                        className='border rounded-lg px-4 py-2'
                    />
                    {errors.budget && <p className='text-red-500 text-sm'>{errors.budget.message}</p>}

                    {/* Public */}
                    <label className='flex items-center gap-3 cursor-pointer'>
                        <input
                            type='checkbox'
                            {...register("isPublic")}
                        />
                        <span className='text-sm text-gray-600'>Make this trip public</span>
                    </label>

                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-blue-600 text-white py-2 rounded-lg'
                    >
                        {loading 
                            ? (trip ? "Updating..." : "Creating...")
                            : (trip ? "Update Trip" : "Create Trip")}
                    </button>

                </form>
            </div>
        </div>
    );
}