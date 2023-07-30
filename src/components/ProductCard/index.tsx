import React from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const starElements = [];
  for (let i = 0; i < filledStars; i++) {
    starElements.push(<span key={i} className="text-yellow-500">&#9733;</span>);
  }
  if (hasHalfStar) {
    starElements.push(<span key={filledStars} className="text-yellow-500">&#9733;</span>);
  }
  for (let i = starElements.length; i < 5; i++) {
    starElements.push(<span key={i} className="text-gray-400">&#9733;</span>);
  }

  return <div>{starElements}</div>;
};

const ProductCard: React.FC<Product> = ({ title, price, category, image, rating }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
      <div className="relative h-96">
        <Image src={image} alt={title} fill={true} objectFit="contain" objectPosition="start" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <Rating rating={rating.rate} />
        <div className="flex items-center justify-between mt-2">
          <div className="bg-purple-500 rounded-full px-3 py-1 text-white text-sm font-bold">{category}</div>
          <p className="text-purple-600 text-lg font-bold">{price}$</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
