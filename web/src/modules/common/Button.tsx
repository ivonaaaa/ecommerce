export default function Button({
  text,
  className,
  onClick,
}: {
  text: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className={`bg-black rounded text-white w-full h-12 hover:bg-gray-800 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
