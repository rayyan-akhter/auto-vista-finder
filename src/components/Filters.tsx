
import { useEffect, useState } from "react";
import { useCars } from "@/context/CarContext";
import { brands, fuelTypes, seatingCapacities } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";
import { FilterX, Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Filters = () => {
  const { filters, setFilters, resetFilters, totalCars } = useCars();
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.minPrice, filters.maxPrice]);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchTerm });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const applyPriceFilter = () => {
    setFilters({ minPrice: priceRange[0], maxPrice: priceRange[1] });
  };

  useEffect(() => {
    // Reset local state when filters are reset
    if (filters.minPrice === 0 && filters.maxPrice === 200000) {
      setPriceRange([0, 200000]);
    }
    if (filters.search === "") {
      setSearchTerm("");
    }
  }, [filters]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Select
          value={filters.brand || ""}
          onValueChange={(value) => setFilters({ brand: value })}
        >
          <SelectTrigger id="brand">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="pt-4">
          <Slider
            defaultValue={[0, 200000]}
            value={[priceRange[0], priceRange[1]]}
            max={200000}
            step={1000}
            onValueChange={handlePriceChange}
            onValueCommit={applyPriceFilter}
            className="mb-6"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{formatCurrency(priceRange[0])}</span>
            <span className="text-muted-foreground">{formatCurrency(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fuelType">Fuel Type</Label>
        <Select
          value={filters.fuelType || ""}
          onValueChange={(value) => setFilters({ fuelType: value })}
        >
          <SelectTrigger id="fuelType">
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Fuel Types</SelectItem>
            {fuelTypes.map((fuel) => (
              <SelectItem key={fuel} value={fuel}>
                {fuel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seatingCapacity">Seating Capacity</Label>
        <Select
          value={filters.seatingCapacity ? String(filters.seatingCapacity) : ""}
          onValueChange={(value) => setFilters({ seatingCapacity: value ? Number(value) : 0 })}
        >
          <SelectTrigger id="seatingCapacity">
            <SelectValue placeholder="Any Capacity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Capacity</SelectItem>
            {seatingCapacities.map((seats) => (
              <SelectItem key={seats} value={String(seats)}>
                {seats} Seats
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={filters.sortBy || ""}
          onValueChange={(value) => setFilters({ sortBy: value })}
        >
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Default</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={resetFilters}
          className="flex items-center"
        >
          <FilterX className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        {isMobile && (
          <Button onClick={() => setIsFiltersOpen(false)}>
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">Available Cars</h2>
          <span className="ml-2 text-sm text-muted-foreground">
            ({totalCars} results)
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative flex-1 md:flex-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full"
            />
          </form>
          
          {isMobile ? (
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="hidden md:block md:w-64">
              <FilterContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
