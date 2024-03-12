function showPieces() {
    document.getElementById('piecesFilters').style.display = 'block';
    document.getElementById('gridContainer').style.display = 'block';
    document.getElementById('addPhotoBtn').style.display = 'block';
    document.getElementById('fileInput').style.display = 'block';

    document.getElementById('fitsContent').style.display = 'none';
    document.getElementById('collectionsContent').style.display = 'none';
    document.getElementById('fitContainer').style.display = 'none';
}

function showFits() {
    document.getElementById('fitContainer').style.display = 'block';
    document.getElementById('fitsContent').style.display = 'block';
    document.getElementById('piecesFilters').style.display = 'none';
    document.getElementById('collectionsContent').style.display = 'none';
    document.getElementById('addPhotoBtn').style.display = 'none';
    document.getElementById('fileInput').style.display = 'none';
    document.getElementById('gridContainer').style.display = 'none';

}

function showCollections() {
    document.getElementById('piecesFilters').style.display = 'none';
    document.getElementById('fitsContent').style.display = 'none';
    document.getElementById('collectionsContent').style.display = 'block';
    document.getElementById('addPhotoBtn').style.display = 'none';
    document.getElementById('fileInput').style.display = 'none';
}

function createFit() {
    const fitContainer = document.getElementById('fitContainer');
    const images = document.querySelectorAll('.grid-container img');
    const categories = {
        top: [],
        pants: [],
        shoes: []
    };

    // Categorize images based on their data-category attribute
    images.forEach(function(image) {
        const category = image.getAttribute('data-category');
        if (category in categories) {
            categories[category].push(image);
        }
    });

    // Randomly select one image from each category
    const randomFit = [];
    for (const category in categories) {
        if (categories[category].length > 0) {
            const randomIndex = Math.floor(Math.random() * categories[category].length);
            randomFit.push(categories[category][randomIndex]);
        }
    }

    // Clear the fit container
    fitContainer.innerHTML = '';

    // Append the randomly selected images to the fit container
    randomFit.forEach(function(image) {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('fit-image-container');
        const img = image.cloneNode(true);
        imgContainer.appendChild(img);
        fitContainer.appendChild(imgContainer);
    });
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var modal = document.getElementById("myModal");
var addPhotoBtn = document.getElementById("addPhotoBtn");
var closeBtn = document.getElementsByClassName("close")[0];

addPhotoBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addPhoto() {
    const fileInput = document.getElementById('fileInput');
    const gridContainer = document.getElementById('gridContainer');
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;
    const color = document.getElementById('color').value;
    const brand = document.getElementById('brand').value;

    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "Uploaded photo"; // Add alt attribute for accessibility
            img.classList.add('grid-item');

            // Set data attributes
            img.setAttribute('data-category', category);
            img.setAttribute('data-type', type);
            img.setAttribute('data-color', color);
            img.setAttribute('data-brand', brand);

            // Add click event listener to show popup
            img.addEventListener('click', function() {
                showUpdateInfoModal(this);
            });

            gridContainer.appendChild(img);
        };

        reader.readAsDataURL(file);
    }

    // Close the modal after adding the photo
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Function to show the update modal popup
function showUpdateInfoModal(image) {
    // Get the current image data
    const category = image.getAttribute('data-category');
    const type = image.getAttribute('data-type');
    const color = image.getAttribute('data-color');
    const brand = image.getAttribute('data-brand');

    // Populate the input fields with the current data attributes of the clicked image
    document.getElementById('updateCategory').value = category;
    document.getElementById('updateType').value = type;
    document.getElementById('updateColor').value = color;
    document.getElementById('updateBrand').value = brand;

    // Show the update modal popup
    const updateInfoModal = document.getElementById('updateInfoModal');
    updateInfoModal.style.display = 'block';

    // Store a reference to the clicked image for later use
    updateInfoModal.clickedImage = image;
}

// Function to update image information
function updateImageInfo() {
    // Get the input values from the update modal
    const newCategory = document.getElementById('updateCategory').value;
    const newType = document.getElementById('updateType').value;
    const newColor = document.getElementById('updateColor').value;
    const newBrand = document.getElementById('updateBrand').value;

    // Get the clicked image reference from the update modal
    const clickedImage = document.getElementById('updateInfoModal').clickedImage;

    // Update the data attributes of the clicked image with the new information
    clickedImage.setAttribute('data-category', newCategory);
    clickedImage.setAttribute('data-type', newType);
    clickedImage.setAttribute('data-color', newColor);
    clickedImage.setAttribute('data-brand', newBrand);

    // Close the update modal popup
    document.getElementById('updateInfoModal').style.display = 'none';
}

// Add click event listener to the confirm button in the update modal
const updateConfirmButton = document.getElementById('updateConfirmButton');
updateConfirmButton.addEventListener('click', updateImageInfo);

// Close the update modal popup when the user clicks outside of it
window.onclick = function(event) {
    const updateInfoModal = document.getElementById('updateInfoModal');
    if (event.target == updateInfoModal) {
        updateInfoModal.style.display = 'none';
    }
}

const savedFits = [];

function saveFit() {
    const fitContainer = document.getElementById('fitContainer');
    const images = fitContainer.querySelectorAll('.fit-image-container img');

    // Store the current fit in your data structure (e.g., an array)
    const fit = [];
    images.forEach(function(image) {
        fit.push(image.src);
    });
    savedFits.push(fit);

    // Store or process the saved fit as needed
    // For example, you can save it to local storage or send it to a server
    console.log('Saved Fit:', savedFits);
}

function showSavedFits() {
    // Get the saved fits container
    const savedFitsContainer = document.getElementById('savedFitsContainer');

    // Clear any existing content
    savedFitsContainer.innerHTML = '';

    // Loop through each saved fit and create elements to display them
    savedFits.forEach(function(fit) {
        const fitContainer = document.createElement('div');
        fitContainer.classList.add('saved-fit');

        // Loop through each image URL in the fit and create img elements
        fit.forEach(function(imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            fitContainer.appendChild(img);
        });

        // Append the saved fit container to the saved fits container
        savedFitsContainer.appendChild(fitContainer);
    });

    // Display the modal
    const savedFitsModal = document.getElementById('savedFitsModal');
    savedFitsModal.style.display = 'block';
}

// Function to close the saved fits modal
function closeSavedFitsModal() {
    const savedFitsModal = document.getElementById('savedFitsModal');
    savedFitsModal.style.display = 'none';
}