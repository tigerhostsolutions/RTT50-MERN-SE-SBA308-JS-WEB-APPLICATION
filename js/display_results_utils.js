// import {addCardDescription} from './index.js';

export function displayResults(data) {
  const results_div = document.querySelector('#results');
  if (Array.isArray(data)) {
    results_div.innerHTML = data.map((item, index) => {
      const dogName = item?.name ||
          (item?.breeds?.length > 0 ? item.breeds[0]?.name : 'Unknown Dog');
      const breedGroup = item?.breeds?.[0]?.breed_group || 'N/A';
      const bredFor = item?.breeds?.[0]?.bred_for || 'N/A';
      const description = item?.description || 'This is a lovely dog!';

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
<!--              
              <p class = "card-text" >
                <input
                    type = "text"
                    class = "form-control description-input"
                    data-image-id = "${item.id}"
                    value = "${description}" />
              </p >
              <button class = "btn btn-primary save-description-btn"
                  data-image-id = "${item.id}" >
                Save Description
              </button >
                    --> 
            </div>
          </div>
        </div>`;
    }).join('');
  }
  else {
    results_div.innerHTML = `<p class="invalid">Invalid data format.</p>`;
  }
  // Add event listeners for the Save buttons
  // addCardDescription();
}