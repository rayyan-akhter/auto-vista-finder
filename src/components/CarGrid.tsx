
import { useCars } from "@/context/CarContext";
import CarCard from "@/components/CarCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CircleSlash } from "lucide-react";

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

export default CarGrid;
