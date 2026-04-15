import { Trash2, Globe, Lock, MapPin, Pencil } from 'lucide-react'
import { deleteTrip } from '../services/trips'
import { useNavigate } from 'react-router-dom'

export default function TripCard({ trip, onDelete, onEdit, showDelete = true }) {
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.stopPropagation()
        if (!window.confirm('Are you sure you want to delete this trip?')) return
        try {
            await deleteTrip(trip._id)
            onDelete()
        } catch (error) {
            console.error('Failed to delete trip', error)
        }
    }

    const handleEdit = (e) => {
        e.stopPropagation()
        onEdit(trip)
    }

    return (
        <div
            onClick={() => navigate(`/trips/${trip._id}`)}
            className='bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100'
        >
            {trip.image ? (
                <div className='w-full aspect-4/3 overflow-hidden rounded-xl'>
                    <img
                    src={trip.image.trim()}
                    alt={trip.title}
                    className="w-full h-full object-cover object-[center_80%] border-2 border-red-500"
                    onError={(e) => {
                        console.log("❌ Image failed to load:", trip.image)
                        e.target.style.display = "none"
                    }}
                />
                </div>
            ) : (
                <div className='w-full h-48 bg-blue-500 flex items-center justify-center'>
                    <MapPin size={40} className='text-white' />
                </div>
            )}

            {/* Card Content */}
            <div className='p-4'>
                <div className='flex justify-between items-start'>
                    <div>
                        <h2 className='font-semibold text-gray-800 text-lg'>{trip.title}</h2>
                        <p className='text-gray-500 text-sm'>{trip.country}</p>
                    </div>

                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${trip.isPublic ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {trip.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                        {trip.isPublic ? 'Public' : 'Private'}
                    </span>
                </div>

                {trip.startDate && (
                    <p className='text-xs text-gray-400 mt-2'>
                        {new Date(trip.startDate).toLocaleDateString()}
                        {trip.endDate && ` → ${new Date(trip.endDate).toLocaleDateString()}`}
                    </p>
                )}

                <div className='flex justify-between items-center mt-4'>
                    {trip.budget ? (
                        <p className='text-sm text-blue-600 font-medium'>₹{trip.budget}</p>
                    ) : (
                        <span />
                    )}

                    <div className="flex gap-2">
                        <button onClick={handleEdit} className='text-gray-400 hover:text-blue-500 transition'>
                            <Pencil size={16} />
                        </button>
                        <button onClick={handleDelete} className='text-gray-400 hover:text-red-500 transition'>
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}