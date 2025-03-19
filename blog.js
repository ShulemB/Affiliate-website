// Blog functionality
const BLOG_SHEET_ID = '1aQhyXukUEBfZFyLnj65MVHXdyOhhlSkpoRIpEcSjnF8';
const BLOG_SHEET_NAME = 'Blog';
const API_KEY = 'AIzaSyCmca9yVkoX0DtiduzZdLGxVJ0n6tjbY7g';

let blogPosts = [];
let currentBlogPage = 1;
const postsPerPage = 9;

// Fetch blog posts from Google Sheets
async function fetchBlogPosts() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${BLOG_SHEET_ID}/values/${BLOG_SHEET_NAME}?key=${API_KEY}`
        );
        const data = await response.json();
        
        if (!data.values || data.values.length <= 1) {
            throw new Error('No blog posts found');
        }
        
        // Skip header row and process data
        blogPosts = data.values.slice(1).map(row => ({
            id: row[0],
            title: row[1],
            excerpt: row[2],
            content: row[3],
            image: row[4],
            author: row[5],
            date: new Date(row[6]),
            category: row[7],
            slug: row[8]
        }));

        renderBlogPosts();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        const blogContainer = document.getElementById('blogPosts');
        if (blogContainer) {
            blogContainer.innerHTML = '<p class="error">Error loading blog posts. Please try again later.</p>';
        }
    }
}

// Render blog posts
function renderBlogPosts() {
    const blogContainer = document.getElementById('blogPosts');
    if (!blogContainer) return;

    const startIndex = (currentBlogPage - 1) * postsPerPage;
    const paginatedPosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

    blogContainer.innerHTML = paginatedPosts.map(post => `
        <article class="blog-card">
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>${post.date.toLocaleDateString()}</span>
                    <span>${post.category}</span>
                </div>
                <h2 class="blog-card-title">
                    <a href="blog-post.html?id=${post.id}">${post.title}</a>
                </h2>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="blog-post.html?id=${post.id}" class="blog-card-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `).join('');

    createBlogPagination();
}

// Create blog pagination
function createBlogPagination() {
    const paginationContainer = document.getElementById('blogPagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<button class="page-btn prev ${currentBlogPage === 1 ? 'disabled' : ''}" ${currentBlogPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;

    // First page
    paginationHTML += `<button class="page-btn ${currentBlogPage === 1 ? 'active' : ''}" data-page="1">1</button>`;

    // Ellipsis and middle pages
    if (totalPages > 1) {
        if (currentBlogPage > 3) {
            paginationHTML += '<span class="ellipsis">...</span>';
        }

        for (let i = Math.max(2, currentBlogPage - 1); i <= Math.min(totalPages - 1, currentBlogPage + 1); i++) {
            paginationHTML += `<button class="page-btn ${currentBlogPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (currentBlogPage < totalPages - 2) {
            paginationHTML += '<span class="ellipsis">...</span>';
        }

        // Last page
        if (totalPages > 1) {
            paginationHTML += `<button class="page-btn ${currentBlogPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</button>`;
        }
    }

    // Next button
    paginationHTML += `<button class="page-btn next ${currentBlogPage === totalPages ? 'disabled' : ''}" ${currentBlogPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;

    paginationContainer.innerHTML = paginationHTML;

    // Add event listeners to pagination buttons
    paginationContainer.querySelectorAll('.page-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.classList.contains('disabled')) return;

            if (button.classList.contains('prev')) {
                currentBlogPage = Math.max(1, currentBlogPage - 1);
            } else if (button.classList.contains('next')) {
                currentBlogPage = Math.min(totalPages, currentBlogPage + 1);
            } else {
                currentBlogPage = parseInt(button.dataset.page);
            }

            renderBlogPosts();
            window.scrollTo(0, 0);
        });
    });
}

// Load individual blog post
function loadBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    const post = blogPosts.find(p => p.id === postId);
    if (!post) {
        window.location.href = 'blog.html';
        return;
    }

    document.title = `${post.title} - Daily Deals`;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postDate').textContent = post.date.toLocaleDateString();
    document.getElementById('postAuthor').textContent = `By ${post.author}`;
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postImage').src = post.image;
    document.getElementById('postImage').alt = post.title;
    document.getElementById('postContent').innerHTML = post.content;
}

// Initialize blog functionality
document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blogPosts');
    const postContent = document.getElementById('postContent');
    
    if (blogContainer) {
        fetchBlogPosts();
    } else if (postContent) {
        fetchBlogPosts().then(() => loadBlogPost());
    }
}); 