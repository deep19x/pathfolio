import { Trash2, Globe, Lock, MapPin } from 'lucide-react'
import { deleteTrip } from '../services/trips'
import { useNavigate } from 'react-router-dom'

export default function TripCard({ trip, onDelete }) {
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.stopPropagation()  // prevent card click when clicking delete
        if (!window.confirm('Are you sure you want to delete this trip?')) return
        try {
            await deleteTrip(trip._id)
            onDelete()  // refresh trips list in parent
        } catch (error) {
            console.error('Failed to delete trip', error)
        }
    }

    return (
        <div
            onClick={() => navigate(`/trips/${trip._id}`)}
            className='bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden border border-gray-100'
        >
            {/* Image or Placeholder */}
            {trip.image ? (
                <img src={trip.image} alt={trip.title} className='w-full h-40 object-cover' />
            ) : (
                <div className='w-full h-52 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
                    <MapPin size={40} className='text-white opacity-70' />
                </div>
            )}

            {/* Card Content */}
            <div className='p-4'>
                <div className='flex justify-between items-start'>
                    <div>
                        <h2 className='font-semibold text-gray-800 text-lg'>{trip.title}</h2>
                        <p className='text-gray-500 text-sm'>{trip.country}</p>
                    </div>
                    {/* Public / Private badge */}
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trip.isPublic ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {trip.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                        {trip.isPublic ? 'Public' : 'Private'}
                    </span>
                </div>

                {/* Dates */}
                {trip.startDate && (
                    <p className='text-xs text-gray-400 mt-2'>
                        {new Date(trip.startDate).toLocaleDateString()} 
                        {trip.endDate && ` → ${new Date(trip.endDate).toLocaleDateString()}`}
                    </p>
                )}

                {/* Footer */}
                <div className='flex justify-between items-center mt-4'>
                    {trip.budget ? (
                        <p className='text-sm text-blue-600 font-medium'>₹{trip.budget}</p>
                    ) : (
                        <span />
                    )}
                    <button
                        onClick={handleDelete}
                        className='text-gray-400 hover:text-red-500 transition'
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}