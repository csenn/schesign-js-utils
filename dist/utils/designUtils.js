'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNextVersion = getNextVersion;

var _publishConstants = require('../constants/publishConstants');

function getNextVersion(currentLabel, updateType) {
  var label = currentLabel === 'master' ? '0.0.0' : currentLabel;
  var currentSplit = label.split('.');
  var major = parseInt(currentSplit[0]);
  var minor = parseInt(currentSplit[1]);
  var patch = parseInt(currentSplit[2]);

  if (updateType === _publishConstants.UPDATE_MAJOR) {
    major += 1;
    return major + '.0.0';
  } else if (updateType === _publishConstants.UPDATE_MINOR) {
    minor += 1;
    return major + '.' + minor + '.0';
  } else if (updateType === _publishConstants.UPDATE_PATCH) {
    patch += 1;
    return major + '.' + minor + '.' + patch;
  } else {
    throw new Error('Invalid updateType: ' + updateType);
  }
}