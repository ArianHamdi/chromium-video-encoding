import mime from './node_modules/mime/dist/src/index.js';
import * as ffprobe from './node_modules/fluent-ffmpeg/lib/ffprobe.js';

const video = document.getElementsByTagName('video')[0];
video.addEventListener("error",(event)=>{
    console.log(event);
})

const assetURL = "./sample-audio-stereo.mp4";
// Need to be specific for Blink regarding codecs
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.5"';

ffprobe(assetURL, (err, metadata) => {
    if (err) {
      console.error(err);
    } else {
      const codec = metadata.streams[0].codec_name;
      console.log(`Codec: ${codec}`);
    }
  });

// console.log("object11111", mime.getAllExtensions("video/mp4"));

if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
  var mediaSource = new MediaSource;
  console.log(mediaSource);
  //console.log(mediaSource.readyState); // closed
  video.src = URL.createObjectURL(mediaSource);
  mediaSource.addEventListener('sourceopen', sourceOpen);
} else {
  console.error('Unsupported MIME type or codec: ', mimeCodec);
}

function sourceOpen (_) {
  //console.log(this.readyState); // open
  var mediaSource = this;
  var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB(assetURL, function (buf) {
    sourceBuffer.addEventListener('updateend', function (_) {
      mediaSource.endOfStream();
      video.play();
      //console.log(mediaSource.readyState); // ended
    });
    sourceBuffer.appendBuffer(buf);
  });
};

function fetchAB (url, cb) {
  console.log(url);
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    cb(xhr.response);
  };
  xhr.send();
};