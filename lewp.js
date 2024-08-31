document.getElementById('lewpButton').addEventListener('click', async function() {
    const url = document.getElementById('urlInput').value;
    const status = document.getElementById('status');
    status.textContent = "Processing...";

    if (!url) {
        status.textContent = "Please enter a valid URL.";
        return;
    }

    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const images = Array.from(doc.images).map(img => img.src);

        if (images.length === 0) {
            status.textContent = "No images found.";
            return;
        }

        const zip = new JSZip();
        let count = 0;

        images.forEach(async (imgUrl, index) => {
            try {
                const imgResponse = await fetch(imgUrl);
                const imgBlob = await imgResponse.blob();
                const imgName = imgUrl.split('/').pop();
                zip.file(imgName, imgBlob);

                count++;
                if (count === images.length) {
                    zip.generateAsync({ type: 'blob' }).then(function(content) {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(content);
                        link.download = 'images.zip';
                        link.click();
                        status.textContent = "Download complete!";
                    });
                }
            } catch (error) {
                console.error(`Failed to fetch image ${imgUrl}:`, error);
            }
        });
    } catch (error) {
        console.error('Error fetching URL:', error);
        status.textContent = "Error fetching the webpage. Please try again.";
    }
});
