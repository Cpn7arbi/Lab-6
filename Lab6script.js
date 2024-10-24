const initialLikes = 100;
const initialDislikes = 20;
let likesCount = initialLikes;
let dislikesCount = initialDislikes;

// Get all UI elements
const likesBtn = document.getElementById("likeBtn");
const dislikesBtn = document.getElementById("dislikeBtn");
const commentBox = document.getElementById("commentBox");
const submitBtn = document.getElementById("submit");
const clearBtn = document.getElementById("clear");
const commentsList = document.getElementById("commentsList");

// Set the initial values for the buttons
likesBtn.innerText = "👍 " + likesCount;
dislikesBtn.innerText = "👎 " + dislikesCount;

// Handle like btn
likesBtn.addEventListener("click", () => {
    likesCount++;
    likesBtn.innerText = "👍 " + likesCount;
    setCookie(); // Set cookie after voting
});

// Handle dislike btn
dislikesBtn.addEventListener("click", () => {
    dislikesCount++;
    dislikesBtn.innerText = "👎 " + dislikesCount;
    setCookie(); // Set cookie after voting
});

// Handle submit a comment
submitBtn.addEventListener("click", () => {
    if (commentBox.value.trim()) {
        // Create a <p>
        const pElem = document.createElement("p");
        pElem.innerText = commentBox.value.trim();
        commentsList.appendChild(pElem);
        commentBox.value = "";
        setCookie(); // Set cookie after commenting
    }
});

// Handle clear
clearBtn.addEventListener("click", () => {
    commentBox.value = "";
    document.cookie = "voted=true; path=/; expires=" + new Date(Date.now() - 1).toUTCString();
    console.log("Cookie cleared");

    // Re-enable all buttons
    likesBtn.disabled = false;
    dislikesBtn.disabled = false;
    submitBtn.disabled = false;
});

// Function to set cookie
function setCookie() {
    // Set a cookie that expires in a minute from now
    const expireOn = new Date(Date.now() + 1 * 60 * 1000);
    const cookieString = "voted=true; path=/; expires=" + expireOn.toUTCString();
    document.cookie = cookieString;
}

// Check for cookies when the page is loading
window.onload = function () {
    if (document.cookie.indexOf("voted") > -1) {
        console.log("Cookie exists");
        // Disable all buttons
        likesBtn.disabled = true;
        dislikesBtn.disabled = true;
        submitBtn.disabled = true;
    }
};
