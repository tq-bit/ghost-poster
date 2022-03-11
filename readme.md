# Ghoster

**Post your Ghost articles to Dev.to**

## Setup

- Clone this repos
- Create a new API key in your [dev.to settings](https://dev.to/settings/account)
- Maintain a `/config/devto.config.ts` file in the project's `src`
- Configure a webhook in your Ghost CMS instance that points to port **8080** for post creation or post update*
- Run `npm install` and `npm run build`
- Run `npm run start` or `npm run start:daemon` to run the package with the [pm2](https://pm2.keymetrics.io/) module

> The port can be changed in the index.ts file

Try and publish a new post - it should now automatically show on dev.to, unpublished
