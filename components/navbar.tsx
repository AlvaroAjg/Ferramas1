   

    import Link from "next/link";
    import { ShoppingCart } from "lucide-react";
import UserDisplay from "@/components/UserDisplay";

    export default function Navbar() {
    return (
        <nav className="bg-gray-300 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
            
            
            <Link href="/" className="text-3xl font-extrabold text-red-600">
            Ferramas
            </Link>

           
            <div className="flex items-center space-x-6">
            
            <UserDisplay />

            <Link href="/carrito">
                <button className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                <ShoppingCart size={20} className="mr-2" />
                Carrito
                </button>
            </Link>

            

            </div>
        </div>
        </nav>
    );
    }
