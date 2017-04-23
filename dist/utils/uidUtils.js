'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceUid = exports.createUid = undefined;
exports.createIdentifier = createIdentifier;
exports.areFromSameDesign = areFromSameDesign;
exports.displayIdentifier = displayIdentifier;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _utils = require('schesign-js-graph-utils/dist/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  /u/csenn/design/some_design/version/some_version/class/some_class
  /u/csenn/some_design/some_version/class/some_class
*/

var createUid = exports.createUid = function createUid(reduced) {
  return (0, _utils.createUid)(reduced, true);
};
var reduceUid = exports.reduceUid = function reduceUid(uid) {
  return (0, _utils.reduceUid)(uid);
};

/* Old way, for backwards compatibility */
function createIdentifier(ownerType, userOrOrg, designName, versionLabel, resourceType, classOrProperty) {
  return createUid({
    ownerType: ownerType,
    userOrOrg: userOrOrg,
    designName: designName,
    versionLabel: versionLabel,
    resourceType: resourceType,
    classOrProperty: classOrProperty
  });
}

function areFromSameDesign(uidA, uidB) {
  var reducedA = reduceUid(uidA);
  var redcuedB = reduceUid(uidB);

  return reducedA.ownerType && reducedA.userOrOrg && reducedA.designName && reducedA.ownerType === redcuedB.ownerType && reducedA.userOrOrg === redcuedB.userOrOrg && reducedA.designName === redcuedB.designName;
}

// export function createIdentifier () {
//   if (ownerType !== 'u' && ownerType !== 'o') {
//     throw new Error('Bad owner type')
//   }
//   if (!userOrOrg) {
//     throw new Error('User or org is required')
//   }

//   let url = `${ownerType}/${userOrOrg}`

//   if (designName) {
//     url += `/${designName}`
//     if (versionLabel) {
//       url += `/${versionLabel}`
//       if (resourceType) {
//         if (resourceType !== 'class' && resourceType !== 'property') {
//           throw new Error('Bad resource type')
//         }
//         if (!classOrProperty) {
//           throw new Error('Class or property required to get here')
//         }
//         url += `/${resourceType}/${classOrProperty}`
//       }
//     }
//   }

//   return url.toLowerCase()
// }

// export function reduceUid (uid) {
//   if (!isString(uid)) {
//     throw new Error('Identifier must be a string')
//   }
//   const parts = uid.split('/')
//   if (parts[0] === '') {
//     parts.shift()
//   }
//   const result = {}
//   const add = (index, key) => {
//     if (parts[index]) {
//       result[key] = parts[index]
//     }
//   }
//   add(0, 'ownerType')
//   add(1, 'userOrOrg')
//   add(2, 'designName')
//   add(3, 'versionLabel')
//   add(4, 'resourceType')
//   add(5, 'classOrProperty')
//   return result
// }

/* Convenience to create a shorter url for display */
function displayIdentifier(classOrPropertyIdentifier) {
  var _reduceUid = reduceUid(classOrPropertyIdentifier),
      userOrOrg = _reduceUid.userOrOrg,
      designName = _reduceUid.designName,
      versionLabel = _reduceUid.versionLabel,
      classOrProperty = _reduceUid.classOrProperty;

  return userOrOrg + '/' + designName + '/' + versionLabel + '/' + classOrProperty;
}