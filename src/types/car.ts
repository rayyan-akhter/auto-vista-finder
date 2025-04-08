
export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  seatingCapacity: number;
  color: string;
  description: string;
  imageUrl: string;
}

export interface FilterOptions {
  brand: string;
  minPrice: number;
  maxPrice: number;
  fuelType: string;
  seatingCapacity: number;
  search: string;
  sortBy: string;
  page: number;
}

export const initialFilterOptions: FilterOptions = {
  brand: "",
  minPrice: 0,
  maxPrice: 200000,
  fuelType: "",
  seatingCapacity: 0,
  search: "",
  sortBy: "",
  page: 1
};

export const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
export const seatingCapacities = [2, 4, 5, 6, 7, 8];
export const brands = [
  "Toyota", "Honda", "Ford", "BMW", "Mercedes", 
  "Audi", "Volkswagen", "Tesla", "Hyundai", "Kia"
];
