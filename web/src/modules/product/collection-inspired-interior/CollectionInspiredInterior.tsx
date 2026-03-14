"use client"

export default function CollectionInspiredInterior() {
  return (
    <section className="mt-20 lg:mt-48">
      <h1 className="text-3xl lg:text-5xl font-medium mb-6">
        Collection Inspired Interior
      </h1>
      <img
        src="/images/CollectionInspiredInterior1.png"
        alt="sofa name"
        className="w-full"
      />
      <img
        src="/images/CollectionInspiredInterior2.png"
        alt="sofa name"
        className="w-screen max-w-none -mx-24 lg:my-20"
      />
      <div className="flex flex-col lg:flex-row lg:gap-28">
        <img
          src="/images/CollectionInspiredInterior3.png"
          alt="sofa name"
          className="w-full lg:w-5/12"
        />
        <div className="w-full lg:w-7/12">
          <h1 className="text-3xl lg:text-5xl lg:leading-normal font-medium mt-20 mb-6 pr-20">
            The Paloma Haven sofa is a masterpiece of minimalism and luxury.
          </h1>
          <a href="" className="text-lg lg:text-2xl underline">
            See more out of 'Modern Luxe' collection
          </a>
        </div>
      </div>
    </section>
  )
}
