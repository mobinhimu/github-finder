const searchUsername = document.querySelector("#search-username");
const input = document.querySelector("input");
const userInfo = document.querySelector(".user-info");
const searchUserProfile = document.querySelector("#search-user-profile");
const message = document.querySelector(".message");
searchUsername.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue === "") {
    userInfo.style.display = "none";
  } else {
    gitHubApi(inputValue);
  }
  input.value = "";
});

function gitHubApi(inputValue) {
  fetch(`https://api.github.com/users/${inputValue}`)
    .then((response) => {
      if (!response.ok) {
        userInfo.style.display = "none";
        message.style.display = "block";
        setTimeout(() => {
          message.style.display = "none";
        }, 2000);
      } else {
        userInfo.style.display = "flex";
      }
      return response.json();
    })
    .then((data) => {
      searchingData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function searchingData(data) {
  document.querySelector("img").src = data.avatar_url;
  searchUserProfile.addEventListener("click", (eve) => {
    eve.target.href = data.html_url;
  });
  //   Personal Account Information
  const personalAccountInfo = document.querySelectorAll(
    ".repo-gist-followers-following p"
  );
  personalAccountInfo[0].innerHTML = "Repository : " + data.public_repos;
  personalAccountInfo[1].innerHTML = "Gists : " + data.public_gists;
  personalAccountInfo[2].innerHTML = "Follower : " + data.followers;
  personalAccountInfo[3].innerHTML = "Following : " + data.following;
  //  Personal Information
  const personalInformation = document.querySelectorAll(
    ".name-company-website-location-memberS p"
  );
  personalInformation[0].innerHTML = "<b>Name : </b>" + data.name;
  personalInformation[1].innerHTML = "<b>Company : </b>" + data.company;
  personalInformation[2].innerHTML = "<b>Website : </b>" + data.blog;
  personalInformation[3].innerHTML = "<b>Location : </b>" + data.location;
  personalInformation[4].innerHTML =
    "<b>Member Since  : </b>" + data.created_at;
  repoList(data.repos_url);
}

function repoList(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((item) => {
      let text = "";
      item.forEach((repoItem) => {
        text += `
          <li><a href = '${repoItem["html_url"]}' target="_blank">${repoItem["name"]}</a> </li>
          
          `;
      });
      document.querySelector("ul").innerHTML = text;
    })
    .catch((err) => {
      console.log(err);
    });
}
