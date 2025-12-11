# Service Program Scroller

A mobile-first static webpage for displaying a digital program for religious services, featuring readings and carols/hymns for the audience to follow along with.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Section Navigation**: Navigate between sections using bottom bar controls or table of contents
- **Table of Contents**: Dropdown menu in the top bar for quick section access
- **Text Controls**: 
  - Font size adjustment (small, medium, large)
  - Language selection (English/Korean)
- **Smooth Transitions**: Animated section transitions for better user experience

## Structure

- `index.html` - Main HTML structure
- `css/styles.css` - Stylesheet with mobile-first responsive design
- `js/script.js` - JavaScript for navigation and controls

## Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push this code to the repository
3. Go to Settings > Pages in your GitHub repository
4. Select the branch (usually `main` or `master`) and folder (`/root`)
5. Your site will be available at `https://[username].github.io/[repository-name]`

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Customization

- Edit `index.html` to add/modify sections and content
- Update `css/styles.css` to change colors, fonts, and styling
- Modify `js/script.js` to add additional functionality or translations

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) with support for:
- CSS Grid and Flexbox
- ES6 JavaScript features
- CSS Custom Properties (variables)

