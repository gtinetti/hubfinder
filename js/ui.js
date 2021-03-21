class UI {
  constructor () {
    this._alertContainer = document.querySelector('#alert-container');
    this._profileCard = document.querySelector('#profile-card');
    this._reposContainer = document.querySelector('#repositories-container');

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  showProfile (profile) {
    const memberSince = new Date(profile.created_at);

    let f_MemberSince = `${memberSince.getFullYear()} `;
    f_MemberSince += `${this.months[memberSince.getMonth()]} ${memberSince.getDate()}`;

    let _profileCard = `
    <div class="card-body">
      <h4 class="card-title">${profile.name ?? "\"A user has no name\""}</h4>
      <div class="row">
        <div class="col-lg-4 col-md-4 col-sm-12">
          <img src="${profile.avatar_url}" style="width:100%;">
        </div>
        <div class="col-lg-8 col-md-8 col-sm-12">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">User: ${profile.login}</li>
            <li class="list-group-item">Member since: ${f_MemberSince}</li>
            <li class="list-group-item">Email: ${profile.email ?? 'N/A'}</li>
            <li class="list-group-item">Location: ${profile.location ?? 'N/A'}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 mt-3">
          <span class="badge badge-success">Public repositories ${profile.public_repos}</span>
          <span class="badge badge-primary">Followers: ${profile.followers}</span>
          <span class="badge badge-info">Following: ${profile.following}</span>
        </div>
      </div>
    </div>`;

    this._profileCard.innerHTML = _profileCard;
    this.clearAlert();
  }

  clearProfile () {
    this._profileCard.innerHTML = "";
  }

  showAlert (type, message) {
    this.clearAlert();

    let _alert = `
    <div class="alert alert-dismissible alert-${type}">
      <button class="close" type="button" data-dismiss="alert">&times;</button>
      <strong>Oh damn!</strong> ${message}
    </div>`;

    this._alertContainer.innerHTML = _alert;
  }

  clearAlert () {
    this._alertContainer.innerHTML = "";
  }

  showUserRepos (repos) {
    this.clearUserRepos();

    let _row = document.createElement('div');
    _row.className = 'row';

    repos.map(repo => {
      let _card = document.createElement('div');
      _card.className = 'col-lg-4 col-md-4 col-sm-6 mb-3';

      let _languages = "";
      for (const lang of repo.languages) {
        _languages += `<small class="text-muted mr-1">${lang}</small>`;
      }

      _card.innerHTML = `
      <div class="card card-repo">
        <div class="card-body">
          <h6 class="card-title">${repo.name}</h6>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <span class="badge badge-primary mr-1">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-success mr-1">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-info mr-1">Forks: ${repo.forks_count}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 py-2">
              <p class="card-text">${repo.description ? repo.description : 'N/A'}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              ${_languages}
            </div>
          </div>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated: ${repo.updated_at}</small>
        </div>
      </div>`;

      _card.innerHTML = _card.innerHTML.replace(/\s{2,}/g, '');
      _row.appendChild(_card);
    })

    this._reposContainer.appendChild(_row);
  }

  clearUserRepos () {
    this._reposContainer.innerHTML = "";
  }
}