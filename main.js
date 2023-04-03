
let r = document.querySelector(':root');
var dark = 0;

let bgc = ['#f6f8ff', '#141d2f'];
let bgcc = ['#fefefe', '#1e2a47'];
let textc = ['#4b6a9b', '#ffffff'];
let textaltc = ['#2b3442', '#ffffff'];
let text = ['dark', 'light'];
let imgSrc = ["./images/moon-icon.svg", "./images/sun-icon.svg"];


const mode = document.getElementById("modeId");
const mt = document.getElementById("mt");
const mi = document.getElementById("mi");
mode.addEventListener("click", () => {
   switchMode();
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
   switchMode();
}
function switchMode() {
   dark = (dark == 1) ? 0 : 1;
   mi.src = imgSrc[dark];
   mt.innerText = text[dark];
   r.style.setProperty('--lm-bg', bgc[dark]);
   r.style.setProperty('--lm-bg-content', bgcc[dark]);
   r.style.setProperty('--lm-text', textc[dark]);
   r.style.setProperty('--lm-text-alt', textaltc[dark]);
};


fetchDev('thepranaygupta');
// fetch
const searchForm = document.querySelector('form');
const usernameIp = document.querySelector('input');
const err = document.getElementById('e');
searchForm.addEventListener("submit", (e) => {
   e.preventDefault();


   let username = usernameIp.value;
   fetchDev(username);
})

const dp = document.getElementById("dp");
const userid = document.getElementById("userid");
const date = document.getElementById("date");
const bio = document.getElementById("bio");
const nameU = document.getElementById("name");

const repo = document.getElementById("repo");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const location1 = document.getElementById("location");
const blog = document.getElementById("website");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");
let showErr = false;

async function fetchDev(username) {

   try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      console.log(err.innerText);
      if (data?.message == "Not Found") {
         err.classList.add("showError");
         showErr = true;
         return;
      }


      if (err.classList.contains("showError")) {
         err.classList.remove("showError");
      }


      dp.src = data.avatar_url;
      nameU.innerText = (data.name) ? data.name : data.login;
      userid.innerText = "@" + data.login;
      userid.href = data.html_url;
      bio.innerText = (data.bio) ? data.bio : "This profile has no bio.";

      repo.innerText = data.public_repos;
      followers.innerText = data.followers;
      following.innerText = data.following;

      location1.innerText = (data.location) ? data.location : "Not available";

      console.log(data.twitter_username);
      twitter.innerText = (data.twitter_username != null) ? data.twitter_username : "Not available";
      if (data.twitter_username) { twitter.href = `https://twitter.com/${data.twitter_username}`; }

      company.innerText = (data.company) ? data.company : "Not available";

      blog.innerText = (data.blog) ? data.blog : "Not available";
      if (blog.href != "") blog.href = data.blog;
   }

   catch {

   }
};