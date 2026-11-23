# Changelog

## 0.5.5

- Kino's own settings form shows again in Ajustes (settingsIn both); Retry keeps the queued work (std 1.6.2)

## 0.5.4

- Back closes the search box (the screen declares onBack while searching) instead of the whole screen (std 1.6.1)

## 0.5.3

- Tabs load again: the previous version used a timer Kino does not have, so every tab failed; a tab Kino cut short now offers Retry (std 1.6.0)

## 0.5.2

- Back closes the search box instead of the screen; a tab that takes too long offers Retry instead of skeletons; fewer TMDB lookups per tick (std 1.6.0)

## 0.5.1

- The standard screen catches up: a hero from TMDB backdrops when the site has none, TMDB lookups three at a time, one card shape per rail, a row's English title (std 1.5.1)

## 0.5.0

- The standard xuper-plugin screen (src/std 1.3.0): one bar with the logo and the name, Buscar (the words go to Kino's own search) and Ajustes (Kino's own form of the settings, and the donation); a hero of slides; cards and slides open Kino's own title page. The plugin's own search page is gone. TMDB's pictures where a title matches, the site's own asked with its Referer. apiVersion 30 (Kino 0.9.91).

