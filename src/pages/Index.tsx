
import { CarProvider } from "@/context/CarContext";
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
import CarGrid from "@/components/CarGrid";
import Pagination from "@/components/Pagination";
import { Car } from "lucide-react";

const Index = () => {
  return (
    <CarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">Find Your Dream Car</h1>
            <p className="text-slate-600 dark:text-slate-300">Browse our selection of quality vehicles</p>
            
            {/* New image section */}
            <div className="mt-6 mb-8">
              <img 
                src="/placeholder.svg" 
                alt="Dream Car" 
                className="mx-auto max-w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
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

