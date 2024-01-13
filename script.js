document.addEventListener("DOMContentLoaded", function () {
  // Get the video element
  const video = document.getElementById("bufferedVideo");

  const hexPosition = "002E8B10";

  // Convert the hexadecimal position to a decimal number
  const decimalPosition = parseInt(hexPosition, 16);

  // Video source URL
  const videoSourceURL = "./sample-audio-stereo.mp4"; // Replace with your video URL
  // Fetch the video content
  fetch(videoSourceURL)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      console.log(buffer.byteLength);
      // Create a Blob from the buffer
      const videoBlob = new Blob([buffer.slice(0,decimalPosition)], { type: "video/mp4",endings:"native" });

      // Create a URL for the Blob
      const videoBlobURL = URL.createObjectURL(videoBlob);

      // Set the video source to the Blob URL
      video.src = videoBlobURL;

      // Optional: Preload the video for better user experience
      video.preload = "auto";

      // Optional: Add event listeners for video events
      video.addEventListener("canplay", function () {
        console.log("Video can start playing");
      });

      video.addEventListener("ended", function () {
        console.log("Video playback ended");
      });
    })
    .catch((error) => console.error("Error fetching video:", error));
});
