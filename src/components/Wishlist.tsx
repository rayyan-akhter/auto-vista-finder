
import { useCars } from "@/context/CarContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/utils";
import { Heart, Trash2, X } from "lucide-react";

const Wishlist = () => {
  const { wishlistCars, removeCarFromWishlist } = useCars();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Heart className="mr-2 h-4 w-4" />
          Wishlist
          {wishlistCars.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-carred text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {wishlistCars.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" /> My Wishlist
          </SheetTitle>
        </SheetHeader>
        
        {wishlistCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Add cars to your wishlist to keep track of your favorite vehicles
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[70vh] mt-6 pr-4">
            <div className="space-y-4">
              {wishlistCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-start space-x-4 p-3 rounded-md border"
                >
                  <div className="h-16 w-20 relative flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={car.imageUrl}
                      alt={`${car.brand} ${car.model}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium">
                      {car.brand} {car.model}
                    </h4>
                    <p className="text-xs text-muted-foreground">{car.year}</p>
                    <p className="text-sm font-semibold mt-1">
                      {formatCurrency(car.price)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCarFromWishlist(car.id)}
                    className="text-carred hover:text-carred/90 hover:bg-carred-light/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        
        <SheetFooter className="mt-4">
          {wishlistCars.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Total: {wishlistCars.length} car{wishlistCars.length > 1 ? 's' : ''}
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Wishlist;
