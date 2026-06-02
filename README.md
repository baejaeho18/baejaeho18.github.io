# baejaeho18.github.io

Personal academic homepage + blog of **Jaeho Bae (배재호)**.

- **Home** — academic landing page (about, education, selected publications) with a
  CV-style sidebar. Detail pages: Publications, Experience, Teaching, Projects, Awards.
- **Blog** — Korean blog with category / tag / year archives, in a clean
  full-width-header style.

Custom Jekyll site (no external theme) — academic homepage inspired by
[academicpages](https://github.com/academicpages/academicpages.github.io),
blog look inspired by [Hux Blog](https://github.com/Gaohaoyang/gaohaoyang.github.io).

## Editing content

Most academic content lives in data files — no need to touch templates:

| What | File |
|------|------|
| About, Education, Experience, Teaching, Publications, Projects, Awards, Skills | `_data/cv.yml` |
| Top navigation | `_data/navigation.yml` |
| Name, avatar, social links, blog cover | `_config.yml` |
| Blog posts | `_posts/*.md` (front matter: `category`, `tags: [..]`) |

## Local development

Ruby is not required locally — build with Docker:

```bash
docker run --rm -p 4000:4000 \
  -v "$PWD:/site" -v bjh-bundle:/bundle -e BUNDLE_PATH=/bundle -w /site \
  ruby:3.3 bash -lc "bundle install && bundle exec jekyll serve --host 0.0.0.0"
```

Then open <http://localhost:4000>. Or, with a local Ruby toolchain:

```bash
bundle install
bundle exec jekyll serve
```

## Deployment

Hosted on GitHub Pages from the `main` branch (github-pages gem, safe mode).
The previous Hydejack-based site is preserved on the `backup-hydejack` branch.
