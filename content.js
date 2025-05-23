(function() {

    let button = document.createElement('a'); // Create anchor element
    button.innerText = ''; // Clear innerText
    button.style.zIndex = '99999';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.href = '#'; // Prevent navigation

    // Create a span element to hold the text
    let text = document.createElement('span');
    text.innerText = 'Slideshow';

    // Create span elements for the brackets
    let brackets1 = document.createElement('span');
    let brackets2 = document.createElement('span');
    brackets1.innerText = ' ['; // Set the left bracket
    brackets2.innerText = ']'; // Set the right bracket
    brackets1.style.color = '#800000'; // Keep the brackets black
    brackets2.style.color = '#800000'; // Keep the brackets black

    // Append the brackets and text to the anchor
    button.appendChild(brackets1);
    button.appendChild(text);
    button.appendChild(brackets2);

    // Add hover effect
    button.onmouseover = () => {
        text.style.color = 'red'; // Change color of text when hovered
    };
    button.onmouseout = () => {
        text.style.color = ''; // Revert text color when not hovered
    };

    // Add an event listener to trigger your JavaScript when clicked
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior (page navigation)
        // Your custom JavaScript logic goes here
        console.log('Slideshow triggered!');
        // You can trigger your slideshow function here instead of `console.log`
    });

    setTimeout(() => {
        let navLinksDesktop = document.querySelector('.navLinks.desktop');
        if (navLinksDesktop) {
            // Get the second-to-last child element
            let secondToLastElement = navLinksDesktop.children[navLinksDesktop.children.length - 4];
            
            // Insert the button before the second-to-last element
            navLinksDesktop.insertBefore(button, secondToLastElement);
        } else {
            console.error('The div with class "navLinks desktop" was not found.');
        }
    }, 10);

    button.onclick = function() {
        let mediaFiles = [];
        let index = 0;
        
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

        let isMuted = false; // Track mute state
        let isPaused = false; // Track the play/pause state of the video
        let currentMedia = null; // Store the current media element (video or image)

        function updateMedia() {
            let url = mediaFiles[index];
            
            // Clear previous content
            overlay.innerHTML = "";
        
            // Add the counter
            let counter = document.createElement("div");
            counter.innerText = `${index + 1} / ${mediaFiles.length}`;
            counter.style.position = "absolute";
            counter.style.bottom = "10px";
            counter.style.left = "10px";
            counter.style.color = "white";
            counter.style.fontSize = "16px";
            counter.style.background = "rgba(0, 0, 0, 0.5)";
            counter.style.padding = "5px 10px";
            counter.style.borderRadius = "8px";
            overlay.appendChild(counter);
        
            let media;
            if (url.endsWith(".webm") || url.endsWith(".mp4")) {
                media = document.createElement("video");
                media.src = url;
                media.controls = true;
                media.autoplay = true;
                media.loop = true;
                media.muted = isMuted;
            } else {
                media = document.createElement("img");
                media.src = url;
            }
            media.style.maxWidth = "90%";
            media.style.maxHeight = "90%";
            overlay.appendChild(media);
                    // Store the current media reference
                    currentMedia = media;
            // Keydown events for mute, navigation, and download
            document.onkeydown = function(event) {
                if (event.key === "m") {
                    isMuted = !isMuted;
                    if (currentMedia && currentMedia.tagName === "VIDEO") {
                        currentMedia.muted = isMuted;
                    }
                    console.log(isMuted ? "Muted for all videos" : "Unmuted for all videos");

                } else if (event.key === " ") { // Space key for pause/play
                    event.preventDefault(); // Prevent scrolling when the spacebar is pressed

                    if (currentMedia && currentMedia.tagName === "VIDEO") {
                        if (currentMedia.paused) {
                            currentMedia.play();
                        } else {
                            currentMedia.pause();
                        }
                        console.log(currentMedia.paused ? "Video Paused" : "Video Playing");
                    }            } else if (event.key === " ") { // Space key for pause/play
                        if (currentMedia && currentMedia.tagName === "VIDEO") {
                            if (currentMedia.paused) {
                                currentMedia.play();
                            } else {
                                currentMedia.pause();
                            }
                            console.log(currentMedia.paused ? "Video Paused" : "Video Playing");
                        }
                    
                } else if (event.key === "d") { // Download media
                    downloadMedia(url);
                }
            };
        }
        
        function downloadMedia(url) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';  // This ensures the response is a file (image/video)
        
            xhr.onload = function() {
                const blob = xhr.response;
                const a = document.createElement('a');
                const urlObject = URL.createObjectURL(blob); // Create an object URL for the file
        
                a.href = urlObject;
                a.download = url.split('/').pop();  // Extract the filename from the URL
                a.click();  // Trigger the download
        
                // Cleanup: revoke the object URL after the download
                URL.revokeObjectURL(urlObject);
            };
        
            xhr.onerror = function() {
                console.error('Failed to download the file');
            };
        
            xhr.send();
        }

        updateMedia();

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
    };

    document.body.appendChild(button);
})();
