import { useState, useEffect } from "react"
import Navbar from "../components/navbar"
import { getPublicTrips } from "../services/trips";
import TripCard from "../components/tripcard";
export default function Explore() {

    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPublicTrips = async () => {
        try {
            const res = await getPublicTrips();
            setTrips(res.data);
        } catch (error) {
            console.log('Failed to fetch public data');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPublicTrips();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="px-6 md:px-16 lg:px-24 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Explore Trips</h1>
                    <h3 className="text-gray-500 mt-1">Discover travel experiences shared by the community</h3>
                    <p className="text-gray-500 mt-1">{trips.length} shared by community</p>
                </div>

                {/* loading */}
                {loading && (
                    <div className='flex justify-center items-center py-24'>
                        <div className='w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
                    </div>
                )}

                {/* Empty State */}
                {!loading && trips.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 text-gray-400'>
                        <p className='text-xl font-medium'>No trips yet</p>
                    </div>
                )}

                {/* Trip Cards */}
                {!loading && trips.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {trips.map(trip => (
                            <TripCard
                                key={trip._id}
                                trip={trip}
                                onDelete={fetchPublicTrips}
                                showDelete={false}
                            />
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}