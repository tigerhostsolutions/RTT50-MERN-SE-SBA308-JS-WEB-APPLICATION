const API_KEY = `live_gecybbtg4DMF0IwPFn5AC9xqPKEhz02jvj2EcTPI8lXWit3A16xGC4CDI9V6EYA2`;
const API_URL = `https://api.thedogapi.com/v1/images/search?limit=12&api_key=${API_KEY}`;
const GET_BUTTON = document.querySelector('#get_button');

async function fetchPost() {
  try {
    const response = await axios.get(API_URL); // axios is globally available
    const data = response.data;
    console.log('Fetched Posts with Names:', data);
    return data;
  }
  catch (error) {
    console.error('Error fetching posts:', error);
    return {error: 'Failed to fetch data'};
  }
}

// Display data in the #results div
function displayResults(data) {
  const results_div = document.querySelector('#results');
  if (Array.isArray(data)) {
    results_div.innerHTML = data.map((item, index) => {
      const dogName = item?.name ||
          (item?.breeds?.length > 0 ? item.breeds[0]?.name : 'Unknown Dog');
      const breedGroup = item?.breeds?.[0]?.breed_group || 'N/A';
      const bredFor = item?.breeds?.[0]?.bred_for || 'N/A';
      // add description
      return `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${item.url}" class="card-img-top" alt="${dogName}" />
            <div class="card-body">
              <h5 class="card-title">${dogName}</h5>
              <p class="card-text">
                ${item.breeds.length > 0 ?
                  `Breed Group: ${breedGroup}<br>
                   Bred For: ${bredFor}` :
                  'No additional breed information available.'}
              </p>
              
<!--         add description-->
<!--         add save button-->
                     
            </div>
          </div>
        </div>`;
    }).join('');
  }
  else {
    results_div.innerHTML = `<p class="invalid">Invalid data format.</p>`;
  }
  // Add event listeners for the Save buttons

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