
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Car, FilterOptions, initialFilterOptions } from "@/types/car";
import { fetchCars, getWishlist, addToWishlist, removeFromWishlist, getWishlistCars } from "@/services/carService";
import { useToast } from "@/components/ui/use-toast";

interface CarContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  totalCars: number;
  wishlist: number[];
  wishlistCars: Car[];
  addCarToWishlist: (carId: number) => void;
  removeCarFromWishlist: (carId: number) => void;
  isCarInWishlist: (carId: number) => boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<FilterOptions>(initialFilterOptions);
  const [totalCars, setTotalCars] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistCars, setWishlistCars] = useState<Car[]>([]);
  const { toast } = useToast();

  // Load cars based on filters
  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);
        const { cars: fetchedCars, totalCount } = await fetchCars(filters);
        setCars(fetchedCars);
        setTotalCars(totalCount);
      } catch (err) {
        setError("Failed to load cars. Please try again later.");
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [filters]);

  // Load wishlist from localStorage
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = getWishlist();
        setWishlist(savedWishlist);
        
        if (savedWishlist.length > 0) {
          const wishlistCars = await getWishlistCars();
          setWishlistCars(wishlistCars);
        }
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };

    loadWishlist();
  }, []);

  const setFilters = (newFilters: Partial<FilterOptions>) => {
    // If changing filters other than page, reset to page 1
    if (Object.keys(newFilters).some(key => key !== 'page')) {
      setFiltersState(prev => ({ ...prev, ...newFilters, page: 1 }));
    } else {
      setFiltersState(prev => ({ ...prev, ...newFilters }));
    }
  };

  const resetFilters = () => {
    setFiltersState(initialFilterOptions);
  };

  const addCarToWishlist = (carId: number) => {
    const updatedWishlist = addToWishlist(carId);
    setWishlist(updatedWishlist);
    
    // Update wishlist cars
    const carToAdd = cars.find(car => car.id === carId);
    if (carToAdd) {
      setWishlistCars(prev => [...prev, carToAdd]);
      toast({
        title: "Added to Wishlist",
        description: `${carToAdd.brand} ${carToAdd.model} has been added to your wishlist.`,
      });
    }
  };

  const removeCarFromWishlist = (carId: number) => {
    const updatedWishlist = removeFromWishlist(carId);
    setWishlist(updatedWishlist);
    
    // Update wishlist cars
    const removedCar = wishlistCars.find(car => car.id === carId);
    setWishlistCars(prev => prev.filter(car => car.id !== carId));
    
    if (removedCar) {
      toast({
        title: "Removed from Wishlist",
        description: `${removedCar.brand} ${removedCar.model} has been removed from your wishlist.`,
      });
    }
  };

  const isCarInWishlist = (carId: number) => {
    return wishlist.includes(carId);
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        loading,
        error,
        filters,
        setFilters,
        resetFilters,
        totalCars,
        wishlist,
        wishlistCars,
        addCarToWishlist,
        removeCarFromWishlist,
        isCarInWishlist,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCars = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error("useCars must be used within a CarProvider");
  }
  return context;
};
