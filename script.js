(function() {
    let mediaFiles = [];
    let index = 0;
    
    // Extract media URLs (images & videos)
    document.querySelectorAll('.fileThumb').forEach(el => {
        let mediaUrl = el.href; 
        if (mediaUrl) mediaFiles.push(mediaUrl);
    });

    if (mediaFiles.length === 0) {
        alert("No media files found!");
        return;
    }

    // Create overlay container
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.9)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";
    overlay.style.cursor = "pointer";
    document.body.appendChild(overlay);

    // Media container
    let media = document.createElement("img");
    media.style.maxWidth = "90%";
    media.style.maxHeight = "90%";
    media.style.borderRadius = "8px";
    overlay.appendChild(media);

    function updateMedia() {
        let url = mediaFiles[index];
        if (url.endsWith(".webm") || url.endsWith(".mp4")) {
            let video = document.createElement("video");
            video.src = url;
            video.controls = true;
            video.autoplay = true;
            video.style.maxWidth = "90%";
            video.style.maxHeight = "90%";
            overlay.innerHTML = ""; 
            overlay.appendChild(video);
        } else {
            media.src = url;
            overlay.innerHTML = ""; 
            overlay.appendChild(media);
        }
    }

    updateMedia(); // Show first media

    // Navigation with Arrow Keys
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            index = (index + 1) % mediaFiles.length;
            updateMedia();
        } else if (event.key === "ArrowLeft") {
            index = (index - 1 + mediaFiles.length) % mediaFiles.length;
            updateMedia();
        } else if (event.key === "Escape") {
            overlay.remove();
        }
    });
})();
