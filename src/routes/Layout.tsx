import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">Poké'Tap</div>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="hover:text-gray-400">Accueil</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">À Propos</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Content */}
            <main className="flex-1">
                <div className="container mx-auto py-8">
                  <Outlet />{/* Children passés ici */}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    &copy; 2024 Mon Site. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
