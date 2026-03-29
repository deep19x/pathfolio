import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

export default function TripMap({ locations }) {

    // default center — world view if no locations
    const defaultCenter = [20, 0]
    const defaultZoom = 2

    // if locations exist, center map on first location
    const center = locations.length > 0
        ? [locations[0].latitude, locations[0].longitude]
        : defaultCenter

    const zoom = locations.length > 0 ? 6 : defaultZoom

    // polyline needs array of [lat, lng] pairs
    const polylinePoints = locations.map(loc => [loc.latitude, loc.longitude])

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '500px', width: '100%' }}
        >
            {/* Map tiles — this is the actual map background */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            {/* Markers for each location */}
            {locations.map((loc, index) => (
                <Marker key={loc._id} position={[loc.latitude, loc.longitude]}>
                    <Popup>
                        <div>
                            <p className='font-semibold'>{loc.placeName}</p>
                            {/* first location = start point */}
                            {index === 0 && (
                                <p className='text-xs text-green-600'>📍 Start Point</p>
                            )}
                            {loc.notes && <p className='text-xs text-gray-500 mt-1'>{loc.notes}</p>}
                            {loc.visitDate && (
                                <p className='text-xs text-gray-400'>
                                    {new Date(loc.visitDate).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Polyline — connects all markers in order */}
            {locations.length > 1 && (
                <Polyline
                    positions={polylinePoints}
                    color='blue'
                    weight={3}
                    opacity={0.7}
                    dashArray='8'  // dashed line looks better
                />
            )}

        </MapContainer>
    )
}