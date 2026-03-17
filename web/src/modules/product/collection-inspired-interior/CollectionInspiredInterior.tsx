"use client"

export default function CollectionInspiredInterior() {
  return (
    <section className="mt-24 lg:mt-48">
      <h1 className="text-2xl lg:text-5xl font-medium mb-6">
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
        className="lg:w-screen lg:max-w-none lg:-mx-20 my-8 lg:my-20"
      />
      <div className="flex flex-col lg:flex-row lg:gap-28">
        <img
          src="/images/CollectionInspiredInterior3.png"
          alt="sofa name"
          className="w-64 lg:w-5/12"
        />
        <div className="w-full lg:w-7/12">
          <h1 className="text-2xl lg:text-5xl lg:leading-normal font-medium mt-8 lg:mt-20 mb-8 lg:mb-6 lg:pr-20">
            The Paloma Haven sofa is a masterpiece of minimalism and luxury.
          </h1>
          <a href="" className="lg:text-2xl underline">
            See more out of 'Modern Luxe' collection
          </a>
        </div>
      </div>
    </section>
  )
}
