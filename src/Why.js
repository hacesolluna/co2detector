const Why = ({ navigateTo }) => {
  
    return (
        <div className='flex flex-col items-center justify-start h-full p-5' style = {{marginTop: '5%'}}>
            {/* Text */}
            <h1 className="text-6xl tracking-wide font-semibold mb-6" tabIndex='0'>Why it Matters</h1>
            <div className="centered text-white mb-5 px-8 py-5" style={{ maxWidth: '700px', border: 'solid white', backgroundColor: '#3C156350'}}>
                {/* <h2 className="text-4xl tracking-wide font-semibold" tabIndex='0'>The Problem</h2>
                <p className="text-xl" tabIndex='0'>Gathering localized air quality data is inaccessible; current air quality monitoring systems exist only in large scales, such as district level, and only in developed regions around the world where the necessary technology is present</p> */}

                <h2 className="text-4xl font-semibold mb-3" tabIndex='0'>Health Equity and Climate Change</h2>
                <p className="text-xl text-left" tabIndex='0'>Many disadvantaged communities currently bear the brunt of climate-induced health risks from: </p>
                <ul className="text-left text-lg pl-5 list-disc">
                    <li tabIndex='0'>extreme heat</li>
                    <li tabIndex='0'>poor air quality</li>
                    <li tabIndex='0'>flooding</li>
                    <li tabIndex='0'>extreme weather events</li>
                    <li tabIndex='0'>vector borne diseases</li>
                </ul>


                <br></br>
                <h2 className="text-4xl font-semibold mb-3" tabIndex='0'>My Solution: CO2 Detector</h2>
                <p className="text-xl text-left" tabIndex='0'>CO2 Detector is a web application that allows users to detect CO2 levels in their environment. By tracking the CO2 level locally, governments and climate change organizations can better target those regions to implement end-to-end pollution control systems (prevention, capture, treatment, and disposal of pollutants) and sustainable infrastructure that can mitigate the pollution that contributes most directly to climate change. It can also help individuals stay aware of their residential environment and make healthy choices for themselves. </p>  
                <p className="text-xl text-left" tabIndex='0'>Using the fact that car mileage is almost proportional to CO2 emissions, the CO2 Detector Web App provides detailed CO2 emission insights through an AI model that tracks car count/minute.</p>
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
    );
  };
  
  export default Why;