import Link from "next/link";

export default function Input({
  labelId,
  value,
  onChange,
  children,
  type,
  required = false,
  link,
}) {
  return (
    <div>
      <label
        htmlFor={labelId}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {children}
      </label>
      <div className="mt-2">
        <input
          id={labelId}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          name={labelId}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        />
      </div>
      {link && (
        <div className="text-xs mt-2 text-gray-500">
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            href={link.linkUrl}
          >
            {link.linkText}
          </Link>
        </div>
      )}
    </div>
  );
}
