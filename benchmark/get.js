var Benchmark = require('benchmark')
  , suite = new Benchmark.Suite
  , dottie = require('../dottie');

var data = {
  none: true,
  one: {
    value: true,
    two: {
      value: true
    }
  }
};

suite
.add('dottie.get(none) (memoizePath: false)', function() {
  dottie.memoizePath = false;
  dottie.get(data, 'none');
})
.add('dottie.get(none) (memoizePath: true)', function() {
  dottie.memoizePath = true;
  dottie.get(data, 'none');
})
.add('dottie.get([none])', function() {
  dottie.get(data, ['none']);
})
.add('dottie.get(one.value) (memoizePath: false)', function() {
  dottie.memoizePath = false;
  dottie.get(data, 'one.value');
})
.add('dottie.get(one.value) (memoizePath: true)', function() {
  dottie.memoizePath = true;
  dottie.get(data, 'one.value');
})
.add('dottie.get([one, value])', function() {
  dottie.get(data, ['one', 'value']);
})
.add('dottie.get(one.two.value) (memoizePath: false)', function() {
  dottie.memoizePath = false;
  dottie.get(data, 'one.two.value');
})
.add('dottie.get(one.two.value) (memoizePath: true)', function() {
  dottie.memoizePath = true;
  dottie.get(data, 'one.two.value');
})
.add('dottie.get([one, two, value])', function() {
  dottie.get(data, ['one', 'two', 'value']);
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({ 'async': true });