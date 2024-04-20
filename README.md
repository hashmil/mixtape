## Mixtape Album Art Generator (with Replicate)

This is a [Next.js](https://nextjs.org/) project made with the Replicate API for SDXL.

## Noteworthy files

- [pages/index.js](pages/index.js) - The React frontend that renders the home page in the browser
- [pages/api/predictions/index.js](pages/api/predictions/index.js) - The backend API endpoint that calls Replicate's API to create a prediction
- [pages/api/predictions/[id].js](pages/api/predictions/[id].js) - The backend API endpoint that calls Replicate's API to get the prediction result

## Usage

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to `.env.local`:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser.
