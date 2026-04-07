import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import AddTripModal from '../components/addtripmodal'
import TripCard from '../components/tripcard'
import { getTrips } from '../services/trips'
import { Plus } from 'lucide-react'

export default function Trips() {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTrip,setSelectedTrip] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const fetchTrips = async () => {
        try {
            const res = await getTrips()
            setTrips(res.data)
        } catch (error) {
            console.error('Failed to fetch trips', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true);
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='px-6 md:px-16 lg:px-24 py-8'>

                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>My Trips</h1>
                        <p className='text-gray-500 mt-1'>You have {trips.length} trip{trips.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className='flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition'
                    >
                        <Plus size={18} />
                        Add Trip
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className='flex justify-center items-center py-24'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
                    </div>
                )}

                {/* Empty State */}
                {!loading && trips.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
                        <p className='text-xl font-medium'>No trips yet</p>
                        <p className='text-sm mt-1'>Click "Add Trip" to create your first trip</p>
                    </div>
                )}

                {/* Stats Bar - add this between header and cards */}
                {!loading && trips.length > 0 && (
                    <div className='grid grid-cols-3 gap-4 mb-8'>
                        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
                            <p className='text-gray-500 text-sm'>Total Trips</p>
                            <p className='text-2xl font-bold text-gray-800'>{trips.length}</p>
                        </div>
                        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
                            <p className='text-gray-500 text-sm'>Public Trips</p>
                            <p className='text-2xl font-bold text-green-600'>
                                {trips.filter(t => t.isPublic).length}
                            </p>
                        </div>
                        <div className='bg-white rounded-xl p-4 shadow-sm border border-gray-100'>
                            <p className='text-gray-500 text-sm'>Private Trips</p>
                            <p className='text-2xl font-bold text-gray-600'>
                                {trips.filter(t => !t.isPublic).length}
                            </p>
                        </div>
                    </div>
                )}

                {/* Trip Cards */}
                {!loading && trips.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {trips.map(trip => (
                            <TripCard
                                key={trip._id}
                                trip={trip}
                                onDelete={fetchTrips}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add Trip Modal */}
            {showModal && (
                <AddTripModal
                    trip={selectedTrip}
                    onClose={() => {
                        setShowModal(false)
                        setSelectedTrip(null)
                    }}
                    onSuccess={() => {
                        setShowModal(false)
                        fetchTrips()
                        setSelectedTrip(null)  // refresh list after adding
                    }}
                />
            )}
        </div>
    )
}