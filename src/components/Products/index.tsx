import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type Props = {
  filteredProducts: Product[];
};

const Products: React.FC<Props> = ({ filteredProducts }) => {
  const itemsPerPage = 9; // Number of products to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <h1 className='text-black text-6xl font-bold pb-8'> Man & Woman Fashion</h1>
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product: Product) => (
          <ProductCard
            rating={{
              rate: 0,
              count: 0,
            }}
            key={product.id}
            {...product}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Products;
