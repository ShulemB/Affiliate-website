// Constants from script.js
const SHEET_ID = '1aQhyXukUEBfZFyLnj65MVHXdyOhhlSkpoRIpEcSjnF8';
const API_KEY = 'AIzaSyCmca9yVkoX0DtiduzZdLGxVJ0n6tjbY7g';
const SHEET_NAME = 'Sheet1';

// DOM Elements
const productDetailsContainer = document.querySelector('.product-details-container');

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

// Format time since posting
function getTimeSince(dateEntered) {
    const now = new Date();
    const enteredDate = new Date(dateEntered);
    
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

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Discount code copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
}

// Share functionality
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

// Load product details
async function loadProductDetails() {
    try {
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            window.location.href = 'index.html';
            return;
        }

        // Fetch data from Google Sheets
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (!data.values || data.values.length <= 1) {
            throw new Error('No deals found');
        }

        // Find the product with matching ID
        const product = data.values.slice(1).find(row => row[0] === productId);
        
        if (!product) {
            throw new Error('Product not found');
        }

        // Process product data
        const productData = {
            ID: product[0],
            dateEntered: product[1],
            item: product[2],
            discountPrice: parseFloat(product[3]),
            fullPrice: parseFloat(product[4]),
            promoCode: product[5] || '',
            picture: product[6],
            link: product[7],
            dateE: new Date(product[8]),
            approve: product[9] === 'TRUE',
            category: (product[10] || 'Other').trim(),
            company: product[11] || 'Unknown',
            discount: Math.round(((parseFloat(product[4]) - parseFloat(product[3])) / parseFloat(product[4])) * 100)
        };

        // Check if product is expired
        const isExpired = new Date() > productData.dateE;
        const discountedPrice = formatPrice(productData.discountPrice);
        const originalPrice = formatPrice(productData.fullPrice);
        const timeSincePosted = getTimeSince(productData.dateEntered);
        const timeRemaining = getTimeRemaining(productData.dateE);

        // Render product details
        productDetailsContainer.innerHTML = `
            <div class="product-details ${isExpired ? 'expired' : ''}">
                <div class="product-details-header">
                    <div class="product-meta">
                        <span class="company">${productData.company}</span>
                        <span class="time-posted">${timeSincePosted}</span>
                    </div>
                    <div class="product-image-container">
                        <img src="${productData.picture}" alt="${productData.item}" class="product-details-image">
                    </div>
                </div>
                <div class="product-details-content">
                    <h1 class="product-details-title">${productData.item}</h1>
                    <div class="product-details-price">
                        <div class="price-line">
                            <span class="current-price">${discountedPrice}</span>
                            <span class="original-price">${originalPrice}</span>
                        </div>
                        ${productData.discount > 0 ? 
                            `<span class="discount-badge">${productData.discount}% OFF</span>` : ''}
                    </div>
                    <div class="product-details-meta">
                        <span class="time-remaining">
                            <i class="fas fa-clock"></i> ${timeRemaining}
                        </span>
                        <span class="category">
                            <i class="fas fa-tag"></i> ${productData.category}
                        </span>
                    </div>
                    ${productData.promoCode ? `
                        <div class="promo-code-container">
                            <span class="promo-code-label">Promo Code:</span>
                            <div class="promo-code">
                                <span>${productData.promoCode}</span>
                                <button class="copy-btn" onclick="copyToClipboard('${productData.promoCode}')" ${isExpired ? 'disabled' : ''}>
                                    <i class="fas fa-copy"></i> COPY CODE
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    <div class="share-section">
                        <span class="share-text">Share this deal:</span>
                        <div class="share-buttons">
                            <button onclick="shareOnPlatform('copy', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fas fa-link"></i>
                            </button>
                            <button onclick="shareOnPlatform('whatsapp', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                            <button onclick="shareOnPlatform('facebook', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fab fa-facebook-f"></i>
                            </button>
                            <button onclick="shareOnPlatform('email', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fas fa-envelope"></i>
                            </button>
                            <button onclick="shareOnPlatform('twitter', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fab fa-twitter"></i>
                            </button>
                            <button onclick="shareOnPlatform('pinterest', '${productData.link}', '${productData.item}')" class="share-option">
                                <i class="fab fa-pinterest-p"></i>
                            </button>
                        </div>
                    </div>
                    ${isExpired ? `
                        <button class="buy-button expired" disabled>EXPIRED</button>
                    ` : `
                        <a href="${productData.link}" target="_blank" class="buy-button">
                            Get Deal
                        </a>
                    `}
                </div>
            </div>
        `;

    } catch (error) {
        console.error('Error loading product details:', error);
        productDetailsContainer.innerHTML = `
            <div class="error-message">
                <h2>Error Loading Product</h2>
                <p>We couldn't load the product details. Please try again later.</p>
                <a href="index.html" class="back-button">Back to Deals</a>
            </div>
        `;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadProductDetails); 