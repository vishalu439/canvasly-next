import Link from "next/link";
import Image from "next/image";

export default function ProductCard({
  id,
  name,
  slug,
  image,
  price,
  mockup,
  customUpload,
  uploadText
}) {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all p-3 bg-white">

      <Link href={`/products/${slug}`} className="block">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="rounded-xl object-cover w-full h-60"
        />
      </Link>

      <div className="mt-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-pink-600 font-semibold">₹{price}</p>

        {/* Optional: show "Customizable" badge */}
        {customUpload && (
          <p className="text-xs text-gray-500 mt-1">✨ Customizable Product</p>
        )}
      </div>

      <a
        href={`https://wa.me/917619538167?text=Hi, I want to order ${encodeURIComponent(
          name
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block bg-pink-500 text-white text-center py-2 rounded-xl font-medium"
      >
        Order on WhatsApp
      </a>
    </div>
  );
}
