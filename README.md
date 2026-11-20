# MYŚAA Luxe Store (v4.4)

Static website for MYŚAA, Himalayan organic skincare. There's no build step: serve the folder with any web server and open `index.html`.

## Folder structure

```
mysaa-luxe-store/
├── index.html          Whole site: layout, styles and scripts
├── data.js             Products, prices, reviews
├── README.md
├── fonts/              Aileron + Erstoria                         (5 files)
├── js/                 GSAP, ScrollTrigger, Lenis                 (3 files)
│   └── 3d/             Optional 3D bottle viewer (not on homepage) (3 files)
├── media/              Reel and texture videos                    (9 files)
├── photos/             Hero, lifestyle, ritual, press photos      (74 files)
└── img/
    ├── p/              Product packshots                          (16 files)
    ├── ing/            Ingredient images                          (12 files)
    ├── hold/           "Hold the ritual" bottles, labels, silk bg  (8 files)
    └── award/          Award badges                                (5 files)
```

That's 138 files in total. No folder has more than 80 files, so each one fits within GitHub's limit of 100 files per upload.

## Uploading to GitHub in the browser

GitHub's web uploader takes at most 100 files at a time, so upload in two rounds.

1. Create a new empty repository.
2. **Round 1 (64 files).** Click **Add file → Upload files** and drag in `index.html`, `data.js`, `README.md` and the `fonts`, `js`, `media` and `img` folders together. Commit.
3. **Round 2 (74 files).** Click **Add file → Upload files** again and drag in the `photos` folder. Commit.

## Viewing it live (GitHub Pages)

Go to **Settings → Pages**, choose **Deploy from a branch**, then `main` / `(root)`, and save. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Running locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly from disk (`file://`) won't work, because the browser blocks the bottle labels, which are loaded as WebGL textures.
