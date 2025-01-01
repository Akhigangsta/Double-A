document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");
    const postTitle = document.getElementById("post-title");
    const postContent = document.getElementById("post-content");
    const latestPostsSection = document.getElementById("latest-posts");
    const fullPostSection = document.getElementById("full-post");
    const backButton = document.getElementById("back-button");

    // Fetch and display posts
    function loadPosts() {
        fetch("posts.json")
            .then((response) => response.json())
            .then((posts) => {
                postsContainer.innerHTML = ""; // Clear previous content
                posts.forEach((post) => {
                    const postElement = document.createElement("article");
                    postElement.className = "post";
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.summary}</p>
                        <button onclick="viewPost(${post.id})">Read More</button>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch((error) => console.error("Error loading posts:", error));
    }

    // View individual post
    window.viewPost = function (postId) {
        fetch("posts.json")
            .then((response) => response.json())
            .then((posts) => {
                const post = posts.find((p) => p.id === postId);
                if (post) {
                    postTitle.textContent = post.title;
                    postContent.innerHTML = post.content
                        .map((para) => `<p>${para}</p>`)
                        .join("");
                    latestPostsSection.classList.add("hidden");
                    fullPostSection.classList.remove("hidden");
                }
            })
            .catch((error) => console.error("Error fetching post:", error));
    };

    // Back to latest posts
    backButton.addEventListener("click", () => {
        fullPostSection.classList.add("hidden");
        latestPostsSection.classList.remove("hidden");
    });

    // Initialize
    loadPosts();
});
