function makelime() {
  var dd1 = document.getElementById("d1");
  dd1.style.background = "lime";
}

function makeyellow() {
  var dd1 = document.getElementById("d1");
  dd1.style.background = "white";
  var gtx = dd1.getContext("2d");
  gtx.fillStyle = "yellow";
  gtx.fillRect(0, 10, 80, 40);
  gtx.fillRect(200, 10, 40, 40);

  gtx.fillStyle = "black";
  gtx.font = "20px Arial";
  gtx.fillText("Hello", 20, 40);
}

function cleasr() {
  var canvas = document.getElementById("d1");
  var gtxs = canvas.getContext("2d");
  gtxs.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.background = "white";
  gtxs.fillText("Cleared",80,60)
}
function docolor() {
  var dd1 = document.getElementById("d1");
  var colorinput = document.getElementById("clr");

  var clr = colorinput.value;
  dd1.style.background = clr;
}

function makecolor() {
  var dd1 = document.getElementById("d1");
  var slider = document.getElementById("sldr");
  var size = slider.value;
  var gtx = dd1.getContext("2d");
  gtx.clearRect(0, 0, dd1.width, dd1.height);
  gtx.fillStyle = "yellow";
  gtx.fillRect(10, 10, size, size);
}
var fgimage = null;
var bgimage = null;
var fgcanvas;
var bgcanvas;

function upload() {
  var fileinput = document.getElementById("dd4");
  image = new SimpleImage(fileinput);
  var imgcanvas = document.getElementById("dd2");
  image.drawTo(imgcanvas);
}

function makegrey() {
  for (var pix of image.values()) {
    var avg = (pix.getGreen() + pix.getBlue() + pix.getRed()) / 3;
    pix.setBlue(avg);
    pix.setGreen(avg);
    pix.setRed(avg);
  }
  var greycanvas = document.getElementById("dd5");
  image.drawTo(greycanvas);
}
function uploadfg() {
  var fileinput = document.getElementById("dd7");
  fgimage = new SimpleImage(fileinput);
  fgcanvas = document.getElementById("dd6");
  fgimage.drawTo(fgcanvas);
}
function uploadbg() {
  var fileinput = document.getElementById("dd9");
  bgimage = new SimpleImage(fileinput);
  bgcanvas = document.getElementById("dd8");
  bgimage.drawTo(bgcanvas);
}

function clearfg() {
  var gtxs = fgcanvas.getContext("2d");
  gtxs.clearRect(0, 0, fgcanvas.width, fgcanvas.height);
  var gtxs2 = bgcanvas.getContext("2d");
  gtxs2.clearRect(0, 0, bgcanvas.width, bgcanvas.height);
}

function createComposite() {
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  var greenThreshold = 240;

  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      //pixel is green, use background
      var bgPixel = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    } else {
      //pixel is not green, use foreground
      output.setPixel(x, y, pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  if (fgimage == null || !fgimage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgimage == null || !bgimage.complete()) {
    alert("Background image not loaded");
  }
  clearfg();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finalImage = createComposite();
  finalImage.drawTo(fgcanvas);
}
