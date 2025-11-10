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
      const container = document.getElementById("output");

      spinner.style.display = "block"; // Show spinner
      container.innerHTML = ""; // Clear any old images

      try {
        // Wait for all image promises to resolve
        const images = await Promise.all(urls.map(obj => downloadImage(obj.url)));

        // Add each image to the page
        images.forEach(img => container.appendChild(img));
      } catch (error) {
        console.error(error.message);
        container.textContent = "Some images failed to load.";
      } finally {
        spinner.style.display = "none"; // Hide spinner in all cases
      }
    }
downloadImages(images);