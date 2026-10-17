# Still & Found

A responsive, standalone photo gallery built with HTML, CSS, and JavaScript. It includes category filters, hover transitions, and an accessible lightbox with previous/next controls and keyboard navigation.

## Run locally

Open `index.html` in a browser, or serve this folder with any static-file server. For example, from the project root:

```sh
python -m http.server 8000 --directory image-gallery
```

Then visit `http://localhost:8000`.

Photographs are loaded from Unsplash, and the typefaces are loaded from Google Fonts, so those assets require an internet connection.

## Publish

The files in this folder can be published directly with GitHub Pages: add the contents to a public repository, then select **Settings → Pages → Deploy from a branch**, and choose the root of the publishing branch (or configure the `image-gallery` directory as the site root).
