let selectedFrameColor = "img/nude.jpg"; // Default frame
let capturedPhotos = JSON.parse(sessionStorage.getItem("capturedPhotos")) || [];
if (capturedPhotos.length === 0) {
  console.error("No photos found in sessionStorage.");
}

// Canvas dimensions
const canvasWidth = 240;
const imageHeight = 160;
const spacing = 10;
const framePadding = 10;
const logoSpace = 100;

const finalCanvas = document.getElementById("finalCanvas");
finalCanvas.width = canvasWidth;
finalCanvas.height =
  framePadding + (imageHeight + spacing) * capturedPhotos.length + logoSpace;
const ctx = finalCanvas.getContext("2d");

function drawCollage() {
  const background = new Image();
  background.src = selectedFrameColor;

  background.onload = () => {
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);
    ctx.drawImage(background, 0, 0, finalCanvas.width, finalCanvas.height);

    capturedPhotos.forEach((photo, index) => {
      const img = new Image();
      img.src = photo;

      img.onload = () => {
        const x = framePadding;
        const y = framePadding + index * (imageHeight + spacing);
        ctx.drawImage(img, x, y, canvasWidth - 2 * framePadding, imageHeight);
      };

      img.onerror = () => console.error(`Failed to load image ${photo}`);
    });

    drawLogo();
  };

  background.onerror = () => console.error("Failed to load background image.");
}

function drawLogo() {
  const logo = new Image();
  logo.src = "img/NTH.STUDIO.png";

  logo.onload = () => {
    const logoWidth = 80;
    const logoHeight = 20;
    const logoX = (canvasWidth - logoWidth) / 2;
    const logoY = finalCanvas.height - logoSpace + 35;
    ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
  };

  logo.onerror = () => console.error("Failed to load logo image.");
}

function createTemplates() {
  const images = [
    "nude.jpg",
    "lilac.jpg",
    "blue.jpg",
    "red.jpg",
    "cobalt.jpg",
    "matcha.jpg",
    "valentines.png",
    "valentines1.png",
    "valentines2.png",
    "template1.jpg",
  ];

  const colorGrid = document.getElementById("color-grid");

  images.forEach((image) => {
    const button = document.createElement("button");
    button.classList.add("color-btn");
    button.setAttribute("data-color", `img/${image}`);
    button.style.backgroundImage = `url('img/${image}')`;

    // Add click event to change frame color and redraw instantly
    button.addEventListener("click", () => {
      selectedFrameColor = `img/${image}`;
      drawCollage();
    });

    colorGrid.appendChild(button);
  });
}

window.onload = () => {
  createTemplates();
  drawCollage();
};

const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = finalCanvas.toDataURL("image/png");
  link.download = "photobooth.png";
  link.click();
});
