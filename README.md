# lewp

lewp is a javascript webapp which will download all images hosted on a specified webpage.

## Features

- **Smart Image Detection**: Extracts images from multiple sources including:
  - `<img>` tags (including `data-src` and lazy-loaded images)
  - `srcset` attributes for responsive images
  - `<picture>` elements
  - CSS background images
  - Preloaded images
- **Image Filtering**: Automatically filters out small tracking pixels and icons (minimum 100x100 pixels)
- **Progress Bar**: Visual feedback during the download process
- **Error Handling**: Verbose error messages to help diagnose issues
- **File List**: Shows all images that have been grabbed with their dimensions and sizes
- **Robust Downloads**: Validates that files are actual images before including them in the zip

## Usage

1. Open `index.html` in a web browser
2. Enter a URL of a webpage containing images
3. Click "Download"
4. Wait for the progress bar to complete
5. Review the list of found images
6. The zip file will be automatically downloaded

**Note**: First download will likely invoke browser permission to download. Once allowed, the process is automatic.
