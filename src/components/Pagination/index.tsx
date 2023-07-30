import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];

    for (let page = 1; page <= totalPages; page++) {
      paginationItems.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${
            page === currentPage
              ? 'bg-purple-500 text-white'
              : 'bg-white text-purple-600'
          } border border-purple-500 px-4 py-2 rounded-md mx-1 font-medium focus:outline-none`}
        >
          {page}
        </button>
      );
    }

    return paginationItems;
  };

  return (
    <div className="flex justify-center mt-8">
      {renderPaginationItems()}
    </div>
  );
};

export default Pagination;
