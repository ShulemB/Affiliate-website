# Affiliate Deals Website

A simple and modern affiliate deals website that pulls data from Google Sheets. This website allows you to showcase affiliate products with their prices, promotional codes, and discounts in a responsive grid layout.

## Features

- Responsive grid layout
- Real-time search functionality
- Filtering options (All Items, Active Deals, Highest Discount)
- Automatic expired deals handling
- Promo code display
- Discount badges
- Mobile-friendly design

## Setup Instructions

1. **Google Sheets Setup**
   - Create a new Google Sheet
   - Add the following column headers in the first row:
     - item
     - price
     - promoCode
     - picture
     - link
     - discount
     - dateE
     - approve
   - Fill in your product data following these columns
   - Make sure the sheet is publicly accessible (View only)

2. **Google Sheets API Setup**
   - Go to the [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google Sheets API
   - Create credentials (API key)
   - Copy your API key

3. **Website Configuration**
   - Open `script.js`
   - Replace `YOUR_SHEET_ID` with your Google Sheet ID (found in the sheet's URL)
   - Replace `YOUR_API_KEY` with your Google Sheets API key
   - Update `SHEET_NAME` if your sheet name is different from "Sheet1"

## Google Sheets Format

Format your Google Sheet with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| item | Product name | "Wireless Headphones" |
| price | Original price | 99.99 |
| promoCode | Promotional code | "SAVE20" |
| picture | Image URL | "https://example.com/image.jpg" |
| link | Affiliate link | "https://example.com/product" |
| discount | Discount percentage | 20 |
| dateE | Expiration date | "2024-12-31" |
| approve | Show/hide product | TRUE |

## Running the Website

Simply open the `index.html` file in a web browser. For development, you may want to use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Customization

- Edit `styles.css` to customize the appearance
- Modify the filter options in `index.html`
- Adjust the card layout and information display in `script.js`

## Notes

- Make sure all product images are served over HTTPS
- Keep your API key secure and implement proper restrictions in Google Cloud Console
- Regular updates to the Google Sheet will reflect automatically on the website
- The website automatically handles expired deals 