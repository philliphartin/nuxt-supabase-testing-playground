# Nuxt 3, Supabase and Testing

This is an example repository to explore how to best use Supabase with Nuxt 3, and how to create efficient testing patterns.

### Testing Challenges

- How to mock Supabase? (...and do I need to?)
- How to assert that a Supabase User is authenticated?
- How to mock a Supabase User session?
- How to authenticate as a Supabase User for a request lifecycle?
- How to mock a Supabase User session for a browser session?
- Can test utils be made to work with Supabase?
- Am I thinking about this all wrong?

## Setup

### Start Supabase services (local)

Initialize Supabase to set up the configuration for developing your project locally:

```bash
npx supabase init
```

Make sure Docker is running. The start command uses Docker to start the Supabase services.
This command may take a while to run if this is the first time using the CLI.

```bash
npx supabase start
```

Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. It should look like this, with urls and keys that you'll use in your local project:

```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJh......
service_role key: eyJh......
```

You can use the `npx supabase stop` command at any time to stop all services (without resetting your local database). Use `npx supabase stop --no-backup` to stop all services and reset your local database.

### Copy environment variables

Copy the `.env.example` and replace the values with the credentials provided from the `supabase start` command.

```bash
cp env.example .env
```

### Install dependencies

Install the local project dependencies, e.g. Nuxt and the Supabase module.

```bash
npm install
```

## Development

You can run the project locally with the Nuxt development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Testing

I have created a single test to demonstrate my attempt at interacting with a local API endpoint and Supabase.

The tests can be found in the `/tests` directory.

You can run the tests with the following commands:

```bash
# Nuxt Tests
npm run test

# Vitest UI
npx vitest --ui
```
