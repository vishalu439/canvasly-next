"use client";

import { use, useState } from "react";
import Image from "next/image";
import { products } from "@/data/product";
import { useCart } from "@/components/context/CartContext";

export default function ProductPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { addToCart } = useCart();
  const product = products.find((p) => p.slug === slug);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div className="p-10 text-center text-2xl font-semibold">
        Product not found ❌
      </div>
    );
  }

  // -----------------------
  // FILE UPLOAD HANDLER
  // -----------------------
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setError("File too large! Max 15MB allowed.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage({ file, preview: imageUrl });
    setError("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* ---------------------
           LEFT — MOCKUP + PREVIEW
        --------------------- */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-xl bg-white">

            {/* Mockup Background */}
            <Image
              src={product.mockup}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-contain"
            />

            {/* Customer Uploaded Image Preview */}
            {uploadedImage && (
              <div
                className="absolute"
                style={{
                  left: `${product.mockupArea.x * 100}%`,
                  top: `${product.mockupArea.y * 100}%`,
                  width: `${product.mockupArea.width * 100}%`,
                  height: `${product.mockupArea.height * 100}%`,
                }}
              >
                <Image
                  src={uploadedImage.preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md shadow"
                />
              </div>
            )}

          </div>
        </div>

        {/* ---------------------
           RIGHT CONTENT
        --------------------- */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-pink-600 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            {product.uploadText}
          </p>

          {/* --------------------
              UPLOAD BOX
          -------------------- */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 mb-8 bg-gray-50 hover:bg-gray-100 transition">
            <h2 className="text-lg font-semibold mb-3">Upload Your Photo</h2>

            {!uploadedImage ? (
              <label className="cursor-pointer flex flex-col items-center text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="text-gray-500">
                  📸 <br />
                  <span className="text-sm">Click to upload or drop file</span>
                </div>
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              </label>
            ) : (
              <div className="relative">
                <Image
                  src={uploadedImage.preview}
                  width={300}
                  height={300}
                  alt="Uploaded preview"
                  className="rounded-lg shadow-md"
                />
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded"
                  onClick={() => setUploadedImage(null)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* --------------------
              CART BUTTON
          -------------------- */}
          <button
            disabled={!uploadedImage}
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                mockup: product.mockup,
                mockupArea: product.mockupArea,
                customImage: uploadedImage,
              })
            }
            className={`text-lg py-3 rounded-xl shadow-lg font-semibold transition-all ${
              uploadedImage
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            🛒 Add to Cart
          </button>

          {/* --------------------
              WHATSAPP BUTTON
          -------------------- */}
          <a
            href={`https://wa.me/917619538167?text=Hi, I want to order ${encodeURIComponent(
              product.name
            )}`}
            target="_blank"
            className="mt-4 bg-green-600 text-white text-lg py-3 rounded-xl text-center shadow-lg hover:bg-green-700 transition-all font-semibold"
          >
            💬 Order on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
