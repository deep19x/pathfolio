export default function Input({
    type = "text",
    placeholder,
    name,
    onChange,
    value,
    label,
}) {
    return (
        <div className="flex flex-col space-y-2">
            <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                className="
          w-full
          px-4 py-3
          rounded-lg
          border border-gray-300
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
          focus:border-indigo-500
          transition duration-200
        "
            />
        </div>
    );
}