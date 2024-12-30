document.addEventListener("DOMContentLoaded", () => {
    const greeting = document.createElement('p');
    greeting.textContent = "Hello! Thanks for visiting our website.";
    document.querySelector('main').appendChild(greeting);
});

document.addEventListener("DOMContentLoaded", () => {
    // Load posts from localStorage or initialize an empty array
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    const postsContainer = document.getElementById("posts-container");
    const modal = document.getElementById("edit-modal");
    const postTitleInput = document.getElementById("post-title");
    const postContentInput = document.getElementById("post-content");
    const postSourceInput = document.getElementById("post-source");
    const postDateInput = document.getElementById("post-date");
    const savePostButton = document.getElementById("save-post");
    const cancelEditButton = document.getElementById("cancel-edit");
    let editingIndex = null;

    const renderPosts = () => {
        const currentDate = new Date();
        postsContainer.innerHTML = "";

        // Filter and sort posts based on date and limit to the latest 3
        const recentPosts = posts
            .filter((post) => {
                const postDate = new Date(post.date);
                const daysDifference = (currentDate - postDate) / (1000 * 60 * 60 * 24);
                return daysDifference <= 3;
            })
            .slice(-3);

        recentPosts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <div class="meta">Published on: ${post.date}</div>
                <p class="source">${post.source}</p>
                <button class="edit-post" data-index="${index}">Edit</button>
            `;
            postsContainer.appendChild(postElement);
        });

        // Attach event listeners for "Edit" buttons
        document.querySelectorAll(".edit-post").forEach((button) => {
            button.addEventListener("click", (e) => {
                editingIndex = e.target.dataset.index;
                const post = posts[editingIndex];
                postTitleInput.value = post.title;
                postContentInput.value = post.content;
                postSourceInput.value = post.source;
                postDateInput.value = post.date;
                modal.classList.remove("hidden");
            });
        });
    };

    const savePost = () => {
        const newPost = {
            title: postTitleInput.value,
            content: postContentInput.value,
            source: postSourceInput.value,
            date: postDateInput.value,
        };

        if (editingIndex !== null) {
            posts[editingIndex] = newPost; // Update existing post
            editingIndex = null;
        } else {
            posts.push(newPost); // Add new post
        }

        localStorage.setItem("posts", JSON.stringify(posts)); // Save to localStorage
        modal.classList.add("hidden");
        renderPosts();
    };

    document.getElementById("add-post").addEventListener("click", () => {
        editingIndex = null;
        postTitleInput.value = "";
        postContentInput.value = "";
        postSourceInput.value = "";
        postDateInput.value = new Date().toISOString().split("T")[0];
        modal.classList.remove("hidden");
    });

    savePostButton.addEventListener("click", savePost);
    cancelEditButton.addEventListener("click", () => modal.classList.add("hidden"));

    renderPosts();
});
