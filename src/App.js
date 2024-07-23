import React, { useState } from 'react';
import CarCounting from './CarCounting';
import Home from './Home';
import Why from './Why';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'carCounting':
        return <CarCounting navigateTo={setCurrentPage} />;
      case 'home':
        return <Home navigateTo={setCurrentPage} />;
      case 'why':
        return <Why navigateTo={setCurrentPage} />;
      default:
        return <Home navigateTo={setCurrentPage} />; // Default page
    }
  };

  return (
    <div className="App">
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('cae.jpg')", backgroundRepeat: 'no-repeat', height: '100vg'}}>
        <div className="absolute inset-0" style={{backgroundColor:'rgba(58, 26, 89, 0.36)'}}></div>
        <div className="relative z-10 text-white text-center w-screen h-screen">
          <header style={{height:'10%'}}>
            <nav style={{height: '100%'}}>
            <div className="max-full relative z-10 flex flex-wrap items-center bg-black justify-between mx-auto p-4 px-6">
              <button onClick={() => setCurrentPage('home')} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="whitelogo.png" className="h-12" alt="CO2 Logo"/>
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CO2 Detector</span>
              </button>
              <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none" aria-controls="navbar-default" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="gray-200" viewBox="0 0 17 14">
                      <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                  </svg>
              </button>
              <div className="hidden h-full w-full md:block md:w-auto mt-1 rounded md:bg-transparent bg-black" id="navbar-default">
                <ul className="text-2xl font-medium flex flex-col p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900">
                  <button className="text-white text-left hover:text-gray-400" onClick={() => setCurrentPage('home')}>Home</button>
                  <button className='text-white text-left hover:text-gray-400' onClick={() => setCurrentPage('why')}>Why it Matters</button>
                  <button className='text-white text-left hover:text-gray-400' onClick={() => setCurrentPage('carCounting')}>Start Detecting</button>
                </ul>
              </div>
            </div>
            </nav>
          </header>
          <main style={{height:'90%'}}>
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
