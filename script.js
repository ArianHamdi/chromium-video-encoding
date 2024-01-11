document.addEventListener('DOMContentLoaded', function () {
    // Get the video element
    const video = document.getElementById('bufferedVideo');

    // Video source URL
    const videoSourceURL = './sample-audio-streo.mp4'; // Replace with your video URL

    // Fetch the video content
    fetch(videoSourceURL)
        .then(response => response.arrayBuffer())
        .then(buffer => {
            // Create a Blob from the buffer
            const videoBlob = new Blob([buffer], { type: 'video/mp4' });

            // Create a URL for the Blob
            const videoBlobURL = URL.createObjectURL(videoBlob);

            // Set the video source to the Blob URL
            video.src = videoBlobURL;

            // Optional: Preload the video for better user experience
            video.preload = 'auto';

            // Optional: Add event listeners for video events
            video.addEventListener('canplay', function () {
                console.log('Video can start playing');
            });

            video.addEventListener('ended', function () {
                console.log('Video playback ended');
            });
        })
        .catch(error => console.error('Error fetching video:', error));
});