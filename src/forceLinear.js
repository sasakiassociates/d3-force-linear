function linearPack(alpha, strength, padding) {
    let nodes,
        quadtree;

    function initialize() {
        if (!nodes) return;
        if (!strength) strength = 5;
        if (!padding) padding = 1;
        if (!alpha) alpha = 0;
        quadtree = d3.quadtree()
                     .x((d) => d.x)
                     .y((d) => d.y)
                     .addAll(nodes);
    }

    function pullToX(d) {
        d.y += (d.idealcy - d.y) * alpha * strength;
        d.x += (d.idealcx - d.x) * alpha;
        return d;
    }

    function collide(d) { // ref: https://bl.ocks.org/mbostock/7881887
        var alphaC = 0.5; // todo: comment
        var r = d.radius + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.data && (quad.data !== d)) {
                var x = d.x - quad.data.x,
                    y = d.y - quad.data.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.data.radius + padding;
                if (l < r) {
                    l = (l - r) / l * alphaC;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.data.x += x;
                    quad.data.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    }

    function force () {
        if (!alpha) return;

        nodes.forEach(function (node) {
            pullToX(node);
            collide(node);
        });
    }

     force.initialize = _ => {
         nodes = _;
         initialize();
     };

    return force;
}

export default linearPack;

export function initializeLinearPack (nodes) {
    let clusters = {};

    function getPosition (n) {
        var tau = 1 / 2 + Math.sqrt(5) / 2;
        var r = Math.sqrt(n + 1 / 2);
        var theta = n * (2 * Math.PI / tau);
        return plotPoint(r, theta);
    }

    function plotPoint (r, theta) {
        var x = r * Math.sin(theta);
        var y = r * Math.cos(theta);
        return {x: x, y: y};
    }

    return nodes.map(function (d) {
        var existingPositions = [];
        if (d.radius && d.idealcx) {
            var cluster = Math.round(d.idealcx);
            if (!clusters[cluster]) {
                clusters[cluster] = 0;
            }
            while(true) {
                var pos = getPosition(clusters[cluster]);
                d.x = pos.x + d.idealcx;
                d.y = pos.y+ d.idealcy;
                clusters[cluster]++;
                if (!existingPositions.some(function (val, i) {
                        return (val.x == d.x && val.y == d.y);
                })) break;
            }
            existingPositions.push(d);
            return d;
        }
    });
}