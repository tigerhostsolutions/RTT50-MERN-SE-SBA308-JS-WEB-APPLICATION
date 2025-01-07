import {
  initializePagination,
  getPaginatedData,
  setupPaginationContainer,
} from './pagination_utils.js';

import {displayResults} from './display_results_utils.js';

const API_KEY = `live_gecybbtg4DMF0IwPFn5AC9xqPKEhz02jvj2EcTPI8lXWit3A16xGC4CDI9V6EYA2`;
const API_URL = `https://api.thedogapi.com/v1/images/search?limit=12&api_key=${API_KEY}`;
const GET_BUTTON = document.querySelector('#get_button');

setupPaginationContainer();

async function fetchPost() {
  try {
    const response = await axios.get(API_URL); // axios is globally available
    const data = response.data;
    console.log('Fetched Posts with Names:', data);

    // Initialize pagination with fetched data
    initializePagination(data);
    // Display the first page of results
    displayResults(getPaginatedData(1));

    return data;
  }
  catch (error) {
    console.error('Error fetching posts:', error);
    return {error: 'Failed to fetch data'};
  }
}

// async function updatePost(image_id, new_description) {
//   try {
//     const response = await axios.put(
//         `https://api.thedogapi.com/v1/images/${image_id}/description`, {
//           description: new_description,
//         }, {
//           headers: {
//             'x-api-key': API_KEY, 'Content-Type': 'application/json',
//           },
//         });
//
//     console.log('Description updated successfully:', response.data);
//     return response.data;
//   }
//   catch (error) {
//     console.error('Error updating description:', error);
//     alert(`Failed to update description: ${error.message}`);
//     return {error: 'Failed to update description'};
//   }
// }
//
// export function addCardDescription() {
//   const buttons = document.querySelectorAll('.save-description-btn');
//
//   buttons.forEach((button) => {
//     button.replaceWith(button.cloneNode(true)); // Removes old event listeners
//   });
//
//   buttons.forEach((button) => {
//     button.addEventListener('click', async () => {
//       const image_id = button.dataset.image_id;
//       const input_field = document.querySelector(
//           `.description-input[data-image-id="${image_id}"]`);
//
//       if (input_field) {
//         const new_description = input_field.value;
//         const result = await updatePost(image_id, new_description);
//
//         if (result.error) {
//           alert('Failed to update description!');
//         }
//         else {
//           alert('Description updated successfully!');
//           console.log('Updated Description:', result);
//         }
//       }
//     });
//   });
// }

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