export default function Button({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <button
      className={`bg-black rounded text-white w-full h-12 hover:bg-gray-800 ${className}`}
    >
      {text}
    </button>
  )
}
