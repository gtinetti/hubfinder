const ghapp = new GitHubApplication();
const ui = new UI();

const _form = document.querySelector('#input-username');

_form.addEventListener('keyup', resolveRequest);

function resolveRequest (e) {
  const searchQuery = e.target.value;
  if (searchQuery.length === 0) {
    ui.clearProfile();
    ui.clearUserRepos();
    return false;
  }

  ghapp.getUser(searchQuery)
    .catch(err => ui.showAlert('danger', `I didn't found the user ${searchQuery}.`))
    .then(data => {
      if (typeof data === 'undefined')
        return false;

      ghapp.getUserRepos(searchQuery, 6, 'created:desc')
        .catch(err => ui.showAlert('danger', `I didn't found ${searchQuery}'s repositories.`))
        .then(data => {
          if (typeof data === 'undefined')
            return false;

          ui.showUserRepos(data.repositories);
        })

      ui.showProfile(data.profile);
    })

  e.preventDefault();
}