# Contributing to Daruma Ball

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

Daruma Ball is an open-source project. The concept is to create a to-do list app that uses the traditional Japanese Daruma doll as a way to motivate users to complete their tasks.

Before submitting your contribution, please make sure to take a moment and read through the following guidelines.

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Why Contribute ?](#why-contribute)
- [How to Contribute](#how-to-contribute)
  - [Issue reporting guidelines](#issue-reporting-guidelines)
  - [Pull request guidelines](#pull-request-guidelines)
    - [Where should I start?](#where-should-i-start)
- [Quick start](#quick-start)
- [Developer documentation](#developer-documentation)
- [Communication](#communication)

## Why Contribute ?
- Learn new skills and technologies
- Make an impact and see your contributions being used by others

## How to Contribute

### Issue Reporting Guidelines

Please search for similar issues before opening an issue and always follow the [issue template](markdown/ISSUE_TEMPLATE/).

- Check out our [issue tracker](https://github.com/Alexon1999/daruma-ball/issues) for open issues and feature requests.

Please review the following Pull Request guidelines before making your own PR.

### Pull Request Guidelines

**In *all* Pull Requests:** provide a title, a detailed description of the problem, as well as a demonstration with screen recordings and/or screenshots.

Please make sure the following is done before submitting a PR:

- Submit PRs directly to the `develop` branch.
- Reference the related issue in the PR comment.

If you add new feature:

- Open a suggestion issue first.
- Provide your reasoning on why you want to add this feature.
- Submit your PR.

If you fix a bug:

- If you are resolving a special issue, please add `fix: #<issue number> <short message>` in your PR title (e.g.`fix: #3899 update entities encoding/decoding`).
- Provide a detailed description of the bug in your PR and/or link to the issue.

#### Where should I start?

A good way to start is to find an [issue](https://github.com/Alexon1999/daruma-ball/issues) labeled as `bug`, `help wanted` or `feature request`. The `good first issue` issues are good for newcomers. Please discuss the solution for larger issues first and after the final solution is approved by the Daruma Ball members, you can submit/work on the PR. For small changes you can directly open a PR.


## Quick start

1. Fork the repository.
2. Clone your fork: `git clone git@github.com:<username>/daruma-ball.git`
3. Setting up your local environment ([explained here in details](DOCUMENTATION.md))
4. Create a feature branch: `git checkout -b feature`
5. Make your changes and push your branch.
6. Create a PR against `develop` and describe your changes by adding a title and a description to your PR.

**Rebase your PR:**

If there are conflicts or you want to update your local branch, please do the following:

1. `git fetch upstream`
2. `git rebase upstream/develop`
3. Please [resolve](https://help.github.com/articles/resolving-merge-conflicts-after-a-git-rebase/) all conflicts and force push your feature branch: `git push -f`

## Developer Documentation

Please [click here](docs/dev/README.md) for more details.

## Communication
- You can talk in [Discussions](https://yourproject.slack.com) to stay updated on the project and collaborate with other contributors. 
- You can also reach us via email at alexon.uthayakumar@gmail.com.