import { useState, useEffect } from "react";
import { Pencil, Trash2, MapPin } from "lucide-react";

export default function LocationCard({ loc, onEdit, onDelete }) {
    const [index, setIndex] = useState(0);

    const images = loc.images?.length
        ? loc.images.map(img => img.url)
        : [
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
        ];

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer transition hover:shadow-lg">

            {/* IMAGE */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={images[index]}
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e";
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent "></div>

                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-3">

                    <div className="flex gap-2 w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(loc);
                            }}
                            className="flex-1 bg-blue-500 text-white text-xs py-1 rounded"
                        >
                            <Pencil size={14} className="mx-auto" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(loc._id);
                            }}
                            className="flex-1 bg-red-500 text-white text-xs py-1 rounded"
                        >
                            <Trash2 size={14} className="mx-auto" />
                        </button>
                    </div>

                </div>
            </div>

            {/* DETAILS */}
            <div className="p-3 space-y-1">
                <h2 className="font-semibold text-gray-800 truncate">
                    {loc.placeName}
                </h2>

                <p className="text-xs text-gray-500">
                    {loc.visitDate &&
                        new Date(loc.visitDate).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400 line-clamp-2">
                    {loc.notes || "No notes"}
                </p>

                <p className="text-sm font-medium">₹{loc.expense || 0}</p>
            </div>
        </div>
    );
}