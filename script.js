const APIURL = "https://api.hackernoon.com/featured-stories";
const storiesDiv = document.querySelector('#stories');
const storyNode = (story) => {
  var template = document.createElement('template');
  template.innerHTML = story;
  return template.content.childNodes[0];
}
const addStories = (stories) => {
  for (let index in stories) {
    const story = stories[index];
    const html = `<div class="story">
      <a href="${story.url}">${story.text}</a>
    </div>`;
    storiesDiv.appendChild(storyNode(html));
  }
}
if (localStorage.lastFetch && localStorage.stories && (new Date() - localStorage.lastFetch) < (1000*60*60)) {
  addStories(JSON.parse(localStorage.stories));
} else {
  if (localStorage.stories) {
    addStories(JSON.parse(localStorage.stories));
  }

// An asynchronous function to fetch the stories 
async function fetchStories() {
  let response = await fetch(APIURL, {
    method: 'GET',  
    mode: 'CORS',
    credentials: 'INCLUDE'
  });
  
    let responseData = await response.json();
    if (!localStorage.stories) {
          addStories(responseData);
        }
    localStorage.setItem("stories", JSON.stringify(responseData));
    localStorage.setItem("lastFetch", new Date()-1);
}

fetchStories();
