# Blocks

Blocks is a CRUD e-commerce site that allows users to browse, add and remove items from their cart, and checkout.

## Installation

Clone this repository to your local machine and install all dependencies.

## Usage

To use this application you will need either a local postgres database or a hosted one you can connect to.

If you have a local database, its name will have to match the name in your package.json. Or you can go to server/db/db and manually change the connection there.

Otherwise, you will need to create a .env file and have "DATABASE_URL" as your key.

```
# npm run seed
seeds your database

# npm run start
starts your server (for testing your routes)

# npm run start:dev
starts your server and builds client-side files. go to localhost:8080
```

Other commands can be found in the package.json but this should be enough to get you up and running!
