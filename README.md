This is the starter template for CS312 projects based on Next.js](https://nextjs.org/). We will be creating an updated version of the MiddCourses. Everyone will still be able to make their own account, you will still be able to leave a review for a class, say the average amount of time per week you spent on the class, and filter by department or professor. Students should be able to leave reviews and see reviews. However, with a larger group I hope to add some additional functionality such as a schedule planner. The end goal of this MiddCourses would not only be a repository to leave reviews, but also a website that you can use to build your next semesters schedule. 

Travis CI badge: [![Build Status](https://app.travis-ci.com/csci0312-f21/project-middcourses-2-0.svg?token=sgjMh2ower8npw8pypDe&branch=main)](https://app.travis-ci.com/csci0312-f21/project-middcourses-2-0)

Heroku deployed application link:  https://midd-courses.herokuapp.com/

---

The project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), and includes a number of additional libraries, including the Rest Testing Library, Jest, and ESLint, among others. It also includes the basic configuration for using Travis CI.

To ensure consistent style, this template is also set up with [Prettier](https://github.com/prettier/prettier), with the configuration to automatically reformat code during a commit. That is whenever you commit your code, Prettier will automatically reformat your code during the commit process (as a "hook"). The hook is specified in the `package.json` file.

**Note: I've provided the processes for interacting with this project if you have a local installation. Running on Replit simplifies many of these steps (but not all of them, so please do read through).**

**Note: Run the servers only on firefox react-flippy does not work on other browsers well **

## Beggining Steps 

Run the following
```bash
npm install
```

You will need to set up an account with Auth0. 

On the 'Getting Started' page, select 'Create Application'.

Give your application a good name and then select 'Regular Web Application' (we want both the front and back end).

On the next page, you can select the technology (Node), but it isn't essential.

Go to the Settings tab. On this page, there are three pieces of information that you want:

the domain
the client ID
the client secret

Scroll down and add "http://localhost:3000/api/auth/callback/auth0" as an Allowed Callback URL

You will also need to create a .env.development.local file to hold a collection of environment variables that you should not include in your repository. They are:

AUTH0_CLIENT_ID (obtain from Auth0)

AUTH0_CLIENT_SECRET (obtain from Auth0)

AUTH0_DOMAIN (obtain from Auth0)

NEXTAUTH_SECRET (a string of your own devising)

NEXTAUTH_URL = 'http://localhost:3000'


## Steps to deploy to heroku
Add following script to package.json
```bash
"heroku:start": "next start -p $PORT"
```
Create file called Procfile and fill it with
```bash
web: npm run heroku:start
```
To create a new app using Heroku (you will need to have signed up for Heroku and install the command-line tool), run the following commands
```bash
heroku login
```
```bash
heroku create <project_name>
```
```bash
git push heroku main
```

In your Heroku dashboard on the web, go to the resources tab, and download the add-on "Heroku Postgres."

Update Config Vars in Settings on your dashboard to look like the .env.development.local file except change/add these:

NEXTAUTH_URL = "https://project_name.herokuapp.com/"

PGSSLMODE = no-verify

Click the more button in your heroku dashboard to open up the console and then run the following commands:
```bash
npx knex migrate:latest
```
```bash
npx knex seed:run
```
Lastly go back to your Auth0 Account and add "https://project_name.herokuapp.com/api/auth/callback/auth0 as another Allowed Callback URL on the settings page

Now back on in your terminal type:
```bash
heroku open
```

## Getting Started 

If you want to scrape the review data locally, Then run the following command,
```bash
npx knex seed:run
```
Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Testing

To run tests, just run the test script:

```
npm test
```

You can also run the tests in "watch" mode where it will re-run the tests as you save your work:

```
npm test -- --watch
```

You can also run jest selectively on a single file using `npx`:

```
npx jest path/to/file
```

## Linting

The repository is set up to run eslint with our custom rule set we have used for the last assignments.

```
npm run lint
```

## Continuous Integration

The skeleton is setup for CI with Travis-CI.

## Deploying to Heroku

Your application can be deployed to [Heroku](heroku.com) using the approach demonstrated in this [repository](https://github.com/mars/heroku-cra-node).

Assuming that you have a Heroku account, have installed the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli) and committed any changes to the application, to deploy to Heroku:

1. Log in to Heroku

```
heroku login
```

1. Create the Heroku app, e.g., to create a project called `project-name`:

   ```
   heroku create project-name
   ```

1. Push to Heroku

   ```
   git push heroku main
   ```

1. Open your newly deployed application

```
heroku open
```

Depending on how you implement your server, you will likely need create "add-ons" for your database, etc. and migrate then seed your database before you deploy.

### Heroku with RDBMS

Heroku provides a free add-on with the PostgreSQL database. Provision the add-on with the following command. The provisioning will define `process.env.DATABASE_URL` in the Heroku environment (which can be used by your database interface, e.g. by Knex in its configuration file).

```
heroku addons:create heroku-postgresql:hobby-dev
```

Once you have deployed your application (and provisioned the database) migrate and seed the database on Heroku with the following commands. `heroku run` executes the specified command in the context of your application on the Heroku servers.

```
heroku run 'npx knex migrate:latest'
heroku run 'npx knex seed:run'
```

You can test your backend without pushing to Heroku. The database Heroku created for you is accessible from anywhere. Use `heroku config` to obtain the `DATABASE_URL` variable. Define that variable locally with `?ssl=true` appended, e.g.

```
export DATABASE_URL="postgres://...?ssl=true"
```

You can also directly access your PostgreSQL database. Download and install one of the many PostgreSQL clients and use the `DATABASE_URL` from Heroku for the connection information.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
