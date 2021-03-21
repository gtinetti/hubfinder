class GitHubApplication {
  constructor () {
    this.__baseURI = 'https://api.github.com';
    this.__headers = new Headers({
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "hubfinder"
    });

    (async () => {
      const request = await fetch('https://hubfinder.gabrieltinetti.site/auth');
      if (!request.ok)
        throw new Error(request.statusText);

      const response = await request.text();
      let authorization = 'Basic ' + btoa(`2a47df60724a95623a81:${response}`);

      this.__headers.append("Authorization", authorization);
    })()
  }

  async getUser (username) {
    const uri = `${this.__baseURI}/users/${username}`;
    const request = await fetch(uri, { headers: this.__headers });
    if (!request.ok)
      throw new Error(`Failed to fetch ${username}'s data.`);

    const response = await request.json();
    return { profile: response };
  }

  async getUserRepos (username, amount, sort) {
    amount = typeof amount === 'undefined' ? 5 : amount;
    sort = typeof sort === 'undefined' ? 'created:asc' : sort;

    const uri = `${this.__baseURI}/users/${username}/repos?per_page=${amount}&sort=${sort}`;
    const request = await fetch(uri, { headers: this.__headers });
    if (!request.ok)
      throw new Error(`Failed to fetch ${username}'s repos.`);

    let response = await request.json();

    let repositories = await Promise.all(response.map(async repository => {
      const uri = `${this.__baseURI}/repos/${username}/${repository.name}/languages`;
      const request = await fetch(uri, { headers: this.__headers });
      if (!request.ok)
        return repository;

      const languages = await request.json();
      repository.languages = Object.keys(languages);

      return repository;
    }));

    return { repositories };
  }
}