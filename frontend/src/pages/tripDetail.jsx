import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import TripMap from '../components/tripMap'
import AddLocationModal from '../components/addlocationmodal'
import { getSingleTrip } from '../services/trips'
import { getLocation } from '../services/location'
import { Plus, MapPin, Calendar, Globe, Lock } from 'lucide-react'

export default function TripDetail() {
    const { id } = useParams()  // get trip id from URL
    const [trip, setTrip] = useState(null)
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    const fetchTripData = async () => {
        try {
            const [tripRes, locRes] = await Promise.all([
                getSingleTrip(id),
                getLocation(id)
            ])
            setTrip(tripRes.data)
            setLocations(locRes.data)
        } catch (error) {
            console.error('Failed to fetch trip data', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTripData()
    }, [id])

    if (loading) return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='flex justify-center items-center py-24'>
                <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
            </div>
        </div>
    )

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='px-6 md:px-16 lg:px-24 py-8'>

                {/* Trip Info Header */}
                <div className='flex justify-between items-start mb-6'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>{trip?.title}</h1>
                        <p className='text-gray-500 mt-1'>{trip?.country}</p>

                        {trip?.description && (
                            <p className='text-gray-600 mt-2 max-w-xl'>
                                {trip.description}
                            </p>
                        )}

                        {/* Dates */}
                        {trip?.startDate && (
                            <div className='flex items-center gap-2 mt-2 text-sm text-gray-400'>
                                <Calendar size={14} />
                                <span>
                                    {new Date(trip.startDate).toLocaleDateString()}
                                    {trip.endDate && ` → ${new Date(trip.endDate).toLocaleDateString()}`}
                                </span>
                            </div>
                        )}

                        {/* Public / Private */}
                        <span className={`inline-flex items-center gap-1 mt-2 text-xs px-2 py-1 rounded-full ${trip?.isPublic ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                            {trip?.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                            {trip?.isPublic ? 'Public' : 'Private'}
                        </span>
                    </div>

                    {/* Add Location Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                    >
                        <Plus size={18} />
                        Add Location
                    </button>
                </div>

                {/* Location Count */}
                <p className='text-sm text-gray-400 mb-4'>
                    <MapPin size={14} className='inline mr-1' />
                    {locations.length} location{locations.length !== 1 ? 's' : ''} on this trip
                </p>

                {/* Map */}
                <div className='rounded-xl overflow-hidden shadow-md'>
                    <TripMap locations={locations} />
                </div>

            </div>

            {/* Add Location Modal */}
            {showModal && (
                <AddLocationModal
                    tripId={id}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false)
                        fetchTripData()  // refresh map after adding
                    }}
                />
            )}
        </div>
    )
}