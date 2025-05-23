// Replace with your Google Sheets ID and API Key
const SHEET_ID = '1aQhyXukUEBfZFyLnj65MVHXdyOhhlSkpoRIpEcSjnF8';
const EMAIL_SHEET_ID = '1CLLFshW3fJaN4VqjOQYrjD7uv8UKCcrwOlaR5WjxYx8';
const API_KEY = 'AIzaSyCmca9yVkoX0DtiduzZdLGxVJ0n6tjbY7g';
const SHEET_NAME = 'Sheet1';

// Service Account Credentials
const SERVICE_ACCOUNT = {
    "type": "service_account",
    "project_id": "stone-nuance-453503-j2",
    "private_key_id": "e6e3cb56f7a194688fadf99708c18a0a2990ca43",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2DfHifqvXdNrF\nYldrA++V4uDhrID36JiWpZO0e2NIK1R+LFTWeS5hcUG4ZAHOay/Dd2srAF0Z/CK1\ntcjCAHv92Zwd7rlHPxAXGV/pTVgxtb+zuWicZMzWTX5Edx/xpG/ri+THnZEssIVx\nOiR+8ag7AXt2BzyqPTlJUV3INlpXkz6u3Z5liMLp9D1b/wqidbsU/gkIYZ+sl7tf\nk4bQFSnOxjiciLOsSAaia/y94plhp4ORodNNk92GRfniEXe3/LxAFGBGKShKjIZq\n0hAaABqXk9LfdKsdV5VSHh0E7/aOCdV0EUt52UCOSz82NS731DcuevBgih1++vbb\nFvCLBh07AgMBAAECggEAVyyfPhLkyyM33JtF+8bjMvT0NOvKx6rXYg+ABkStGjIx\nX8dvilF1jZBTZW1x1ftKYEEvDmS6sAYlQrh8nLTpqnjIgia9DmoalM0AObFhAVCj\nrnYiKv0zfoyV4UffgnB4bSRMFO+Uw/70ru6l6iliInsHuNEnUedGJp7xFr08DkFx\nNavwwtwvL25EzrdrkGKZlm8yPCJUQ/+LP/Pjwlzk/4y2WE81l7JECKYSaKKCIetx\nwmhjvHcculQejsS0i+bLe9XowseR6zo1NP11uzzH3201oH42xFZPC7b4msjSLK06\nsSD6WfWoJUvbTInqi6Dnx1pxEtjvW8OpwsVD+v8BaQKBgQD5UClf6DH07a1l5SPK\nV8ZsdtHv9IpTFssePYt1/qyNWZdIxrnBjfV8eQMwxJrHIteWC9CFEQePwU7uOOVB\n27dVKvMhoCSzhCJl5alWVBCjRsEUBjO6jhvRgvGciJO3n+4+jVYIglLdwQj/zZyh\nH88CBS/6BGv5KMJ9UEkcr7+LUwKBgQC67/h5tTDnWc4IYcNPZr3kq3iVOfcior8+\n1Ix91cenPAdq+Z7ARIalG3Rt3G+J7qiLkhf7heH4UoSo2yPvmgL+/l/5969sS/ux\nbWcPi6Dbm8iNU2qGf0KW+G5eULab01wLV0szJlE5wcCa7SC2jeiFn1UhqI0NTloz\n1NOWwvhReQKBgAGYDJurXV5mgpxLKb5qbz9URyVUl+nOFIBd/l1DwpCoyPnTI27k\nXHRuRaHzL9YkF+LCspOXN0gpATsuq/CO2g42VxWY84MeTiX+oOWHZg/VLPjWzU/d\nBrqBLtBEY0ViRWCrAKjPRH5cdJVGGEFDdcxagiMEEjimlQ++CqmfSgc3AoGAEPaT\nqp+ph2Tb0GDmsz7Ufnqc35W5+legWRg6g3SxwFgvKCLsp+/P9A2QvCNjr7WLb9ba\n/EUC42DBjv0LvsNQAEme9fTm40Hl3gzabEu0VhlF0qU+JmRH66ExirdySqOcV58d\nQM/6UO5nBuf7rvUjo3R46iv8WLfCca+fX6/jjqkCgYAsMAmG/9ub7kj7bv1ATQVH\nSXmWHC7/6KHOWOoVuf4Wlq5SKhWSZuM46LyhTRrME56cqroW0bBfZMzcfbH+59ZU\nhGkwUAX4kXQ8nwtsoB8PDv7wrWq9ifLeW/gRVszknBCjTuW0vnHHyOKhemJg75DJ\nZQ0svhaaMPgFgLUUSajvyw==\n-----END PRIVATE KEY-----\n",
    "client_email": "affiliate-website@stone-nuance-453503-j2.iam.gserviceaccount.com",
    "client_id": "110423948972073502869",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/affiliate-website%40stone-nuance-453503-j2.iam.gserviceaccount.com"
};

// DOM Elements
const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('searchInput');
const filtersBar = document.querySelector('.filters-bar');
const dealsCount = document.querySelector('.deals-count');

// State
let products = [];
let currentCategory = 'All';
let currentSort = 'recent';
let categories = new Set(['All']);
let currentPage = 1;
const dealsPerPage = 10;
let totalPages = 1;

// Remove context menu variables

// Format time since posting
function getTimeSince(dateEntered) {
    const now = new Date();
    const enteredDate = new Date(dateEntered);
    
    // If the date is in the future, return "New"
    if (enteredDate > now) {
        return 'New';
    }
    
    const diffHours = Math.floor((now - enteredDate) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
        return `${diffHours} hrs ago`;
    } else {
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
}

// Get distinct categories from products
function getDistinctCategories(products) {
    const distinctCategories = new Set(['All']);
    products.forEach(product => {
        if (product.category && product.approve) {
            distinctCategories.add(product.category);
        }
    });
    return Array.from(distinctCategories);
}

// Create category filter buttons
function createCategoryButtons(categories) {
    filtersBar.innerHTML = categories.map(category => `
        <button class="filter-btn ${category === currentCategory ? 'active' : ''}">${category}</button>
    `).join('');

    // Add event listeners to new buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.textContent;
            filterAndSortProducts();
        });
    });
}

// Initialize dropdown functionality
function initializeDropdowns() {
    // Sort By dropdown
    const sortByDropdown = document.querySelector('.filter-dropdown:nth-child(1)');
    if (sortByDropdown) {
        // Create dropdown content if it doesn't exist
        let dropdownContent = sortByDropdown.querySelector('.dropdown-content');
        if (!dropdownContent) {
            dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            sortByDropdown.appendChild(dropdownContent);
        }

        // Update sort options
        const sortOptions = ['Recent', 'Hotness'];
        dropdownContent.innerHTML = sortOptions.map(option => `
            <div class="dropdown-item ${currentSort === option.toLowerCase() ? 'active' : ''}" data-sort="${option.toLowerCase()}">
                ${option}
                ${currentSort === option.toLowerCase() ? '<i class="fas fa-check"></i>' : ''}
            </div>
        `).join('');

        // Update dropdown button text
        const buttonText = sortByDropdown.querySelector('.button-text') || document.createElement('span');
        buttonText.className = 'button-text';
        buttonText.textContent = 'Deals Sort By: ' + (currentSort === 'recent' ? 'Recent' : 'Hotness');
        if (!sortByDropdown.querySelector('.button-text')) {
            sortByDropdown.insertBefore(buttonText, sortByDropdown.querySelector('i'));
        }

        // Toggle dropdown visibility
        sortByDropdown.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-item')) {
                const wasActive = sortByDropdown.classList.contains('active');
                // Close all dropdowns first
                document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    dropdown.querySelector('.dropdown-content').style.display = 'none';
                });
                if (!wasActive) {
                    sortByDropdown.classList.add('active');
                    dropdownContent.style.display = 'block';
                }
            }
        });

        // Handle sort selection
        dropdownContent.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const selectedSort = item.dataset.sort;
                currentSort = selectedSort;
                
                // Update dropdown items
                dropdownContent.querySelectorAll('.dropdown-item').forEach(dropItem => {
                    dropItem.classList.remove('active');
                    dropItem.querySelector('i')?.remove();
                });
                item.classList.add('active');
                item.innerHTML = `${selectedSort.charAt(0).toUpperCase() + selectedSort.slice(1)} <i class="fas fa-check"></i>`;
                
                // Update button text
                buttonText.textContent = 'Deals Sort By: ' + (selectedSort === 'recent' ? 'Recent' : 'Hotness');

                filterAndSortProducts();
                sortByDropdown.classList.remove('active');
                dropdownContent.style.display = 'none';
            }
        });
    }

    // More Filters dropdown
    const moreFiltersDropdown = document.querySelector('.filter-dropdown:nth-child(2)');
    if (moreFiltersDropdown) {
        let dropdownContent = moreFiltersDropdown.querySelector('.dropdown-content');
        if (!dropdownContent) {
            dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';
            moreFiltersDropdown.appendChild(dropdownContent);
        }

        const buttonText = moreFiltersDropdown.querySelector('.button-text') || document.createElement('span');
        buttonText.className = 'button-text';
        // Set initial text based on currentCategory state (default to 'Categories')
        buttonText.textContent = (currentCategory === 'All') ? 'Categories' : `Categories ${currentCategory}`;
        if (!moreFiltersDropdown.querySelector('.button-text')) {
            moreFiltersDropdown.insertBefore(buttonText, moreFiltersDropdown.querySelector('i'));
        }

        function updateCategoryDropdown() {
            const categoryOptions = getDistinctCategories(products);
            // Map categories, treating 'All' internally but displaying as 'Categories' if it's the current one
            dropdownContent.innerHTML = categoryOptions.map(category => {
                const displayCategory = (category === 'All' && currentCategory === 'All') ? 'All Categories' : category;
                const isActive = category === currentCategory;
                return `
                <div class="dropdown-item ${isActive ? 'active' : ''}" data-category="${category}">
                    ${displayCategory}
                    ${isActive ? '<i class="fas fa-check"></i>' : ''}
                </div>
            `;
            }).join('');
        }

        moreFiltersDropdown.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-item')) {
                const wasActive = moreFiltersDropdown.classList.contains('active');
                document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const content = dropdown.querySelector('.dropdown-content');
                    if(content) content.style.display = 'none';
                });
                if (!wasActive) {
                    updateCategoryDropdown(); 
                    moreFiltersDropdown.classList.add('active');
                    dropdownContent.style.display = 'block';
                }
            }
        });

        dropdownContent.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item) {
                const selectedCategory = item.dataset.category;
                currentCategory = selectedCategory; // Update state
                
                // Update button text: Show 'Categories' if 'All' is selected, else 'Category: [Name]'
                buttonText.textContent = (selectedCategory === 'All') ? 'Categories' : `Category: ${selectedCategory}`;

                // Update URL with the selected category
                const url = new URL(window.location);
                if (selectedCategory === 'All') {
                    url.searchParams.delete('category');
                } else {
                    url.searchParams.set('category', selectedCategory);
                }
                window.history.pushState({}, '', url);

                // Update active state in filter bar (if exists)
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.textContent === selectedCategory);
                });

                filterAndSortProducts(); // Refilter products
                moreFiltersDropdown.classList.remove('active');
                dropdownContent.style.display = 'none';
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-dropdown')) {
            document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            });
        }
    });
}

// Add pagination controls
function createPaginationControls() {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;

    const totalFilteredProducts = products.filter(product => 
        product.approve && 
        (currentCategory === 'All' || product.category.toLowerCase() === currentCategory.toLowerCase())
    ).length;

    totalPages = Math.ceil(totalFilteredProducts / dealsPerPage);
    
    let paginationHTML = '';
    
    // --- SEO-Friendly Pagination Links --- 
    
    // Previous page link
    const prevPageUrl = new URL(window.location);
    if (currentPage > 1) {
        prevPageUrl.searchParams.set('page', (currentPage - 1).toString());
        paginationHTML += `<a href="${prevPageUrl.toString()}" class="page-btn prev" rel="prev">
            <i class="fas fa-chevron-left"></i>
        </a>`;
    } else {
        // Still use a span for disabled state, but styled like a button
        paginationHTML += `<span class="page-btn prev disabled">
            <i class="fas fa-chevron-left"></i>
        </span>`;
    }

    // Function to create page link URLs
    const createPageUrl = (pageNumber) => {
        const url = new URL(window.location);
        url.searchParams.set('page', pageNumber.toString());
        return url.toString();
    };

    // First page link (always a link)
    paginationHTML += `<a href="${createPageUrl(1)}" class="page-btn ${currentPage === 1 ? 'active' : ''}" ${currentPage === 1 ? 'aria-current="page"' : ''}>1</a>`;

    // Ellipsis and middle pages
    if (totalPages > 1) {
        if (currentPage > 3) {
            paginationHTML += '<span class="ellipsis">...</span>';
        }

        // Determine range of links to show around current page
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            // Add rel attributes for pages adjacent to current
            let relAttr = '';
            if (i === currentPage - 1) relAttr = ' rel="prev"';
            if (i === currentPage + 1) relAttr = ' rel="next"';
            
            paginationHTML += `<a href="${createPageUrl(i)}" class="page-btn ${currentPage === i ? 'active' : ''}" ${currentPage === i ? 'aria-current="page"' : ''}${relAttr}>${i}</a>`;
        }

        if (currentPage < totalPages - 2) {
            paginationHTML += '<span class="ellipsis">...</span>';
        }

        // Last page link (always a link, except if it's page 1)
        if (totalPages > 1) {
            paginationHTML += `<a href="${createPageUrl(totalPages)}" class="page-btn ${currentPage === totalPages ? 'active' : ''}" ${currentPage === totalPages ? 'aria-current="page"' : ''} ${currentPage < totalPages ? 'rel="next"' : ''}>${totalPages}</a>`;
        }
    }

    // Next page link
    const nextPageUrl = new URL(window.location);
    if (currentPage < totalPages) {
        nextPageUrl.searchParams.set('page', (currentPage + 1).toString());
        paginationHTML += `<a href="${nextPageUrl.toString()}" class="page-btn next" rel="next">
            <i class="fas fa-chevron-right"></i>
        </a>`;
    } else {
        // Disabled state span
        paginationHTML += `<span class="page-btn next disabled">
            <i class="fas fa-chevron-right"></i>
        </span>`;
    }
    // --- End SEO-Friendly Links ---

    paginationContainer.innerHTML = paginationHTML;

    // Add event listeners ONLY to pagination links (<a> tags)
    paginationContainer.querySelectorAll('a.page-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default link navigation
            e.preventDefault(); 
            
            // Don't do anything if clicking the active page link
            if (link.classList.contains('active')) return; 

            const url = new URL(link.href);
            const pageParam = url.searchParams.get('page');
            
            if (pageParam) {
                currentPage = parseInt(pageParam);
                filterAndSortProducts(); // Refilter/render products for the new page
                window.scrollTo(0, 0); // Scroll to top
                
                // Update URL in browser history without full page reload
                window.history.pushState({ path: url.toString() }, '', url.toString());
            }
        });
    });
}

// Update filterAndSortProducts function
function filterAndSortProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    let filtered = products.filter(product => 
        product.approve && 
        (currentCategory === 'All' || product.category.toLowerCase() === currentCategory.toLowerCase()) &&
        (
            product.item.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.company.toLowerCase().includes(searchTerm)
        )
    );

    // Sort products based on current sort option
    if (currentSort === 'hotness') {
        filtered.sort((a, b) => b.discount - a.discount);
    } else {
        filtered.sort((a, b) => new Date(b.dateEntered) - new Date(a.dateEntered));
    }

    // Paginate the results
    const startIndex = (currentPage - 1) * dealsPerPage;
    const paginatedProducts = filtered.slice(startIndex, startIndex + dealsPerPage);

    updateDealsCount(filtered);
    renderProducts(paginatedProducts);
    createPaginationControls();
}

// Fetch data from Google Sheets
async function fetchProducts() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (!data.values || data.values.length <= 1) {
            throw new Error('No deals found');
        }
        
        // Skip header row and process data
        products = data.values.slice(1).map(row => ({
            ID: row[0],
            dateEntered: row[1],
            item: row[2],
            discountPrice: parseFloat(row[3]),
            fullPrice: parseFloat(row[4]),
            promoCode: row[5] || '',
            picture: row[6],
            link: row[7],
            dateE: new Date(row[8]),
            approve: row[9] === 'TRUE',
            category: (row[10] || 'Other').trim(),
            company: row[11] || 'Unknown',
            // Calculate discount percentage
            discount: Math.round(((parseFloat(row[4]) - parseFloat(row[3])) / parseFloat(row[4])) * 100)
        }));

        const categories = getDistinctCategories(products);
        createCategoryButtons(categories);
        initializeDropdowns();
        filterAndSortProducts();
    } catch (error) {
        console.error('Error fetching data:', error);
        productsContainer.innerHTML = '<p class="error">Error loading deals. Please try again later.</p>';
    }
}

// Update deals count
function updateDealsCount(deals) {
    const activeDeals = deals.filter(deal => 
        deal.approve && new Date() <= deal.dateE
    ).length;
    dealsCount.textContent = ``;
}

// Format price with commas
function formatPrice(price) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}

// Calculate time remaining
function getTimeRemaining(dateE) {
    const now = new Date();
    const difference = dateE - now;
    
    if (difference <= 0) return 'Expired';
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
}

// Get company logo URL
function getCompanyLogo(company) {
    return `${company}.jpg`;
}

// Add this function at the top level of the script
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Discount code copied to clipboard!';
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
}

// Add share functionality
function shareOnPlatform(platform, url, title) {
    let shareUrl;
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
            break;
        case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`;
            break;
    }
    if (platform === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'Link copied to clipboard!';
            document.body.appendChild(notification);
            setTimeout(() => notification.classList.add('show'), 10);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    } else {
        window.open(shareUrl, '_blank');
    }
}

// Add toggle share buttons functionality
function toggleShareButtons(shareId) {
    const targetButtons = document.getElementById(`share-buttons-${shareId}`);
    const targetArrow = targetButtons.previousElementSibling.querySelector('.share-arrow');
    
    // Close all other share buttons first
    document.querySelectorAll('.share-buttons').forEach(buttons => {
        if (buttons.id !== `share-buttons-${shareId}`) {
            buttons.style.display = 'none';
            buttons.previousElementSibling.querySelector('.share-arrow').classList.remove('active');
        }
    });

    // Toggle the clicked share buttons
    if (targetButtons.style.display === 'flex') {
        targetButtons.style.display = 'none';
        targetArrow.classList.remove('active');
    } else {
        targetButtons.style.display = 'flex';
        targetArrow.classList.add('active');
    }
}

// Close share buttons when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.share-container')) {
        document.querySelectorAll('.share-buttons').forEach(buttons => {
            buttons.style.display = 'none';
            buttons.previousElementSibling.querySelector('.share-arrow').classList.remove('active');
        });
    }
});

// Update renderProducts function
function renderProducts(productsToRender) {
    const filteredProducts = productsToRender
        .filter(product => product.approve)
        .filter(product => currentCategory === 'All' || product.category.toLowerCase() === currentCategory.toLowerCase());

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-deals">No deals found matching your criteria.</p>';
        return;
    }

    productsContainer.innerHTML = filteredProducts
        .map((product, index) => {
            const isExpired = new Date() > product.dateE;
            const discountedPrice = formatPrice(product.discountPrice);
            const originalPrice = formatPrice(product.fullPrice);
            const timeSincePosted = getTimeSince(product.dateEntered);
            const timeRemaining = getTimeRemaining(product.dateE);
            const truncatedTitle = product.item.length > 52 
            ? product.item.substring(0, 52) + '...' 
            : (product.item.length < 40 ? product.item + '<br><br>' : product.item);
            
            const encodedTitle = product.item.replace(/\s+/g, '-');
            const detailsUrl = `details.html?id=${product.ID}&item=${encodedTitle}`;
            
            return `
                <a href="${detailsUrl}" class="product-card ${isExpired ? 'expired' : ''}" data-product-id="${product.ID}" data-product-url="${product.link}">
                    <div class="card-header">
                        <div class="post-meta">
                            ${product.company} · ${timeSincePosted}
                        </div>
                        <img src="${product.picture}" alt="${product.item}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h2 class="product-title">${truncatedTitle}</h2>
                        <div class="product-bottom-content">
                            <div class="product-price">
                                <div class="price-line">
                                    <span class="current-price">${discountedPrice}</span>
                                    <span class="original-price">${originalPrice}</span>
                                </div>
                                <div class="price-actions">
                                    ${product.discount > 0 ? 
                                    `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
                                    ${product.promoCode ? `
                                        <button class="copy-btn" onclick="event.stopPropagation(); event.preventDefault(); copyToClipboard('${product.promoCode}')" ${isExpired ? 'disabled' : ''}>
                                            <i class="fas fa-copy"></i> COPY CODE
                                        </button>
                                    ` : ''}
                                    <div class="share-container">
                                        <button class="share-btn-main" onclick="event.stopPropagation(); event.preventDefault(); toggleShareButtons(${index})">
                                            <img src="Arrow.png" alt="Share" class="share-arrow">
                                        </button>
                                        <div class="share-buttons" id="share-buttons-${index}" style="display: none;">
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('copy', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fas fa-link"></i>
                                            </button>
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('whatsapp', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fab fa-whatsapp"></i>
                                            </button>
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('facebook', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fab fa-facebook-f"></i>
                                            </button>
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('email', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fas fa-envelope"></i>
                                            </button>
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('twitter', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fab fa-twitter"></i>
                                            </button>
                                            <button onclick="event.stopPropagation(); event.preventDefault(); shareOnPlatform('pinterest', '${product.link}', '${product.item}')" class="share-option">
                                                <i class="fab fa-pinterest-p"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="deal-meta">
                                    <!--<span class="time-remaining">
                                        <i class="fas fa-clock"></i> ${timeRemaining}
                                    </span>-->
                                    <span class="category">
                                        <i class="fas fa-tag"></i> ${product.category}
                                    </span>
                                </div>
                            </div>
                           ${isExpired ? `
                                <button class="buy-button expired" disabled>EXPIRED</button>
                            ` : `
                                <button class="buy-button">
                                    VIEW DETAILS
                                </button>
                            `}
                        </div>
                    </div>
                </a>
            `;
        })
        .join('');
}

// Event listeners
searchInput.addEventListener('input', filterAndSortProducts);

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle newsletter signup
async function handleNewsletterSignup(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    const submitButton = document.querySelector('.newsletter-signup button');
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    try {
        // Get access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: await generateJWT()
            })
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get access token');
        }

        const { access_token } = await tokenResponse.json();

        // First, get the current values to determine the next row
        const getResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${EMAIL_SHEET_ID}/values/Sheet1!A:B`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }
        );

        if (!getResponse.ok) {
            throw new Error('Failed to access spreadsheet');
        }

        const getData = await getResponse.json();
        const nextRow = (getData.values ? getData.values.length : 0) + 1;

        // Append the email to the sheet
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${EMAIL_SHEET_ID}/values/Sheet1!A${nextRow}:B${nextRow}?valueInputOption=USER_ENTERED`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    range: `Sheet1!A${nextRow}:B${nextRow}`,
                    values: [[email, new Date().toISOString()]]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error('Failed to append data');
        }

        const data = await response.json();
        
        if (data) {
            emailInput.value = '';
            alert('Thank you for subscribing!');
        } else {
            throw new Error('No response data');
        }
    } catch (error) {
        console.error('Error subscribing:', error);
        alert('Failed to subscribe. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }
}

// Generate JWT for service account authentication
async function generateJWT() {
    const header = {
        alg: 'RS256',
        typ: 'JWT'
    };

    const now = Math.floor(Date.now() / 1000);
    const claim = {
        iss: SERVICE_ACCOUNT.client_email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: SERVICE_ACCOUNT.token_uri,
        exp: now + 3600,
        iat: now
    };

    const headerEncoded = btoa(JSON.stringify(header));
    const claimEncoded = btoa(JSON.stringify(claim));

    const signatureInput = `${headerEncoded}.${claimEncoded}`;
    const signature = await signRS256(signatureInput, SERVICE_ACCOUNT.private_key);

    return `${signatureInput}.${signature}`;
}

// Sign data using RS256
async function signRS256(input, privateKey) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(privateKey);
    const messageData = encoder.encode(input);

    const cryptoKey = await crypto.subtle.importKey(
        'pkcs8',
        keyData,
        {
            name: 'RSASSA-PKCS1-v1_5',
            hash: 'SHA-256'
        },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        cryptoKey,
        messageData
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// Add event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSignup);
    }
});

// Update the initialize page function to handle URL params
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location);
    
    const categoryParam = url.searchParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
    }
    
    // Read page number from URL on initial load
    const pageParam = url.searchParams.get('page');
    currentPage = pageParam ? parseInt(pageParam) : 1;
    
    fetchProducts();
    
    // Listen for browser back/forward navigation
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.path) {
            const popUrl = new URL(event.state.path);
            const popPageParam = popUrl.searchParams.get('page');
            const popCategoryParam = popUrl.searchParams.get('category');
            
            currentPage = popPageParam ? parseInt(popPageParam) : 1;
            currentCategory = popCategoryParam || 'All'; 
            
            // Update UI state without fetching again if only page changed
            // Or re-fetch if category changed or needed
            filterAndSortProducts(); 
        } else {
            // Handle cases where state might be null (e.g., initial load)
            const currentUrl = new URL(window.location);
            const page = currentUrl.searchParams.get('page');
            const category = currentUrl.searchParams.get('category');
            currentPage = page ? parseInt(page) : 1;
            currentCategory = category || 'All';
            filterAndSortProducts();
        }
    });
}); 
