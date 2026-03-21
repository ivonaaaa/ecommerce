export default function Button({
  text,
  className,
  onClick,
  disabled,
}: {
  text: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {
  return (
    <button
      className={`bg-black rounded text-white w-full h-12 hover:bg-gray-800 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}
