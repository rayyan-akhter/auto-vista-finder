
import { Car, FilterOptions } from "@/types/car";

// Mock car data
const carData: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 32000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.5L",
    seatingCapacity: 5,
    color: "Silver",
    description: "The Toyota Camry is a stylish midsize sedan known for its reliability, comfort, and fuel efficiency.",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070"
  },
  {
    id: 2,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 28000,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "1.5L",
    seatingCapacity: 5,
    color: "Blue",
    description: "The Honda Civic is a compact car known for its reliability, fuel efficiency, and sporty design.",
    imageUrl: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2072"
  },
  {
    id: 3,
    brand: "Ford",
    model: "F-150",
    year: 2021,
    price: 45000,
    mileage: 15000,
    fuelType: "Diesel",
    transmission: "Automatic",
    engineSize: "3.5L",
    seatingCapacity: 6,
    color: "Black",
    description: "The Ford F-150 is a versatile pickup truck with impressive towing capacity and advanced technology features.",
    imageUrl: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1974"
  },
  {
    id: 4,
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 65000,
    mileage: 10000,
    fuelType: "Diesel",
    transmission: "Automatic",
    engineSize: "3.0L",
    seatingCapacity: 5,
    color: "White",
    description: "The BMW X5 is a luxurious SUV with powerful performance, elegant design, and advanced technology features.",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070"
  },
  {
    id: 5,
    brand: "Mercedes",
    model: "E-Class",
    year: 2023,
    price: 70000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    seatingCapacity: 5,
    color: "Silver",
    description: "The Mercedes E-Class is a luxury sedan with elegant design, advanced technology, and exceptional comfort.",
    imageUrl: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d87?q=80&w=2070"
  },
  {
    id: 6,
    brand: "Audi",
    model: "Q7",
    year: 2022,
    price: 75000,
    mileage: 12000,
    fuelType: "Diesel",
    transmission: "Automatic",
    engineSize: "3.0L",
    seatingCapacity: 7,
    color: "Black",
    description: "The Audi Q7 is a spacious SUV with elegant design, advanced technology, and exceptional driving dynamics.",
    imageUrl: "https://images.unsplash.com/photo-1606664913290-871f24bfeb2d?q=80&w=2070"
  },
  {
    id: 7,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 60000,
    mileage: 3000,
    fuelType: "Electric",
    transmission: "Automatic",
    engineSize: "Electric",
    seatingCapacity: 5,
    color: "Red",
    description: "The Tesla Model 3 is an electric sedan with impressive range, minimalist design, and cutting-edge technology.",
    imageUrl: "https://images.unsplash.com/photo-1562215984-3fcc8e06b5bc?q=80&w=2070"
  },
  {
    id: 8,
    brand: "Volkswagen",
    model: "Golf",
    year: 2022,
    price: 30000,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Manual",
    engineSize: "1.4L",
    seatingCapacity: 5,
    color: "Blue",
    description: "The Volkswagen Golf is a versatile hatchback with sporty design, comfortable interior, and enjoyable driving dynamics.",
    imageUrl: "https://images.unsplash.com/photo-1621177174891-ca3711ebe6a6?q=80&w=2070"
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 35000,
    mileage: 6000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.6L",
    seatingCapacity: 5,
    color: "Green",
    description: "The Hyundai Tucson is a stylish compact SUV with modern design, comfortable ride, and advanced safety features.",
    imageUrl: "https://images.unsplash.com/photo-1665098454053-35356ca54711?q=80&w=2070"
  },
  {
    id: 10,
    brand: "Kia",
    model: "Telluride",
    year: 2022,
    price: 45000,
    mileage: 12000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "3.8L",
    seatingCapacity: 8,
    color: "Dark Blue",
    description: "The Kia Telluride is a spacious SUV with bold design, luxurious interior, and impressive technology features.",
    imageUrl: "https://images.unsplash.com/photo-1662484503359-c7f847d42253?q=80&w=2070"
  },
  {
    id: 11,
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    price: 38000,
    mileage: 10000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "2.5L",
    seatingCapacity: 5,
    color: "Silver",
    description: "The Toyota RAV4 is a versatile SUV with rugged design, efficient hybrid powertrain, and advanced safety features.",
    imageUrl: "https://images.unsplash.com/photo-1568844293986-ca313578383b?q=80&w=2069"
  },
  {
    id: 12,
    brand: "Honda",
    model: "CR-V",
    year: 2023,
    price: 36000,
    mileage: 7000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "1.5L",
    seatingCapacity: 5,
    color: "Gray",
    description: "The Honda CR-V is a reliable SUV with spacious interior, fuel-efficient engine, and comfortable ride quality.",
    imageUrl: "https://images.unsplash.com/photo-1645521280633-ac2fb8307f69?q=80&w=2005"
  },
  {
    id: 13,
    brand: "BMW",
    model: "3 Series",
    year: 2022,
    price: 55000,
    mileage: 9000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    seatingCapacity: 5,
    color: "Black",
    description: "The BMW 3 Series is a sporty sedan with dynamic performance, luxurious interior, and cutting-edge technology.",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069"
  },
  {
    id: 14,
    brand: "Tesla",
    model: "Model Y",
    year: 2023,
    price: 65000,
    mileage: 4000,
    fuelType: "Electric",
    transmission: "Automatic",
    engineSize: "Electric",
    seatingCapacity: 5,
    color: "White",
    description: "The Tesla Model Y is a versatile electric SUV with impressive range, minimalist design, and advanced autopilot features.",
    imageUrl: "https://images.unsplash.com/photo-1619976316249-0f63bb72cd1c?q=80&w=2033"
  },
  {
    id: 15,
    brand: "Ford",
    model: "Mustang",
    year: 2022,
    price: 50000,
    mileage: 8000,
    fuelType: "Petrol",
    transmission: "Manual",
    engineSize: "5.0L",
    seatingCapacity: 4,
    color: "Red",
    description: "The Ford Mustang is an iconic sports car with powerful V8 engine, aggressive styling, and thrilling driving experience.",
    imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=2070"
  },
  {
    id: 16,
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 48000,
    mileage: 6000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    seatingCapacity: 5,
    color: "Blue",
    description: "The Audi A4 is a refined sedan with elegant design, premium interior, and balanced performance characteristics.",
    imageUrl: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?q=80&w=1974"
  },
  {
    id: 17,
    brand: "Mercedes",
    model: "GLC",
    year: 2022,
    price: 58000,
    mileage: 11000,
    fuelType: "Diesel",
    transmission: "Automatic",
    engineSize: "2.0L",
    seatingCapacity: 5,
    color: "Silver",
    description: "The Mercedes GLC is a luxurious compact SUV with sophisticated design, premium materials, and advanced safety features.",
    imageUrl: "https://images.unsplash.com/photo-1567899856530-66d7dc7f3a4c?q=80&w=2070"
  },
  {
    id: 18,
    brand: "Volkswagen",
    model: "Tiguan",
    year: 2023,
    price: 40000,
    mileage: 5000,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "2.0L",
    seatingCapacity: 5,
    color: "White",
    description: "The Volkswagen Tiguan is a refined SUV with elegant styling, quality interior, and composed driving dynamics.",
    imageUrl: "https://images.unsplash.com/photo-1634839108271-40661ada1ba6?q=80&w=2031"
  },
  {
    id: 19,
    brand: "Hyundai",
    model: "Santa Fe",
    year: 2022,
    price: 42000,
    mileage: 9000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.6L",
    seatingCapacity: 7,
    color: "Gray",
    description: "The Hyundai Santa Fe is a family-friendly SUV with bold styling, efficient hybrid powertrain, and spacious interior.",
    imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070"
  },
  {
    id: 20,
    brand: "Kia",
    model: "Sorento",
    year: 2023,
    price: 43000,
    mileage: 7000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.6L",
    seatingCapacity: 7,
    color: "Black",
    description: "The Kia Sorento is a versatile SUV with striking design, hybrid efficiency, and advanced technology features.",
    imageUrl: "https://images.unsplash.com/photo-1642449033781-28975cc58043?q=80&w=1932"
  }
];

// Function to simulate API fetch with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCars = async (filters: FilterOptions): Promise<{ cars: Car[], totalCount: number }> => {
  await delay(800); // Simulate network delay
  
  let filteredCars = [...carData];
  
  // Apply filters
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }
  
  if (filters.minPrice > 0) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
  }
  
  if (filters.maxPrice < 200000) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
  }
  
  if (filters.fuelType) {
    filteredCars = filteredCars.filter(car => 
      car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
    );
  }
  
  if (filters.seatingCapacity > 0) {
    filteredCars = filteredCars.filter(car => 
      car.seatingCapacity === filters.seatingCapacity
    );
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(searchLower) || 
      car.model.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low-high':
        filteredCars.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredCars.sort((a, b) => b.price - a.price);
        break;
    }
  }
  
  const totalCount = filteredCars.length;
  
  // Apply pagination
  const carsPerPage = 10;
  const startIndex = (filters.page - 1) * carsPerPage;
  filteredCars = filteredCars.slice(startIndex, startIndex + carsPerPage);
  
  return { cars: filteredCars, totalCount };
};

export const getCarById = async (id: number): Promise<Car | null> => {
  await delay(500); // Simulate network delay
  const car = carData.find(car => car.id === id);
  return car || null;
};

// Local storage handlers for wishlist
export const getWishlist = (): number[] => {
  if (typeof window === 'undefined') return [];
  const wishlist = localStorage.getItem('car-wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (carId: number): number[] => {
  const wishlist = getWishlist();
  if (!wishlist.includes(carId)) {
    const newWishlist = [...wishlist, carId];
    localStorage.setItem('car-wishlist', JSON.stringify(newWishlist));
    return newWishlist;
  }
  return wishlist;
};

export const removeFromWishlist = (carId: number): number[] => {
  const wishlist = getWishlist();
  const newWishlist = wishlist.filter(id => id !== carId);
  localStorage.setItem('car-wishlist', JSON.stringify(newWishlist));
  return newWishlist;
};

export const getWishlistCars = async (): Promise<Car[]> => {
  const wishlistIds = getWishlist();
  const wishlistCars = carData.filter(car => wishlistIds.includes(car.id));
  return wishlistCars;
};
