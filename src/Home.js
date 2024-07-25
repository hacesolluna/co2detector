const Home = ({ navigateTo }) => {
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: "url('cae.jpg')"}}>
    <div className="absolute inset-0" style={{backgroundColor:'rgba(58, 26, 89, 0.36)'}}></div>
      <div className='relative flex flex-col items-center justify-start p-5'>
        <h1 className="text-6xl tracking-wide font-semibold mb-10 mt-10" tabIndex='0'>Welcome to CO2 Detector,</h1>
        <h2 className="shadow text-4xl leading-normal mt-3 mb-3" tabIndex='0'>dedicated to advancing <a className="underline text-purple-200 hover:text-white" href="https://www.hhs.gov/climate-change-health-equity-environmental-justice/climate-change-health-equity/index.html" target="_blank">health equity</a> through<br></br>tackling climate change.</h2>
        <button className="relative text-3xl text-gray-100 mt-10 py-3 px-12 border border-white shadow tracking-normal hover:border-gray-200 hover:text-white rounded" style={{backgroundColor:'rgba(45, 26, 50, 0.6)'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(45, 26, 50, 0.9)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(45, 26, 50, 0.6)'} onClick={() => navigateTo('why')}>START</button>
      </div>
    </div>
  );
};

export default Home;