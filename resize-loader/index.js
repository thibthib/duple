var lwip = require('lwip');
var sizeOf = require('image-size');
var loaderUtils = require('loader-utils');

module.exports = function(content) {
	this.cacheable();
	
	var source = sizeOf(content);
	var query = loaderUtils.parseQuery(this.query);
	
	var getFinalDimension = function(dimension, query, source) {
		var otherDimension = dimension === 'height' ? 'width' : 'height';
		
		if (typeof query[dimension] !== 'undefined') {
			return parseInt(query[dimension], 10);
		} else if (typeof query[otherDimension] !== 'undefined') {
			return parseInt(query[otherDimension], 10)/source[otherDimension] * source[dimension];
		} else {
			return source[dimension];
		}
	}
	
	var final = {
		width: getFinalDimension('width', query, source),
		height: getFinalDimension('height', query, source)
	}
	
	var callback = this.async();

	lwip.open(content, source.type, function(err, image) {
		image.cover(final.width, final.height, function(err, image) {
			image.toBuffer(source.type, function(err, buffer) {
				callback(err, buffer)
			});
		});
	});
}

module.exports.raw = true
