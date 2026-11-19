# Sushma Somashekar: portfolio under the stars

A static website. Plain HTML, CSS and JavaScript. No build step, no installs.

## What's inside

```
index.html        The page
css/style.css     Colours, fonts and layout
js/main.js        Starfield, traits constellation, work cards, counters
assets/img/       Images taken from the Creative Canvas portfolio
```

## Preview on your computer

Unzip the folder and double-click `index.html`. It opens in your browser.

## Put it live on GitHub Pages (about 10 minutes, no coding)

1. **Create an account** at github.com if you don't have one.
2. **Create a repository.** Click **+** (top right) > **New repository**.
   - Name it `yourusername.github.io` to get the address `https://yourusername.github.io`.
   - Or use any name, like `portfolio`. The address becomes `https://yourusername.github.io/portfolio`.
   - Set it to **Public**. Click **Create repository**.
3. **Upload the files.** On the new repository page, click **uploading an existing file**.
   Drag in everything *inside* the `portfolio-site` folder: `index.html`, `README.md` and the `css`, `js` and `assets` folders.
   `index.html` must sit at the top level, not inside another folder.
   Click **Commit changes**.
4. **Turn on Pages.** Go to **Settings** > **Pages**.
   Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Click **Save**.
5. **Wait 1 to 2 minutes**, then refresh the Pages screen. Your live link appears at the top.

## Adding work

- Projects live in `js/main.js` in the `work` list, in display order. Each has `media`, and optional `reels` (Instagram links) and `link`.
- Add a video: put an MP4 (720p, under ~20 MB) in `assets/video/`, then add `{ type: 'video', src: 'assets/video/name.mp4', poster: 'assets/img/name-poster.webp' }` to a project's `media`.
- Darena screen recordings: put the MP4 in `assets/video/` and add a line to `darenaFilms` in `js/main.js`.
- Planets: the `chapters` list in `js/main.js` sets each planet's name, colour, size and brands.
- Music: the site makes a soft ambient sound in the browser. To use your own track, add `assets/audio/track.mp3` and set `MUSIC_FILE = 'assets/audio/track.mp3'` at the top of `js/main.js`.

## Making changes later

- Open a file on GitHub, click the pencil icon, edit, and click **Commit changes**. The site updates in about a minute.
- To swap an image, upload a new file with the same name into `assets/img/`.
- Work cards live in `js/main.js` in the `work` list. Traits live in the `traits` list.

## Optional: your own domain

Buy a domain (for example on Namecheap or GoDaddy), then add it under **Settings** > **Pages** > **Custom domain** and follow GitHub's DNS steps.
