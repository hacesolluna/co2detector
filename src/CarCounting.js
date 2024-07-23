import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const CarCounting = ({ navigateTo }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [classificationModel, setClassificationModel] = useState(null);
  const [detectionModel, setDetectionModel] = useState(null);
  const [carCount, setCarCount] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  // const minutes = Math.floor(videoDuration / 60);
  // const seconds = Math.floor(videoDuration % 60);
  const [fileName, setFileName] = useState('None');
  const [videoEnded, setVideoEnded] = useState(false);
  const texts = ["Climate change is directly contributing to humanitarian emergencies from heatwaves, wildfires, floods, tropical storms and hurricanes and they are increasing in scale, frequency and intensity.", "Research shows that 3.6 billion people already live in areas highly susceptible to climate change. Between 2030 and 2050, climate change is expected to cause approximately 250 000 additional deaths per year, from undernutrition, malaria, diarrhoea and heat stress alone.", "The direct damage costs to health (excluding costs in health-determining sectors such as agriculture and water and sanitation) is estimated to be between US$ 2–4 billion per year by 2030.", "Areas with weak health infrastructure – mostly in developing countries – will be the least able to cope without assistance to prepare and respond.", "Reducing emissions of greenhouse gases through better transport, food and energy use choices can result in very large gains for health, particularly through reduced air pollution."];
  const [currentText, setCurrentText] = useState(texts[0]);

  useEffect(() => {
    const loadModels = async () => {
      const classificationModel = await tf.loadLayersModel('https://hacesolluna.github.io/carCount/model.json');
      const detectionModel = await cocoSsd.load('mobilenet_v2');
      setClassificationModel(classificationModel);
      setDetectionModel(detectionModel);
    };
    loadModels();
  }, []);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
    }, 9000);
  
    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleVideoUpload = (event) => {
    const videoFile = event.target.files[0];
    const video = videoRef.current;
    video.src = URL.createObjectURL(videoFile);
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      setVideoLoaded(true);
      setCarCount(0);
      setVideoEnded(false);
    };
    video.play();
    setFileName(event.target.files[0].name);
    event.target.value = null;
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  }

  const captureFrame = async () => {
    const video = videoRef.current;
    if (video && video.readyState >= 2 && classificationModel && detectionModel) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageData = context.getImageData(0, 0, video.videoWidth, video.videoHeight);
      const tfImage = tf.browser.fromPixels(imageData);

      const detections = await detectionModel.detect(tfImage);

      let count = 0;
      for (const detection of detections) {
        if (detection.class === 'car') {
          const [x, y, width, height] = detection.bbox;
          const region = document.createElement('canvas');
          region.width = width;
          region.height = height;
          const regionContext = region.getContext('2d');
          regionContext.drawImage(canvas, x, y, width, height, 0, 0, width, height);

          const isCar = await classifyRegion(region);
          if (isCar) {
            count++;
          }
        }
      }
      setCarCount(prevCount => prevCount + count);
    } else {
      console.error('Video is not ready or models are not loaded');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(captureFrame, 1050);
    return () => clearInterval(intervalId);
  }, [classificationModel, detectionModel]);

  const adjustContrast = (imageTensor, contrastFactor) => {
    const mean = imageTensor.mean();
    const adjusted = imageTensor.sub(mean).mul(contrastFactor).add(mean);
    return adjusted.div(255.0);
  };

  const classifyRegion = async (canvas) => {
    let input = tf.browser.fromPixels(canvas);
    input = adjustContrast(input, 2); 
    input = input.resizeBilinear([224, 224]).expandDims(0);
    const predictions = await classificationModel.predict(input).data();
    return predictions[1] > 0.5;
  };

  const averageCarCountPerMinute = (carCount / (videoDuration / 60)).toFixed(2);


  return (
    <div className='flex flex-col items-center justify-start h-full p-5' style = {{marginTop: '5%'}}>
        {/* Instructions/Text */}
        <h1 className="text-6xl tracking-wide font-semibold mb-6" tabIndex='0'>Start Detecting</h1>
        <div className="centered text-white mb-5" style={{ maxWidth: '700px', border: 'solid white', backgroundColor: '#3C156350'}}>
          <h2 className="text-4xl tracking-wide font-semibold mt-5" tabIndex='0'>Instructions</h2>
          <ul className="px-5 py-5 text-xl leading-loose" style={{ textAlign: 'left' }}>
            <li tabIndex='0'>1. Record a short video of a road (40-50mph) from the sidewalk, positioned at a right angle to the road{" "}
              <a href="carVideo.MOV" download className="underline cursor-pointer text-purple-300 hover:text-white">
                  (<i className="bi bi-download"></i> download a sample video)
              </a>
            </li>
            <li tabIndex='0'>2. Upload the video to the CO2 Detector app</li>
            <li tabIndex='0'>3. The app will find the average number of cars per minute, giving you a summary of the CO2 air quality information in the area</li>
          </ul>
          {/* Input */}
          <>
            <label tabIndex='0' htmlFor="file-input" className="px-3 py-2 mt-5 text-2xl rounded cursor-pointer hover:bg-blue-500 hover:border-gray-200 bg-blue-600 text-white shadow-inner">
              <i className="bi bi-upload font-bold"></i>
              {"   "}
              Upload Video
            </label>
            <input
              id="file-input"
              className="hidden"
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
            />
            <p tabIndex='0' className="mt-5 text-sm text-white dark:text-gray-300" id="file_input_help">File Type: MP4, MOV, AVI or MKV.</p>
            <br></br>
            <video onEnded={handleVideoEnd} ref={videoRef} className="hidden" muted />
            <canvas ref={canvasRef} className="hidden" />
          </>
        </div>
        {/* Popup */}
        {videoLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full">
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 tabIndex='0' className="text-xl font-semibold text-gray-900 dark:text-white">
                          Results for <span tabIndex='0' id="file-name">{fileName}</span>
                      </h3>
                      <button tabIndex='0' type="button" onClick={() => setVideoLoaded(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-4 md:p-5 space-y-2 text-black">
                    {videoEnded ? (
                      <>
                        <p tabIndex='0' className='font-semibold text-2xl'>Your Results:</p>
                        <p tabIndex='0' className='font-semibold text-xl'>The average car count per minute is <span className="bg-purple-200 px-1">{averageCarCountPerMinute}.</span></p>
                        <p tabIndex='0' className='font-semibold text-xl'><span className="bg-purple-200 px-1">{(averageCarCountPerMinute * 166.8).toFixed(2)}</span> parts per million (ppm) of CO2 per minute is released from on-road transportation in your immediate area.</p>
                        {/* info box */}
                        <div className="flex text-left p-4 mb-4 text-lg text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                          <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                          </svg>
                          <span className="sr-only">Info</span>
                          <div>
                            <span className="font-medium">For relative comparison,</span>
                              <ul className="mt-1.5 list-disc list-inside">
                                <li>Typical CO2 levels in outdoor air: 300-400 ppm</li>
                                <li>Typical CO2 levels in metropolitan areas: 600-900ppm</li>
                            </ul>
                            <span className="font-medium">*Please note that your resulting ppm level is pertaining to your very immediate area near the road, so the general value in your larger area would be much lower.</span>
                          </div>
                        </div>
                      </>
                    ) : (
                    <div className="flex flex-col justify-center items-center">
                      <div role="status">
                        <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <p tabIndex='0' className="mt-5">Loading your results</p>
                      <br></br>
                      <div className='p-4 font-semibold text-xl text-purple-800 rounded-lg bg-purple-50 dark:bg-gray-800 dark:text-blue-400'>
                        <p tabIndex='0' className='text-2xl'>Did you know?</p>
                        <p tabIndex='0'>{currentText}</p>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Navigation Buttons */}
        <div className="flex flex-row mx-auto text-xl">
          <button onClick={() => navigateTo('why')} type="button" className="bg-white text-black rounded-l-md border-r border-gray-500 py-2 hover:bg-purple-300 px-3">
            <div className="flex flex-row align-middle">
              <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              <p className="ml-2">Prev: Why it Matters</p>
            </div>
          </button>
          <button onClick={() => navigateTo('home')} type="button" className="bg-white text-black rounded-r-md py-2 border-l border-gray-500 hover:bg-purple-300 px-3">
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next: Return Home</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </button>
        </div>
        {/* <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => navigateTo('home')}>Back to Home</button> */}
    </div>
      
  );
};

export default CarCounting;
