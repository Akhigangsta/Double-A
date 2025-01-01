document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content");
    const latestPostsSection = document.getElementById("latest-posts");
    const fullPostSection = document.getElementById("full-post");
    const backButton = document.getElementById("back-button");

    // Function to show the latest posts section
    function showLatestPosts() {
        fullPostSection.style.display = 'none'; // Hide the full post section
        latestPostsSection.style.display = 'block'; // Show the latest posts section
    }

    // Fetch and display latest posts
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            postsContainer.innerHTML = ''; // Clear previous posts

            // Sort posts by ID (or date if applicable) in descending order
            const sortedPosts = posts.sort((a, b) => b.id - a.id);

            // Slice to get the latest 3 posts
            const latestPosts = sortedPosts.slice(0, 3);

            // Create and display each post
            latestPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.summary}</p>
                    <button onclick="viewPost(${post.id})">Read More</button>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch((error) => console.error('Error fetching posts:', error));

    // Function to view a full post
    function viewPost(postId) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                const post = posts.find((p) => p.id === postId);
                if (post) {
                    postTitle.textContent = post.title; // Set the post title
                    postContent.innerHTML = ''; // Clear previous content

                    // Display the content paragraphs
                    post.content.forEach(paragraph => {
                        const paraElement = document.createElement('p');
                        paraElement.textContent = paragraph;
                        postContent.appendChild(paraElement);
                    });

                    // Add the post date
                const dateElement = document.createElement('p');
                dateElement.style.fontStyle = 'italic';
                dateElement.textContent = `Published on: ${post.date}`;
                postContent.appendChild(dateElement);

                // Add the sources if available
                if (post.source && post.source.length > 0) {
                    const sourceTitle = document.createElement('h4');
                    sourceTitle.textContent = 'Sources:';
                    postContent.appendChild(sourceTitle);
                
                    const sourceList = document.createElement('ul');
                    post.source.forEach(src => {
                        const sourceItem = document.createElement('li');
                        
                        // Check if the source is a URL
                        if (src.startsWith("http://") || src.startsWith("https://")) {
                            const sourceLink = document.createElement('a');
                            sourceLink.href = src;
                            sourceLink.target = '_blank'; // Open in a new tab
                            sourceLink.textContent = src;
                            sourceItem.appendChild(sourceLink);
                        } else {
                            // If it's plain text, display as is
                            sourceItem.textContent = src;
                        }
                
                        sourceList.appendChild(sourceItem);
                    });
                    postContent.appendChild(sourceList);
                }

                // Show the full post and hide the latest posts
                    latestPostsSection.style.display = 'none'; // Hide the latest posts section
                    fullPostSection.style.display = 'block'; // Show the full post section
                }
            })
            .catch(error => console.error('Error fetching post:', error));
    }

    // Add the function to the global window object so it's accessible in onclick
    window.viewPost = viewPost;

    // Back to Homepage button functionality
    backButton.addEventListener("click", () => {
        showLatestPosts(); // Call the function to show the latest posts
    });

    // Initialize the page by showing the latest posts
    showLatestPosts();
});
