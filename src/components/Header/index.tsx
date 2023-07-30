import React, { useEffect, useState, useRef } from "react";

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
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const Header: React.FC<Props> = ({ products, setFilteredProducts }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const autoplayInterval = 5000; // Autoplay interval in milliseconds (5 seconds)

  const images = [
    { id: 1, url: "/ecommerce-1.jpg" },
    { id: 2, url: "/ecommerce-2.jpg" },
    { id: 3, url: "/ecommerce-3.jpg" },
  ];

  // Fetch categories from the API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(["All", ...data]))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Filter and sort products based on selected category and search term
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      if (selectedCategory === "All" && searchTerm === "") return true;
      if (selectedCategory === "All") {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (searchTerm === "") {
        return product.category === selectedCategory;
      }
      return (
        product.category === selectedCategory &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Sort the filtered products by ID (you can customize the sorting logic here)
    filteredProducts.sort((a, b) => a.id - b.id);

    setFilteredProducts(filteredProducts);
  }, [selectedCategory, searchTerm, products, setFilteredProducts]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (typeof window !== "undefined") {
      intervalId = setInterval(handleNextImage, autoplayInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const currentImageUrl = images[currentImageIndex].url;

  // Ref to the dropdown container to detect clicks inside/outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="h-[600px] w-full  text-white text-2xl font-bold text-shadow-lg relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${currentImageUrl})` }}
    >
      <h1 className="flex justify-center items-center py-10 text-5xl">
        Eflyer
      </h1>
      <div className="w-full max-w-screen-lg mx-auto flex items-center justify-around px-4 sm:px-8 md:px-16 lg:px-60">
        {/* Left Arrow */}
        <button
          className="text-white text-3xl focus:outline-none absolute left-8 top-1/2 transform -translate-y-1/2"
          onClick={handlePrevImage}
        >
          &lt;
        </button>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <div>
            <span className="rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-black text-sm font-medium text-white focus:outline-none"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedCategory}{" "}
                <i
                  className={`ml-2 fas ${
                    isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
                  }`}
                ></i>
              </button>
            </span>
          </div>
          {isDropdownOpen &&
            categories.length > 0 && ( // Show dropdown content only if it's open
              <div
                className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >
                {categories.map((category) => (
                  <span
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false); // Close the dropdown after selecting a category
                    }}
                    className="block px-4 py-2 text-white text-sm hover:bg-gray-700 cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          <i
            className={`absolute top-0 right-0 mt-2 mr-2 text-white fas ${
              isDropdownOpen ? "fa-caret-up" : "fa-caret-down"
            }`}
            style={{ pointerEvents: "none" }}
          ></i>
        </div>
        <div className="relative flex">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Right Arrow */}
        <button
          className="text-white text-3xl focus:outline-none absolute right-8 top-1/2 transform -translate-y-1/2"
          onClick={handleNextImage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Header;
