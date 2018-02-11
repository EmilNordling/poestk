# poestk-filter-json
filter-json takes GGG's Passive Skilltree JSON data, literate through it and filters out "unnecessary" properties or repetition.

## result
The end result right now is a **71%** size reduction (**59%** not counting skillSprites)
- assets: 93 kB -> **13 KB (86%)**  
- nodes: 650 kB -> **291 KB (55%)** 
- skillSprites: 427 kB -> 0 (is not being used in poestk-pst)

The gziped filed, containing nodes and groups, is **67.2 KB**

*Remaining 1KB objects is now featured in the poestk-pst build instead of having to request them after load.*  

## build
Development: beautify JSON files
```sh
$ yarn dev
```

Production: compress JSON files
```sh
$ yarn build
```
