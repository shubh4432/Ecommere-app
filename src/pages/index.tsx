import React, { useState } from 'react';
import Products from '@/components/Products';
import Header from '@/components/Header';

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

type Props = {
  products: Product[];
};

const Home: React.FC<Props> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  return (
    <>
      <Header products={products} setFilteredProducts={setFilteredProducts} />
      <main className={`flex min-h-screen flex-col items-center justify-between p-10 px-24`}>
        <Products filteredProducts={filteredProducts} />
      </main>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  console.log(data, "products from getStaticProps");

  return {
    props: {
      products: data,
    },
  };
}

export default Home;
