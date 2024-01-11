const videoElement = document.getElementsByTagName('video')[0];

videoElement.addEventListener('error', err => {
    console.log("Error", err)
})