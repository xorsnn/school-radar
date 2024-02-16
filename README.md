## About

The site is avaliable here: [https://schoolradar.com.au/](https://schoolradar.com.au/)

This is a project to make finding schools in the neighborhood easier.

## Data

The data is taken form:
- [government schools](https://data.cese.nsw.gov.au/data/dataset/nsw-public-schools-master-dataset/resource/2ac19870-44f6-443d-a0c3-4c867f04c305)
- [non government schools](https://data.cese.nsw.gov.au/data/dataset/nsw-non-government-school-locations-and-descriptions/resource/a5871783-7dd8-4b25-be9e-7d8b9b85422f)

The script for retrieving school data is in `compose_schools.ts`.

Unfortunately, we can't publish rankings and use NAPLAN results in this project, so you can check NAPLAN results [here](https://www.myschool.edu.au/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


* For running locally, you'll need to provide your own Google Maps API key as a `GOOGLE_MAPS_API_KEY` environment variable.
