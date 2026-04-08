import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect } from 'react'

// 🔥 Helper component for auto zoom
function FitBounds({ locations }) {
    const map = useMap();

    useEffect(() => {
        if (!locations.length) return;

        if (locations.length === 1) {
            map.setView(
                [locations[0].latitude, locations[0].longitude],
                13
            );
        } else {
            const bounds = locations.map(loc => [
                loc.latitude,
                loc.longitude
            ]);

            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [locations, map]);

    return null;
}

export default function TripMap({ locations }) {

    // default center — world view
    const defaultCenter = [20, 0]
    const defaultZoom = 2

    // polyline needs array of [lat, lng] pairs
    const polylinePoints = locations.map(loc => [loc.latitude, loc.longitude])

    return (
        <MapContainer
            center={defaultCenter}   // ✅ always default
            zoom={defaultZoom}
            style={{ height: '500px', width: '100%' }}
        >
            {/* Map tiles */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            
            <FitBounds locations={locations} />

            {/* Markers */}
            {locations.map((loc, index) => (
                <Marker key={loc._id} position={[loc.latitude, loc.longitude]}>
                    <Popup>
                        <div>
                            <p className='font-semibold'>{loc.placeName}</p>

                            {index === 0 && (
                                <p className='text-xs text-green-600'>📍 Start Point</p>
                            )}

                            {loc.notes && (
                                <p className='text-xs text-gray-500 mt-1'>
                                    {loc.notes}
                                </p>
                            )}

                            {loc.visitDate && (
                                <p className='text-xs text-gray-400'>
                                    {new Date(loc.visitDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Polyline */}
            {locations.length > 1 && (
                <Polyline
                    positions={polylinePoints}
                    color='blue'
                    weight={3}
                    opacity={0.7}
                    dashArray='8'
                />
            )}
        </MapContainer>
    )
}