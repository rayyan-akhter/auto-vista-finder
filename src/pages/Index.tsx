
import { CarProvider } from "@/context/CarContext";
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { useCars } from "@/context/CarContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Car } from "lucide-react";

const CarGrid = () => {
  const { cars, loading, error } = useCars();

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Car className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No cars found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your filters or search term to find the perfect car for you.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

const Index = () => {
  return (
    <CarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <Filters />
          <CarGrid />
          <Pagination />
        </main>
        <footer className="border-t py-6">
          <div className="container flex justify-center text-sm text-muted-foreground">
            © 2025 Auto Vista Finder. All rights reserved.
          </div>
        </footer>
      </div>
    </CarProvider>
  );
};

export default Index;
