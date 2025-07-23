export default function Button({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}
