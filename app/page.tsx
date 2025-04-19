// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import bgImg from "../assets/bg-image.png";

export default function HomePage() {
  return (
    <section className="fixed top-16 left-0 right-0 bottom-0 overflow-hidden bg-white text-black p-3 pt-0">
      {/* Container untuk gambar dan overlay */}
      <div className="relative h-full w-full rounded-3xl overflow-hidden">
        {/* Background Hero Image */}
        <Image
          src={bgImg}
          alt="Hero Image"
          fill
          className="object-cover object-center z-0"
          priority
        />

        {/* Overlay gradient hanya untuk gambar */}
        <div className="absolute inset-0 bg-black/50 z-1" />

        {/* Main Text */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-20 max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4 text-white font-bricolage ">
            Shoping Without Limits
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-8 text-white">
            Revolutionize your shopping experience with smart technology that
            adapts to your lifestyle.
          </p>
          <Link
            href="/products"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold w-fit hover:bg-gray-200 transition "
          >
            Explore All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
