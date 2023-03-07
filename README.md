# igc2kmz
Typescript port of Tom Payne's python tool [igc2kmz](https://github.com/twpayne/igc2kmz) (**work in progress**)

The resulting tool is here: [igc2kmz.html](igc2kmz.html)
(it can be used in command line, see [usage](#usage))

[![Visualisation example](doc/output_MtBlanc.jpg?raw=true)](doc/output_MtBlanc.jpg?raw=true)

## Usage
**For the web** : See [examples/example.html](examples/example.html)

**Command line** : [build first](#build) then on a prompt :
```
node dist\igc2kmz.js examples\flight.igc
```
Upload to [Google Earth](https://earth.google.com/web/), voilà!

:information_source: *Note* : animations don't seem to work on web version of earth, but are ok on desktop version...

## Build
Get [sources from the repository](https://github.com/spasutto/igc2kmz) and install npm dependencies
```
git clone https://github.com/spasutto/igc2kmz.git
cd igc2kmz
npm install
```
then
```
npm run build    # for command line usage
#  or
npm run minify   # for web
```

## Features
#### Animation
[![Visualisation example](doc/animation.webp?raw=true)](doc/animation.webp?raw=true)
#### Glides / thermals visualisation :
[![Visualisation example](doc/thermals_glides.jpg?raw=true)](doc/thermals_glides.jpg?raw=true)
#### Extruded path :
[![Visualisation example](doc/extruded_path.jpg?raw=true)](doc/extruded_path.jpg?raw=true)

## Bugs/todo
 - tests
 - versioning
 - command line usage
   - photos
   - tasks
 - task drawing
 - ~~pilot's name over paraglider icon in animation?~~ (not really usable ; commented out in make_animation)
