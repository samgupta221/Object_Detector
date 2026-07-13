import React, { useRef, useState, useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import { detectFrame } from "../services/api";


function CameraStream() {

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [processedImage, setProcessedImage] = useState(null);
  const [isRunning, setIsRunning] = useState(false);



  /*
  Start camera button clicked
  */
  const startCamera = () => {
    setIsRunning(true);
  };



  /*
  Stop camera manually
  */
  const stopCamera = () => {

    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    /*
    Clear video stream reference
    */
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setProcessedImage(null);
    setIsRunning(false);
  };



  /*
  When camera starts, attach stream to video
  */

 useEffect(() => {

  let stream;

  const enableCamera = async () => {

    try {

      stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

    } catch (error) {
      console.error("Camera error:", error);
    }

  };

  if (isRunning) {
    enableCamera();
  }

  /*
  Cleanup whenever camera stops OR component unmounts
  */
  return () => {

    const activeStream = videoRef.current?.srcObject;

    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

  };

}, [isRunning]);



  /*
  Capture frame and send to backend
  */
  const captureFrame = async () => {

    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const base64Image = canvas.toDataURL("image/jpeg").split(",")[1];

    try {

      const result = await detectFrame(base64Image);

      setProcessedImage("data:image/jpeg;base64," + result.image);

    } catch (error) {

      console.error("Detection error:", error);
    }
  };



  /*
  Run detection loop
  */
  useEffect(() => {

    let interval;

    if (isRunning) {

      interval = setInterval(() => {
        captureFrame();
      }, 300);

    }

    return () => clearInterval(interval);

  }, [isRunning]);



  /*
  IMPORTANT FIX
  Stop camera automatically when component unmounts
  Example: user switches tab to Upload Video Detection
  */
  useEffect(() => {

    return () => {

      const stream = videoRef.current?.srcObject;

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

    };

  }, []);



  return (

    <Box>

      {/* Initial State */}
      {!isRunning && (

        <Box sx={{ textAlign: "center", marginTop: 4 }}>

          <Button
            variant="contained"
            size="large"
            onClick={startCamera}
          >
            Start Camera
          </Button>

        </Box>

      )}



      {/* Camera Running State */}
      {isRunning && (

        <Box>

          {/* Camera Preview */}
          <Card sx={{ marginBottom: 3 }}>

            <CardContent>

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Camera Preview
              </Typography>

              <video
                ref={videoRef}
                autoPlay
                playsInline
                width="100%"
                style={{
                  borderRadius: "8px",
                  border: "2px solid #1976d2"
                }}
              />

            </CardContent>

          </Card>



          {/* Stop Button */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>

            <Button
              variant="outlined"
              color="error"
              size="large"
              onClick={stopCamera}
            >
              Stop Camera
            </Button>

          </Box>



          {/* Detection Output */}
          {processedImage && (

            <Card>

              <CardContent>

                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                  Detected Objects
                </Typography>

                <img
                  src={processedImage}
                  alt="Detection Result"
                  width="100%"
                  style={{
                    borderRadius: "8px",
                    border: "2px solid #4caf50"
                  }}
                />

              </CardContent>

            </Card>

          )}

        </Box>

      )}



      {/* Hidden canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
      />

    </Box>

  );
}

export default CameraStream;