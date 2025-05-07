"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-300 py-10 mt-12 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div>
          <h3 className="text-xl text-black font-bold mb-2">Ferramas</h3>
          <p className="text-sm text-black mb-4">Tu ferretería de confianza desde 1995</p>
          <ul className="text-sm space-y-2">
            <li className="text-black"><span className="font-semibold text-black">Dirección:</span> Av Grecia 123, Santiago, Chile</li>
            <li className="text-black"><span className="font-semibold text-black">Teléfono:</span> +56 9 1234 5678</li>
            <li className="text-black"><span className="font-semibold text-black">Email:</span> contacto@ferramas.cl</li>
          </ul>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-black hover:text-white transition">Inicio</a>
            
          </div>
        </div>

        
        <div>
          <h4 className=" text-black text-lg font-semibold mb-2">¿Dónde estamos?</h4>
          <div className="rounded overflow-hidden shadow-lg border border-gray-700">
            <iframe
              title="Ubicación Ferramas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.2515821763085!2d-70.64826982459765!3d-33.45694099715808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c59d271f13df%3A0xafea8c4f4c123f97!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1715019693859!5m2!1ses-419!2scl"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-black border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Ferramas. Todos los derechos reservados.
      </div>
    </footer>
  );
}
