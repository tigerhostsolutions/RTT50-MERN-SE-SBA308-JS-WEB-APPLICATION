import {
  initializePagination,
  getPaginatedData,
  setupPaginationContainer,
} from './pagination_utils.js';

import {displayResults} from './display_results_utils.js';

const API_KEY = `live_gecybbtg4DMF0IwPFn5AC9xqPKEhz02jvj2EcTPI8lXWit3A16xGC4CDI9V6EYA2`;
const API_URL = `https://api.thedogapi.com/v1/images/search?limit=12&api_key=${API_KEY}`;
const UPLOAD_URL = `https://api.thedogapi.com/v1/images/upload`;
const GET_BUTTON = document.querySelector('#get_button');

setupPaginationContainer();

async function fetchPost() {
  try {
    const response = await axios.get(API_URL); // axios is globally available
    const data = response.data;
    console.log('Fetched Posts with Names:', data);
    initializePagination(data);    // Initialize pagination with fetched data
    displayResults(getPaginatedData(1));    // Display the first page of results

    return data;
  }
  catch (error) {
    console.error('Error fetching posts:', error);
    return {error: 'Failed to fetch data'};
  }
}

async function uploadImage(file, description) {
  try {
    // Prepare form data
    const form_data = new FormData();
    form_data.append('file', file); // The image file
    if (description) {
      form_data.append('sub_id', description); // Adding the description as `sub_id`
    }

    // Make the POST request to upload
    const response = await axios.post(UPLOAD_URL, form_data, {
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Image uploaded successfully:', response.data);
    alert('Image uploaded successfully!');
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    alert(`Failed to upload image: ${error.message}`);
    return { error: 'Failed to upload image' };
  }
}

if (GET_BUTTON) {
  GET_BUTTON.addEventListener('click', async () => {
    try {
      const post_data = await fetchPost();
      displayResults(post_data);
    }
    catch (error) {
      console.error('Error in GET request:', error);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const upload_button = document.querySelector('#upload_button');
  const image_input = document.querySelector('#image_input');
  const image_description = document.querySelector('#image_description');

  if (upload_button) {
    upload_button.addEventListener('click', async () => {
      // Validate inputs
      if (!image_input.files.length) {
        alert('Please select an image to upload.');
        return;
      }

      const file = image_input.files[0];
      const description = image_description.value;
      const result = await uploadImage(file, description);

      if (!result.error) {
        console.log('Uploaded Image Response:', result);
        alert(`Image Uploaded: ID = ${result.id}`);
        await fetchPost(); // Reload fetched images
      }
    });
  }
});

async function runProject() {
  try {
    console.log('Fetching all posts on load...');
    const post_data = await fetchPost();
    displayResults(post_data);
  }
  catch (error) {
    console.error('Error in runProject:', error);
  }
}

runProject();