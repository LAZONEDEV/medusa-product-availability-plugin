<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Plugin to manage product availability in medusa
</h1>

## Setup the project

### Create environment file

Run the following command to create the environment from example file

```bash
cp .env.template .env
```

> You can keep the environment variables value if you are going to use the
> provided docker compose

## Setup medusa

Before you start medusa setup ensure that you start the database with the following command

```bash
docker compose up
```

### Run migration

Run the following command to apply migrations

```bash
yarn medusa migrations run
```

### Side you database

```bash
yarn seed
```

### Create user

```bash
npx medusa user -e some@email.com -p some-password
```

## Start medusa

```bash
yarn dev
```
