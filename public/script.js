const photoList = document.getElementById("photoList");
const photoDetails = document.getElementById("photoDetails");

// Show loading spinner
photoList.innerHTML = "<p>Loading photos...</p>";

fetch("/photos")
  .then((res) => res.json())
  .then((photos) => {
    photoList.innerHTML = "";
    photos.forEach((photo) => {
      const li = document.createElement("li");
      li.textContent = photo.title;
      li.addEventListener("click", () => {
        showPhotoDetails(photo.id);
      });
      photoList.appendChild(li);
    });
  })
  .catch(() => {
    photoList.innerHTML = "<p>Error loading photos. Please try again.</p>";
  });

function showPhotoDetails(photoId) {
  photoDetails.innerHTML = "<p>Loading photo details...</p>";
  fetch(`/photos/${photoId}`)
    .then((res) => res.json())
    .then((photo) => {
      photoDetails.innerHTML = `
        <h2>${photo.title}</h2>
        <p><strong>ID:</strong> ${photo.id}</p>
        <p><strong>Album:</strong> ${photo.albumId}</p>
        <p><strong>Full URL:</strong> <a href="${photo.url}" target="_blank">${photo.url}</a></p>
        <img src="${photo.thumbnailUrl}" alt="Thumbnail of ${photo.title}" />
      `;
      window.scrollTo({ top: 0, behavior: "smooth" });
    })
    .catch(() => {
      photoDetails.innerHTML =
        "<p>Error loading photo. Please try another one.</p>";
    });
}
