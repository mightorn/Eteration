## Getting Started
Install dependencies

```bash
npm install
```

Create ".env.local" file and add api url to here => NEXT_PUBLIC_API_URL

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For Test

Create ".babelrc" file and add this:
```
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react",
      "@babel/preset-typescript"
    ]
  }
```
then run test:

```bash
npm run tes
```
