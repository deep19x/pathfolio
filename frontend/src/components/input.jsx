export default function Input({
    type = "text",
    placeholder,
    label,
    error,
    ...props
}) {
    return (
        <div className="flex flex-col space-y-2">
            <label
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...props}
                className={`
                    w-full px-4 py-3 rounded-lg border
                    ${error ? "border-red-500" : "border-gray-300"}
                    focus:outline-none focus:ring-2
                    ${error ? "focus:ring-red-500" : "focus:ring-indigo-500"}
                    transition duration-200
                `}
            />

            
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}
        </div>
    );
}