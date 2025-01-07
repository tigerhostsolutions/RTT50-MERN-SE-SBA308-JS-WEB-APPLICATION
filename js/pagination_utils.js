import { displayResults } from './display_results_utils.js';

export let current_page = 1; // Current page
export const items_per_page = 6; // Items per page
export let fetched_data = []; // Data fetched from API for pagination

export function initializePagination(data) {
  fetched_data = data; // Set data globally
  current_page = 1; // Reset page to 1
  updatePaginationControls(); // Generate pagination buttons
}

export function getPaginatedData(page) {
  const start_index = (page - 1) * items_per_page;
  const end_index = start_index + items_per_page;
  return fetched_data.slice(start_index, end_index); // Return current page items
}

export function updatePaginationControls() {
  const pagination_div = document.querySelector('#pagination');
  if (!pagination_div) return;

  const total_pages = Math.ceil(fetched_data.length / items_per_page);
  pagination_div.innerHTML = ''; // Clear existing buttons

  // Add "Previous" Button
  const prev_button = document.createElement('button');
  prev_button.innerText = 'Previous';
  prev_button.disabled = current_page === 1; // Disable if on the first page
  prev_button.addEventListener('click', () => changePage(current_page - 1));
  pagination_div.appendChild(prev_button);

  // Add Page Numbers
  for (let i = 1; i <= total_pages; i++) {
    const page_button = document.createElement('button');
    page_button.innerText = i;
    page_button.classList.toggle('active', i === current_page); // Highlight active page
    page_button.addEventListener('click', () => changePage(i));
    pagination_div.appendChild(page_button);
  }

  // Add "Next" Button
  const next_button = document.createElement('button');
  next_button.innerText = 'Next';
  next_button.disabled = current_page === total_pages; // Disable if on last page
  next_button.addEventListener('click', () => changePage(current_page + 1));
  pagination_div.appendChild(next_button);
}

// Change the active page and display results
export function changePage(page) {
  if (page < 1 || page > Math.ceil(fetched_data.length / items_per_page)) return;
  current_page = page; // Update the current page
  displayResults(getPaginatedData(current_page)); // Update displayed results
  updatePaginationControls(); // Update the buttons
}

// Setup the pagination container on page load
export function setupPaginationContainer() {
  const pagination_div = document.createElement('div');
  pagination_div.id = 'pagination';
  pagination_div.style.textAlign = 'center';
  pagination_div.style.margin = '20px 0';
  document.body.appendChild(pagination_div);
}