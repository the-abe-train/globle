# Globle Infinite
This is a fork of the original globle game made by the-abe-train [here](https://github.com/the-abe-train/globle)  
This fork, like the original is licensed under the Attribution-NonCommercial-ShareAlive 4.0 Interntaional (CC BY-NC-SA 4.0) license  

This version will allow you to play as many globle games in a day as you wish, with a new random country every time

# Notes about Globle
**Version 1.4.0** - [Change log](CHANGELOG.md)

## Listed countries
- The list of countries for this game is the same as that used by [Sporcle](https://www.sporcle.com/blog/2013/01/what-is-a-country/)
- Some alternate spellings and previous names are accepted, e.g. Burma for Myanmar.
- France and UK have many territories scattered throughout the globe, and they confuse the proximity algorithm, so they are not highlighted when those countries are guessed.
- Geography can be a sensitive topic, and some countries' borders are disputed. If you believe a correction should be made, please politely raise an issue or DM me on [Twitter](https://twitter.com/theAbeTrain).

## Tip
If you are really struggling to find the answer, I recommend going to Google Maps or Earth. Better to learn about a new country than never get the answer!

## Accessibility
I recognize that there are some a11y issues with the game, notably:
1. The colour gradient can be difficult to navigate for people with vision impairments, and
2. Very small countries (such as Micronesia) are barely visible on the globe.
If you have a suggestion on how to improve these concerns, please raise a GitHub issue.

## Analytics
Globle is hosted by CloudFlare and uses CloudFlare Web Analytics (CWA), a privacy-first analytics platform, to track user activity. The analytics are injected during hosting, so while you may see network traffic to https://cloudflareinsights.com/, the script that sends information to CWA is not anywhere in this repo. To learn more about CWA, [click here](https://www.cloudflare.com/en-gb/web-analytics/).

## Attributions
- This game was inspired by Wordle and the "Secret Country" geography games from [Sporcle](https://sporcle.com)
- Country outlines in the Help screen provided by Vemaps.com
- Favicons are from favicon.io

# Running the project on your local machine
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). If you want to run the project on your local machine,
1. Clone this repo
2. `npm install`
3. `npm start`

# License
Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
