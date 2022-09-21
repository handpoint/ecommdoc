# Handpoint Documentation Website

This is the source code for the [Handpoint ecomm Documentation website](https://developer-ecomm.handpoint.com/). The site is built using [Docusaurus 2](https://docusaurus.io/).

## Local Development

### Requirements

Docusaurus is essentially a set of npm packages. If you want to build the site locally, you will need to have [Node.js](https://nodejs.org/en/) version 18 or above installed.

You'll also have to install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).

### Installation

To install the dependencies, run:

```bash
yarn install
```

### Build and Run the Site locally

In the root folder we must execute the following commands:

```console
yarn start
```

This command starts a local development server and opens up a browser window (by default localhost:3000). Most changes are reflected live without having to restart the server.

## Deployment

The deployment is done automatically with Github Actions. The workflow is defined in `.github/workflows/deploy.yml`:

- Every time a PR is merged to `dev` branch, changes are deployed to https://developer-ecomm.handpoint.io
- Every time a PR is merged to `main` branch, changes are deployed to https://developer-ecomm.handpoint.com

The property `includeCurrentVersion` in `docusaurus.config.js` is set to `true` for `dev` branch and `true` for `main` branch. This is done to avoid having unfinished releases in the production website. 

More info about this CI/CD pipeline can be found [here](https://handpoint.atlassian.net/wiki/spaces/DP/pages/3598450735/Documentation+Site).

## CI/CD

The documentation site consists of two [docusaurus](https://docusaurus.io/) instances:

- [Card present documentation](https://developer.handpoint.com/)
- [Card not present documentation](https://developer-ecomm.handpoint.com/)

The documentation site follows [Gitflow strategy](https://docs.google.com/document/d/1nRKUXhPKga-UJ-UxXKYdssa9rKlyClNRfxM6J4fw11s/edit#heading=h.wy5fcj5rh5j6). The `main` branch is the production branch and the `dev` branch is the development/staging branch. 

The `dev` branch is deployed to:

- [https://developer.handpoint.io](https://developer.handpoint.io) 
- [https://developer-ecomm.handpoint.io](https://developer-ecomm.handpoint.io) 

and the `main` branch is deployed to:
 
- [https://developer.handpoint.com](https://developer.handpoint.com) 
- [https://developer-ecomm.handpoint.com](https://developer-ecomm.handpoint.com) 

Documentation changes can be developed locally and tested in the staging environment before being released to production.
Every time we want to integrate changes from a feature branch to the `dev` branch, we have to create a PR. The PR will be reviewed by one of the team members and merged to `dev` branch. This will trigger a deployment to the staging environment (It can take up to 5 minutes to be deployed). 

Once the changes are tested in the staging environment, another PR has to be created to merge the changes from `dev` branch to `main` branch. This PR will be reviewed by two team members and merged to `main` branch. This will trigger a deployment to the production environment (It can take up to 5 minutes to be deployed).
