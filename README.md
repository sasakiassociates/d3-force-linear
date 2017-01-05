# d3-force-linear

Modular force for use with D3's `forceSimulation`.

A dynamic `beeswarm` plot implemented using D3's `forceSimulation`. Works well with massive nodes packing to the ideal axis position with no overlapping guaranteed.

Adapted from Mike Bostock's [Clustered Force Layout III](https://bl.ocks.org/mbostock/7881887) and [Beeswarm](https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320)

## Installing

#### npm

`npm install d3-force-linear`

#### CDN ([UNPKG](https://unpkg.com/)), via `<script>`

`<script src="https://unpkg.com/d3-force-linear@latest"></script>`

#### Local, via `<script>`

Download the [latest release](https://github.com/sasakiassociates/d3-force-linear/releases/latest)

`<script src="./d3-force-linear.min.js"></script>`

## Algorithm
#### Pseudo code
```
for tick in ticks
	for node in nodes
		apply x direction force pulling nodes to its x coordinate
		apply y direction force pulling nodes to the axis
		apply collision force using quadtree
```

#### works well on massive nodes

- guaranteed no overlapping
- quickly cooling down to stable positions
- parameters to easily control the `shifting error` and `cooling down speed`

## Usage
### Accessing the module
The install method you use determines the syntax for accessing the module in your code:
#### npm
Import the `linearPack()` method and use it in a `forceSimulation`.

```
import { linearPack } from 'd3-force-linear'

d3.forceSimulation
   .force('linearPack', d3.linearPack(1, 5, 2));
```

#### via `<script>` or CDN ([UNPKG](https://unpkg.com/))
The `linearPack()` method is available in the global `d3` namespace.

```
d3.forceSimulation
	.force('cluster', d3.forceCluster());
```

#### Using the module

Add a 'linearPack' force just like you would any other D3 force module:

```
var data = [{x: 1, y: 2},
			{x: 1, y: 2},
			{x: 2, y: 2},...];
var nodes = d3.initializeLinearPack(data);

var simulation = d3.forceSimulation()
   .on(tick, layoutTick)
   .nodes(nodes);

function layoutTick() {
	// add a linearPack force to pull nodes toward their assigned axis position
	simulation
	  .force('linearPack', d3.linearPack(alpha, 0.5, 2);
}
```

More detailed examples:
![from bl.ocks.org]()

## API

The `forceLinear` module follows the [basic interface described in d3-force](https://github.com/d3/d3-force/blob/master/README.md#forces), additionally implementing the following:

<a href="#initializeLinearPack" name="initializeLinearPack">#</a> <i>d3</i>.<b>initializeLinearPack</b>(<i>nodes</i>) [<>]()

Initialize node positions to cluster(s) as spirals which centers are at the ideal axis positions. This method is call before the `forceSimulation(nodes)`, to avoid nodes being applied forces only along the axis due to the identical vertical coordinates. Optionally, users are allowed to create their own *intializeLinearPack* function, which provides nodes vertical shift positions.

<a href="#liearPack" name="liearPack">#</a> <i>linear</i>.<b>linearPack</b>(<i>alpha, strength, padding</i>) [<>]()

Applying x-direction force, y-direction force and collision force on each of the nodes. This method is called inside `forceSimulation.tick()` which should be triggered in every `tick` event.

- If *alpha* is specified, sets the current alpha to the specified number in the range [0, 1]. If *alpha* is not specified, it defaults to 0.
- if *strength* is specified, sets the y direction force strength specified number in the range [0, +infinite] . If *strength* is not specified, it defaults to 5.
- If *padding* is specified, sets the nodes padding number in the range [0, +infinite]. If *padding* is not specified, it defaults to 1.

## Building and testing

Install [npm](https://www.npmjs.com/) if you haven't already.

Build with the following commands:

```
npm install --save d3-force-linear
npm run dist
```

Test with `npm run test`.`

#### Work with ES6

Rollup is used to package the files in a future-proof way. You can use the npm installed package as usual with any ES5 project or target the ES6 modules directly using the jsnext:main file (versions/*/dist/png-db.mjs)

For use with ES6 modules on the client side, we recommended bundling with jspm.

`jspm install npm:d3-force-linear`
