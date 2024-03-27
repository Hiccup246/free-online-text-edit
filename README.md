# ✏️ [Free online text edit](https://www.freeonlinetextedit.com/)

![](https://img.shields.io/github/license/Hiccup246/free-online-text-edit)
![](https://img.shields.io/github/languages/code-size/Hiccup246/free-online-text-edit)
![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=free-online-text-edit)

A simple free online text edit application built using SvelteKit and deployed using Vercel.
![Site Screenshot](https://raw.githubusercontent.com/Hiccup246/free-online-text-edit/main/src/lib/images/site-screenshot.webp)

# Description

While working as a professional software engineer I found myself constantly googling online text editors so I could remove styling from copy-pasted text. I did not particularly like doing this as I was unsure about the data the sites were saving. As a result I created this simple text edit application.

The application is mobile friendly and consists of a large text area with a background color that is dyslexic and eye-friendly. Underneath the text area there is a footer that contains a positive message and some handy features.

## Features

- A word and line count
- A button to download your notes into a `.txt` file and a input to customise the file name
- A pretty print button which will format valid JSON

<br>

# Understanding the project

The project is built using [SvelteKit](https://kit.svelte.dev/) and consists of a single layout and page. The projects core structured is:

- `app.html` - Contains header tags (SEO, favicon etc)
- `app.d.ts` - Declares environment variable types
- `/routes/`
  - `+layout.svelte` - Injects page specific tracking
  - `+page.svelte` - The main page component
  - `styles.css` - Contains global site styles

<br>

# Usage

To get this project up and running follow the commands below:

1. Clone this repository and navigate to the root folder
2. Install [PNPM](https://pnpm.io/)
3. Run `pnpm install`
4. Run `pnpm run dev`

<br>

# ToDo

- Enhance JSON pretty printing to format non valid JSON
