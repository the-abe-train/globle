# Change log

## v1.6.0 - May 31, 2022
- Added translations for Italian and Polish (thank you international translators!)
- Added rainbow theme for pride 🏳️‍🌈
- Increased zoom speed
- You can now toggle the list of guessed countries between "sort by order of guesses" and "sort by distance"
- Added switch for miles to km in closest border preview
- Rounded closest border preview to nearest 10 km/miles due to imprecisions in the game's borders
- Added (shameful self-promotion) link to [Plurality](https://plurality.fun) to the stats menu
- Added fallback error message to share score functionality
- Added alternate names for some French, Spanish, and Portuguese countries

## v1.5.0 - Apr 25, 2022
- Added Practice mode so players can play unlimited times per day to hone their geography skills without affecting their score
- Added translations for French, German, and Portuguese (thank you international translators!)
- Guessing or clicking on small countries now zooms in
- Removed the check boxes visible in the Settings page on Safari
- Added routing for the different pages (React Router v6)
- Added "along the Earth's surface" to FAQ about distance calculation
- Adjusted borders for Andaman and Nicobar Islands
- Improved translation methodology to make the code more flexible for future translators (Issue #68)

## v1.4.0 - Mar 21, 2022
- Translated game into Spanish
- Fixed bug that caused the globe not to display on older browsers
- Added "Closest border" helper to Game screen
- Changed share message to remove URL and include emojis and hashtag
- Created new territories for Kaliningrad, Canary Islands, Western Sahara, Martinique, and New Caledonia
- Adjusted Cyprus borders to include Northern Cyprus
- Added fade animation to countries on Help screen
- Added explicit line about "Closer countries are hotter" to the Help page
- Changed "Invalid country name" to "Invalid guess"
- Removed yes/no buttons from "Stats erased" popup
- Fixed spelling of "possible" in the meta tag
- Changed coffee emoji to svg
- Replaced react-transition-group with custom HOC

## v1.3.0 - Feb 25, 2022
- Added zoom buttons for mobile
- Add today's guesses to statistics popup
- Added Share API for mobile players
- Added Cape Verde as alternate spelling for Cabo Verde
- Made Corsica, Svalbard, and Andaman and Nicobar Islands into territories
- Improved styling on globe and winning text
- Added analytics disclaimer to README
- Added "buy me a coffee" link to the footer of the Help page

## v1.2.0 - Feb 13, 2022

- Added "territories" to the game, which appear in a neutral colour when their sovereign country is guessed
- Restructured Greenland, French Guiana, and Puerto Rico into territories
- Created a new high-contrast mode for colour blind players (thank you GitHub user AH-Dietrich for the contribution!)
- Added an FAQ section to address frequent questions and concerns about the game
- Removed the zoom limit on recentering
- Fixed bug that jumbled the order of guesses upon refresh

## v1.1.0 - Feb 4, 2022

**Statistics**
- Include today's guesses in stats sharing

**Countries**
- Add smaller countries, including Singapore and Andorra
- Switch Crimea from Russia to Ukraine
- Combined Greenland into Denmark
- Added alternative names for some countries, such as Burma and eSwatini
- Add disclaimer to README about which countries are used, as well as a link to the README in the Help screen footer 

**Navigation Controls**
- Fixed the centring logic for auto point-of-view change for some countries, including Fiji
- Fixed answer to actually be any country
- Reduced aggressive auto-zoom when clicking on a country


## v1.0.0 - Jan 26, 2022

Initial release