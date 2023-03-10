# TikTok video downloader

This is a simple script to download TikTok videos.

## Project status

> This project is currently active and maintained.
>
> ![GitHub top language](https://img.shields.io/github/languages/top/loo-kuhs/tiktok-video-downloader?style=for-the-badge)
> ![GitHub last commit](https://img.shields.io/github/last-commit/loo-kuhs/tiktok-video-downloader?style=for-the-badge)
> ![GitHub repo size](https://img.shields.io/github/repo-size/loo-kuhs/tiktok-video-downloader?style=for-the-badge)
> ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/loo-kuhs/tiktok-video-downloader?style=for-the-badge)

## Requirements

This project requires [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
Also you need to have [curl](https://curl.haxx.se/) installed.

## Usage

```bash
npm install
```

### Download a single video

```bash
node .\src\app.js --url '<video_url>'
# e.g. 
node .\src\app.js --url 'https://www.tiktok.com/@mrbeast/video/7198928728674618667?is_from_webapp=1&sender_device=pc&web_id=7203836903929447942'
# or
node .\src\app.js --url 'https://www.tiktok.com/@mrbeast/video/7198928728674618667'
```
> Note: The url must be enclosed in single quotes.

### Download multiple videos from a txt file

```bash
node .\src\app.js --file '<path_to_file>'
# e.g.
node .\src\app.js --file urls.txt
```

## TODO

- [x] Add support for downloading multiple videos from txt file
- [ ] Add support for downloading multiple videos from a given user
- [ ] Refactor code to pure ESM package

## Contributing

Feel free to edit the code and submit a pull request.