# SofaSocietyCo.
> An e-commerce app

I made this app as a test task for Agilo. It's a fullstack application based on [Medusa](https://medusajs.com/) for the backend and Next.js for the storefront, aka the frontend. The task was to remake a product page from Figma while aiming for clean code and good structure. As for functionality, i integrated real product fetching and basic cart logic.

### Technologies used
- Medusa, Medusa JS SDK
- Next.js, React
- TypeScript
- TailwindCSS
- PostgreSQL

<br>

## Installation and running

To get started with this project, you need to have the following installed on your machine:

1. **A modern web browser**
2. **Visual Studio Code** (or any code editor)
3. **Node.js** (v20 or higher)
4. **Yarn** (npm install -g yarn)
5. **PostgreSQL**

### Cloning the repo

1. **Clone the repo**:
   ```bash
   git clone https://github.com/ivonaaaa/ecommerce.git
   ```

2. **Open the project**:
   ```bash
   cd ecommerce
   code .
   ```
   
---

### Setting up the backend

3. **Install dependencies**:
   ```bash
   cd api
   yarn install
   ```

4. **Create and set up the database**: (this will ask you to enter your postgres password)
   ```bash
   createdb -U postgres medusa-api
   ```

5. **Set up the environment**: Find a `.env.template` file in the `api` folder and rename it to just `.env`. Update `DATABASE_URL` according to your credentials.
  ```bash
   DATABASE_URL=postgres://postgres:yourpassword@localhost:5432/medusa-api
   ```

6. **Seed the database**: When prompted for a database name, enter `medusa-api`.
   ```bash
   yarn medusa db:setup
   yarn medusa exec src/scripts/seed.ts
   yarn medusa user -e [your_email] -p [password]
   ```

8. **Run the backend**:
   ```bash
   yarn dev
   ```

   The admin app is available at `http://localhost:9000/app`. Log in with the credentials you entered while creating a new user.
   
---

### Setting up the frontend

9. **Navigate to the web folder (in a new terminal)**:
   ```bash
   cd web
   ```

10. **Install dependencies**:
   ```bash
   yarn install
   ```

11. **Set up the environment**: Inside the medusa admin app, find the `region_id` (Settings → Regions → Your region, copy the id from url) and also your `publishable_api_key` (Settings → API keys). Remember these for the next step.

    Find a `.env.example` file in the `web` folder and rename it to just `.env`. Fill the variables with strings you found previously:
   ```bash
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=[your_publishable_key_here]
   NEXT_PUBLIC_REGION_ID="[your_region_id_here]"
   ```

12. **Run the application**:
   ```bash
   yarn dev
   ```

   Open `http://localhost:8000/` in your browser to view the application.

<br>
<br>

## My overview of the project

This project took me approximately 11 days to complete. In the span of those 11 days, i'd say i actually worked 27 hours or so, including all the research and coding. What i found most challenging was:
- Undestanding how Medusa works in general, from using the admin app to get certain keys, to cacthing up with documentation on its types and api call syntax, etc.
- Figuring out the Next.js router in the beginning
- Tailwindcss was bugging me because i got used to writing the style in distinct files, but i got over this fairly quickly
- Had some difficulties with implementing the sale price in the seed file (wanted to do everything in seed for easier setup)

I found this project fun and useful. I got some idea of how Medusa works and i'd be happy to explore it further on.
