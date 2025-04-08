
import { useState } from "react";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Info } from "lucide-react";
import { useCars } from "@/context/CarContext";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { isCarInWishlist, addCarToWishlist, removeCarFromWishlist } = useCars();
  const isInWishlist = isCarInWishlist(car.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeCarFromWishlist(car.id);
    } else {
      addCarToWishlist(car.id);
    }
  };

  return (
    <>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg animate-fade-in">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={car.imageUrl} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white ${
              isInWishlist ? "text-carred" : "text-gray-600"
            }`}
            onClick={toggleWishlist}
          >
            <Heart className={isInWishlist ? "fill-carred" : ""} size={18} />
          </Button>
        </div>
        <CardContent className="pt-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
              <p className="text-muted-foreground text-sm">{car.year}</p>
            </div>
            <Badge variant={car.fuelType === "Electric" ? "default" : "outline"}>
              {car.fuelType}
            </Badge>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="font-bold text-lg text-carblue">{formatCurrency(car.price)}</p>
            <div className="text-sm text-muted-foreground">{car.seatingCapacity} seats</div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowDetails(true)}
          >
            <Info className="mr-2 h-4 w-4" /> View Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{car.brand} {car.model} ({car.year})</DialogTitle>
            <DialogDescription>
              {car.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="relative h-56 overflow-hidden rounded-md">
              <img
                src={car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Price</p>
                <p className="text-lg font-bold text-carblue">{formatCurrency(car.price)}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Mileage</p>
                <p>{car.mileage.toLocaleString()} miles</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Fuel Type</p>
                <p>{car.fuelType}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Transmission</p>
                <p>{car.transmission}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Engine</p>
                <p>{car.engineSize}</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Seating Capacity</p>
                <p>{car.seatingCapacity} seats</p>
              </div>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Color</p>
                <p>{car.color}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant={isInWishlist ? "destructive" : "default"}
                onClick={toggleWishlist}
                className={isInWishlist ? "bg-carred hover:bg-carred-light" : ""}
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
