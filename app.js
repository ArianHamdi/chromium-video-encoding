document.addEventListener('DOMContentLoaded', ()=> {
    const videoEl = document.querySelector("#target_video");
    videoEl.addEventListener("error",(event)=>{
        console.log("eventevent", event);
    })
});