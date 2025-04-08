
import { CarProvider } from "@/context/CarContext";
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
import CarCard from "@/components/CarCard";
import Pagination from "@/components/Pagination";
import { useCars } from "@/context/CarContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Car, CircleSlash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
            <Skeleton className="h-52 w-full rounded-xl" />
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
      <div className="flex flex-col items-center justify-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-full mb-4 shadow-md">
          <CircleSlash className="h-12 w-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-medium mb-2 text-slate-800 dark:text-slate-200">No cars found</h3>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Find Your Dream Car</h1>
            <p className="text-slate-600 dark:text-slate-300">Browse our selection of quality vehicles</p>
          </div>
          <Filters />
          <div className="mt-8">
            <CarGrid />
            <div className="mt-8">
              <Pagination />
            </div>
          </div>
        </main>
        <footer className="border-t py-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <Car className="h-5 w-5 text-carblue dark:text-blue-400 mr-2" />
                <span className="font-medium text-slate-800 dark:text-white">Auto Vista Finder</span>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                © 2025 Auto Vista Finder. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CarProvider>
  );
};

export default Index;
