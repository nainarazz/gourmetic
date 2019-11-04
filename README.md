Gourmetic is a simple side project I have worked on to help me find food to cook. I have had the problem of not knowing what to cook for breakfast, lunch, or supper. Sometimes, I would just repeat the same food multiple times during the week. I have tried looking for recipes online and also used other apps, but they seem to be a little complicated for me. So I decided to create an app for myself.

As it is still a work in progress, here are some of the functionalites at the moment:

- viewing, creating and deleting recipes
- liking a recipe
- viewing your created and liked recipes
- viewing your profile information

To be added in the future:

- sharing recipe on social media
- commenting on recipes
- menu planner

I hope someone will find it useful.

### Technologies

Gourmetic uses a monorepo architecture. The backend code can be found in the api directory, while the front end code is in the /src directory. The project is fullstack Javascript.

Here is a list of some of the technologies used:

- **Typescript**: Type-safe JavaScript
- **Next.js**: Frontend React app
- **GraphQL**: API, using Apollo toolchain
- **Codegen**: used for giving types to graphql resolvers in the backend
- **MongoDb**: Data storage
- **Auth0**: Authenticaion
- **Now Zeit**: deployment
- **Sentry**: for error tracking

Some of the tools used to improve code quality and style are:

- **Prettier**
- **TSLint**

### First Time Setup

#### Clone

First, clone the repository.
using https:

```sh
https://github.com/nainarazz/gourmetic.git
```

using ssh:

```sh
git@github.com:nainarazz/gourmetic.git
```

#### Install Dependencies

Then install all dependencies. From the root folder, run `yarn install`.

To run the backend API, create a .env file in the /api directory and add `MONGO_URL=localhost`. You can change localhost to any url that points to your MongoDb database. You can use a cloud like MLab, or you can set up a local mongodb in your machine.

You can also seed recipes collection in database by running `yarn seed`.

### Running App Locally

#### Frontend

To run the front end, open a terminal and run the command `yarn dev:web`.

#### Backend

The command to start the server is `yarn dev:api`.

### Backend Resolver Types

To add typings to the graphql resolvers in the backend api, you can run the command `yarn generate-types`. You can use the generated types for Typescript.

### Development Environment

When developing and testing locally, you will not be able to upload photos online to Cloudinary. It will only be available in production mode.

## License

MIT, see the [LICENSE](./LICENSE) file.
