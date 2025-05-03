// app/data/repos.ts

export const dummyRepos = [
    {
      id: 123,
      name: "awesome-repo",
      full_name: "octocat/awesome-repo",
      private: false,
      description: "This is an awesome repo",
      stargazers_count: 42,
      forks_count: 10,
      language: "TypeScript",
      html_url: "https://github.com/octocat/awesome-repo",
      owner: {
        login: "octocat",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
      },
    },
    {
      id: 456,
      name: "private-repo",
      full_name: "octocat/private-repo",
      private: true,
      description: "This is a private repo",
      stargazers_count: 5,
      forks_count: 1,
      language: "JavaScript",
      html_url: "https://github.com/octocat/private-repo",
      owner: {
        login: "octocat",
        avatar_url: "https://github.com/images/error/octocat_happy.gif",
      },
    },
  ];
  