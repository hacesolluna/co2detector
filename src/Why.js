const Why = ({ navigateTo }) => {
  
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('cae.jpg')"}}>
        <div className="absolute inset-0" style={{backgroundColor:'rgba(58, 26, 89, 0.36)'}}></div>
            <div className="relative flex flex-col items-center text-white text-center w-screen h-full p-5">
                {/* Body Text */}
                <h1 className="text-6xl tracking-wide font-semibold mt-8" tabIndex='0'>Why it Matters</h1>

                <div className="flex flex-wrap py-5 justify-center">
                    <div className="text-white mb-5 px-8 mx-2 py-5" style={{ maxWidth:'600px', border: 'solid white', backgroundColor: '#3C156350'}}>
                        <h2 className="text-4xl font-semibold mb-3" tabIndex='0'>Health Equity and Climate Change</h2>
                        <p className="text-xl text-left" tabIndex='0'><a className="underline text-purple-200 hover:text-white" href="https://www.forbes.com/sites/anuradhavaranasi/2022/10/29/real-time-air-quality-data-in-developing-countries-can-be-life-saving/" target="_blank">Many disadvantaged communities</a> currently bear the brunt of <a className="underline text-purple-200 hover:text-white" href="https://www.who.int/news-room/fact-sheets/detail/climate-change-and-health" target="_blank">climate-induced health risks</a> from: </p>
                        <ul className="text-left text-lg pl-5 list-disc">
                            <li tabIndex='0'>extreme heat</li>
                            <li tabIndex='0'>poor air quality</li>
                            <li tabIndex='0'>flooding</li>
                            <li tabIndex='0'>extreme weather events</li>
                            <li tabIndex='0'>vector borne diseases</li>
                        </ul>
                    </div>
                    <div className="text-white mb-5 mx-2 px-8 py-5" style={{ maxWidth: '600px', border: 'solid white', backgroundColor: '#3C156350'}}>
                        <h2 className="text-4xl font-semibold mb-3" tabIndex='0'>My Solution: CO2 Detector</h2>
                        <p className="text-xl text-left" tabIndex='0'>By tracking the CO2 level locally,</p>
                        <ul className="text-left text-lg pl-5 list-disc">
                            <li tabIndex='0'>governments and organizations can better target regions to install end-to-end pollution control systems and sustainable infrastructure</li>
                            <li tabIndex='0'>encourage individual awareness and conscious choices</li>
                        </ul> 
                        <p className="text-lg text-left" tabIndex='0'>*Using the fact that car mileage is almost proportional to CO2 emissions, the CO2 Detector Web App provides detailed CO2 emission insights through an AI model that tracks car count/minute.</p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-row mx-auto text-xl pb-10">
                    <button onClick={() => navigateTo('home')} type="button" className="bg-white text-black rounded-l-md border-r border-gray-500 py-2 hover:bg-purple-300 px-3">
                        <div className="flex flex-row align-middle">
                        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                        </svg>
                        <p className="ml-2">Prev: Return Home</p>
                        </div>
                    </button>
                    <button onClick={() => navigateTo('carCounting')} type="button" className="bg-white text-black rounded-r-md py-2 border-l border-gray-500 hover:bg-purple-300 px-3">
                        <div className="flex flex-row align-middle">
                        <span className="mr-2">Next: Start Detecting</span>
                        <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
  };
  
  export default Why;