//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load ${url}`));
    });
  }

  async function downloadImages(urls) {
    const spinner = document.getElementById("loading");
    const output = document.getElementById("output");

    spinner.style.display = "block";
    output.innerHTML = "";

    try {
      const images = await Promise.all(urls.map(obj => downloadImage(obj.url)));
      images.forEach(img => output.appendChild(img));
    } catch (error) {
      console.error(error);
      output.textContent = "Some images failed to load.";
    } finally {
      spinner.style.display = "none";
    }
  }
document.getElementById("download-images-button").addEventListener("click", () => {
	downloadImages(images);
  });
