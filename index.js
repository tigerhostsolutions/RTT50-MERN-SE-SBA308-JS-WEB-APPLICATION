// Access environment variables
const API_KEY = `live_gecybbtg4DMF0IwPFn5AC9xqPKEhz02jvj2EcTPI8lXWit3A16xGC4CDI9V6EYA2`;
const API_URL = `https://api.thedogapi.com/v1/images/search?limit=10&api_key=${API_KEY}`;
const GET_BUTTON = document.querySelector('#get_button');

async function fetchPost() {
  try {
    const response = await axios.get(API_URL); // axios is globally available
    console.log('Fetched Posts:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { error: 'Failed to fetch data' };
  }
}


// Function to display data in the #results div
function displayResults(data) {
  const results_div = document.querySelector('#results');
  if (Array.isArray(data)) {
    results_div.innerHTML = data.map(
        (item) => `<img src="${item.url}" alt="Dog Image" />`).join('');
  }
  else {
    results_div.innerHTML = `<p style="color: red;">Invalid data format.</p>`;
  }
}

// Function to demonstrate both GET and POST functionality
async function runProject() {
  try {
    console.log('Fetching all posts...');
    await fetchPost();
  }
  catch (error) {
    console.error('Error in runProject:', error);
  }
}

// Add event handlers
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

// Run the project
runProject();