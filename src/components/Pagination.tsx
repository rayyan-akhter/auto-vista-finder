
import { Button } from "@/components/ui/button";
import { useCars } from "@/context/CarContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const { totalCars, filters, setFilters } = useCars();
  const carsPerPage = 10;
  const totalPages = Math.ceil(totalCars / carsPerPage);
  const currentPage = filters.page;

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    setFilters({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          className={i === currentPage ? "bg-carblue hover:bg-carblue-light" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-8 mb-4">
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageButtons()}

      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
