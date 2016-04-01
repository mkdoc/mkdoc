var expect = require('chai').expect
  , doc = require('../..');

describe('doc:', function() {

  it('should error with no args', function(done) {
    function fn() {
      doc();
    }
    expect(fn).throws(/file list sources expected/i);
    done();
  });


  it('should accept string arg', function(done) {
    expect(doc('file.md', {})).to.be.an('object');
    done();
  });

  it('should accept multiple string args', function(done) {
    expect(doc('file.md', 'other.md', true)).to.be.an('object');
    done();
  });

  it('should accept array arg', function(done) {
    expect(doc(['file.md', 'other.md'])).to.be.an('object');
    done();
  });


});
