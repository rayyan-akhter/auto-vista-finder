
import { useState } from "react";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Info, Car as CarIcon } from "lucide-react";
import { useCars } from "@/context/CarContext";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isCarInWishlist, addCarToWishlist, removeCarFromWishlist } = useCars();
  const isInWishlist = isCarInWishlist(car.id);
  const [imageError, setImageError] = useState(false);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeCarFromWishlist(car.id);
    } else {
      addCarToWishlist(car.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 h-full flex flex-col animate-fade-in rounded-xl">
        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-b border-slate-200 dark:border-slate-700">
          {!imageError ? (
            <img 
              src={car.imageUrl} 
              alt={`${car.brand} ${car.model}`} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-800">
              <div className="bg-white dark:bg-slate-700 p-4 rounded-full mb-3">
                <CarIcon className="h-14 w-14 text-carblue dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{car.brand} {car.model}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-3 right-3 rounded-full backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 shadow-sm ${
              isInWishlist ? "text-carred" : "text-slate-600 dark:text-slate-300"
            }`}
            onClick={toggleWishlist}
          >
            <Heart className={isInWishlist ? "fill-carred" : ""} size={18} />
          </Button>

          <Badge 
            variant={car.fuelType === "Electric" ? "default" : "outline"}
            className={`absolute top-3 left-3 ${car.fuelType === "Electric" ? "bg-green-500 hover:bg-green-600" : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"}`}
          >
            {car.fuelType}
          </Badge>
        </div>
        <CardContent className="pt-5 flex-1 px-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{car.brand} {car.model}</h3>
              <p className="text-muted-foreground text-sm">{car.year}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            <div className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">{car.transmission}</div>
            <div className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">{car.engineSize}</div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 text-xs px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md font-medium">+{car.color}</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2">
                <p className="text-sm">{car.seatingCapacity} seats, {car.color} color</p>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex justify-between items-center mt-auto">
            <p className="font-bold text-xl text-carblue dark:text-blue-400">{formatCurrency(car.price)}</p>
            <div className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600 dark:text-slate-300">{car.mileage.toLocaleString()} mi</div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 px-5 pb-5">
          <Button 
            variant="outline" 
            className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-all duration-200"
            onClick={() => setShowDetails(true)}
          >
            <Info className="mr-2 h-4 w-4" /> View Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[625px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl">
          <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            {!imageError ? (
              <img
                src={car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="bg-white dark:bg-slate-700 p-5 rounded-full mb-3">
                  <CarIcon className="h-20 w-20 text-carblue dark:text-blue-400" />
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{car.brand} {car.model}</p>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 rounded-full backdrop-blur-sm bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 shadow-sm ${
                isInWishlist ? "text-carred" : "text-slate-600 dark:text-slate-300"
              }`}
              onClick={toggleWishlist}
            >
              <Heart className={isInWishlist ? "fill-carred" : ""} size={18} />
            </Button>
          </div>
          
          <div className="p-6">
            <DialogHeader className="mb-5">
              <DialogTitle className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                {car.brand} {car.model} <Badge className="ml-2">{car.year}</Badge>
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                {car.description || `The ${car.year} ${car.brand} ${car.model} with ${car.mileage.toLocaleString()} miles, ${car.engineSize} engine, and ${car.transmission} transmission.`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Price</p>
                <p className="text-lg font-bold text-carblue dark:text-blue-400">{formatCurrency(car.price)}</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Mileage</p>
                <p className="text-base font-medium">{car.mileage.toLocaleString()} miles</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Fuel Type</p>
                <p className="text-base font-medium">{car.fuelType}</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Transmission</p>
                <p className="text-base font-medium">{car.transmission}</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Engine</p>
                <p className="text-base font-medium">{car.engineSize}</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Seating</p>
                <p className="text-base font-medium">{car.seatingCapacity} seats</p>
              </div>
              <div className="flex flex-col space-y-1 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg col-span-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Color</p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: car.color.toLowerCase() }}></div>
                  <p className="text-base font-medium">{car.color}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button
                variant={isInWishlist ? "destructive" : "default"}
                onClick={toggleWishlist}
                className={`w-full ${isInWishlist ? "bg-carred hover:bg-carred-light" : "bg-carblue dark:bg-blue-600 hover:bg-carblue/90 dark:hover:bg-blue-700"}`}
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? "fill-white" : ""}`} />
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarCard;
