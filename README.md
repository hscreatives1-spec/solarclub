# Solar Club – One-Page Website
Static site (HTML + CSS + JS). No build step.

## Deploy on Vercel via GitHub
1. Create a new GitHub repo, upload all files from this folder (keep `index.html` in the root).
2. Go to vercel.com → Add New → Project → import the repo.
3. Framework Preset: **Other**. Build command: none. Output directory: leave blank. Deploy.

## Local preview
`npx serve .`  or open `index.html` in a browser.

## Edit
- Text: `index.html`  · Colors: `:root` in `css/style.css` (`--blue`, `--gold`)
- Contact form opens the visitor's email app (mailto). For server-side delivery, connect Formspree/Web3Forms.
