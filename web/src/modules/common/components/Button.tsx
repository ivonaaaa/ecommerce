export default function Button({ text }: { text: string }) {
  return (
    <button className="bg-black rounded text-white w-full h-12 hover:bg-gray-800">
      {text}
    </button>
  )
}
