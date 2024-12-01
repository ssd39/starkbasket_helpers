import React from 'react';
import { Link } from 'react-router';

const App = () => {
  const routes = [
    { path: "/", label: "Home" },
    { path: "/create-token", label: "Create Token" },
    { path: "/create-basket-factory", label: "Create Basket Factory" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Routes</h1>
      <ul className="space-y-4">
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className="text-lg text-blue-600 hover:underline hover:text-blue-800"
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
