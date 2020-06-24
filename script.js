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
  fetch('https://api.hackernoon.com/featured-stories',{
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (!localStorage.stories) {
        addStories(data);
      }
      localStorage.setItem("stories", JSON.stringify(data));
      localStorage.setItem("lastFetch", new Date()-1);
    });
}