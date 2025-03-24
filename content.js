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
    brackets1.style.color = 'black'; // Keep the brackets black
    brackets2.style.color = 'black'; // Keep the brackets black

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
