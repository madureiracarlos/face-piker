"use strict";

function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert("getUserMedia() is not supported by your browser");
}

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector("span#errorMsg");

const constraints = {
  audio: true,
  video: {
    facingMode: "user",
  },
};

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (error) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error ==> ${error.toString()}`;
  }
}

// Success function
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Initialize webcan access function
init();

// Draw image
var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 640, 640);
});
