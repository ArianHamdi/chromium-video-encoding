document.addEventListener('DOMContentLoaded', function () {
    // Get the video and audio elements
    const video = document.getElementsByTagName('video')[0];
    const audio = document.getElementById('separateAudio');
    const btn = document.getElementById('btn');

    // Video source URL
    const videoSourceURL = './sample-audio-stereo.mp4'; // Replace with your video URL

    // Fetch the video content
    fetch(videoSourceURL)
        .then(response => {
            console.log("responseresponse",response);
            return response.arrayBuffer()})
        .then(buffer => {
            console.log("bufferbuffer",buffer);
            // Create a Blob from the buffer
            const videoBlob = new Blob([buffer], { type: 'video/mp4' });
            console.log("videoBlob",videoBlob);
            
            // Create a URL for the Blob
            const videoBlobURL = URL.createObjectURL(videoBlob);
            console.log("videoBlobURL",videoBlobURL);
            
            // Set the video source to the Blob URL
            video.src = videoBlobURL;
            console.log("video.src",video);
            // Optional: Preload the video for better user experience
            video.preload = 'auto';
            
            // Use the Web Audio API to separate and play the audio
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.destination.channelCount = 1;
            audioContext.destination.channelCountMode ="max";
            console.log("audioContext",audioContext);

            // Create a MediaElementAudioSourceNode for the video
            const sourceNode = audioContext.createMediaElementSource(video);
            sourceNode.channelCount =1;
            sourceNode.channelCountMode ="explicit";
            console.log("sourceNode",sourceNode);
            
            // Connect the source node to a GainNode (volume control)
            const gainNode = audioContext.createGain();
            gainNode.channelCount = 1;
            gainNode.channelCountMode ="explicit";
            console.log("gainNode",gainNode);
            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Connect the source node to an AnalyserNode (optional: for analyzing audio)
            const analyserNode = audioContext.createAnalyser();
            sourceNode.connect(analyserNode);

            // Connect the AnalyserNode to the destination (audio tag)
            analyserNode.connect(audioContext.destination);

            // Connect the GainNode to the destination (optional: for adjusting volume)
            gainNode.connect(audioContext.destination);

            // Set the audio source for the <audio> element
            audio.src = videoBlobURL;

            // Optional: Add event listeners for video events
            btn.addEventListener('click', function () {
                console.log('Video can start playing');
                
                // Start playing the video
                
                video.play();
                setTimeout(() => {
                    audio.play();
                }, 0);
            });

            video.addEventListener('ended', function () {
                console.log('Video playback ended');
            });
        })
        .catch(error => console.error('Error fetching video:', error));
});