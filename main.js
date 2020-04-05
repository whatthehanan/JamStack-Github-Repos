const listRepos = async username => {
  const content = document.getElementById("content");

  const repos = await fetch(
    `https://api.github.com/users/${username}/repos?type=owner&sort=updated`
  )
    .then(res => res.json())
    .catch(error => console.log(error));

  if (repos.message) {
    return;
  }

  const markup = repos
    .map(
      repo => `
          <li>
            <a href="${repo.html_url}">${repo.name}</a>
            (⭐️ ${repo.stargazers_count})
          </li>
        `
    )
    .join("");

  content.innerHTML = `<ul>${markup}</ul>`;
};

document.getElementById("btn").onclick = () => {
  const username = document.getElementById("username").value;
  listRepos(username);
};
