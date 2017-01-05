var tape = require("tape"),
    forceLinear = require("../");

tape("forceLinear() returns a valid force module.", function(test) {
  var unit = forceLinear.forceLinear();
  test.equal(typeof forceCluster, 'object');
  test.equal(typeof forceCluster.forceCluster, 'function');
  test.equal(typeof unit, 'function');
  test.equal(typeof unit.initialize, 'function');
  test.end();
});


