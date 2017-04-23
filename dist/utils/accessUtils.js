'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDesignAccess = getDesignAccess;
exports.getOrgAccess = getOrgAccess;
exports.doesOwnOrg = doesOwnOrg;
exports.canAdminOrg = canAdminOrg;
exports.hasOrgMemberAccess = hasOrgMemberAccess;
exports.doesOwnDesign = doesOwnDesign;
exports.canAdminDesign = canAdminDesign;
exports.canEditDesign = canEditDesign;
exports.canViewDesign = canViewDesign;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _validate = require('schesign-js-graph-utils/dist/validate');

var _accessTypeConstants = require('../constants/accessTypeConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDesignAccess(design, userUid) {
  if ((0, _isString2.default)(userUid)) {
    if (design.owner === userUid) {
      return _accessTypeConstants.OWNER_ACCESS;
    }

    if (design.canAdminDesign && (0, _includes2.default)(design.canAdminDesign, userUid)) {
      return _accessTypeConstants.ADMIN_ACCESS;
    }

    if (design.canEditDesign && (0, _includes2.default)(design.canEditDesign, userUid)) {
      return _accessTypeConstants.EDIT_ACCESS;
    }

    if (design.isPrivate === true && design.canViewDesign && (0, _includes2.default)(design.canViewDesign, userUid)) {
      return _accessTypeConstants.VIEW_ACCESS;
    }
  }

  if (design.isPrivate === false) {
    return _accessTypeConstants.VIEW_ACCESS;
  }

  return null;
}

function getOrgAccess(org, userUid) {
  var err = (0, _validate.validateUserUid)(userUid);
  if (userUid && err) {
    throw new Error('Not a userUid: ' + userUid);
  }

  if (org.owner === userUid) {
    return _accessTypeConstants.ORG_OWNER_ACCESS;
  }

  if ((0, _includes2.default)(org.admins, userUid)) {
    return _accessTypeConstants.ORG_ADMIN_ACCESS;
  }

  if ((0, _includes2.default)(org.members, userUid)) {
    return _accessTypeConstants.ORG_MEMBER_ACCESS;
  }

  return null;
}

/* Org getters */
function doesOwnOrg(accessType) {
  return accessType === _accessTypeConstants.ORG_OWNER_ACCESS;
}

function canAdminOrg(accessType) {
  return doesOwnOrg(accessType) || accessType === _accessTypeConstants.ORG_ADMIN_ACCESS;
}

function hasOrgMemberAccess(accessType) {
  return canAdminOrg(accessType) || accessType === _accessTypeConstants.ORG_MEMBER_ACCESS;
}

/* Design getters */
function doesOwnDesign(accessType) {
  return accessType === _accessTypeConstants.OWNER_ACCESS;
}

function canAdminDesign(accessType) {
  return doesOwnDesign(accessType) || accessType === _accessTypeConstants.ADMIN_ACCESS;
}

function canEditDesign(accessType) {
  return canAdminDesign(accessType) || accessType === _accessTypeConstants.EDIT_ACCESS;
}

function canViewDesign(accessType) {
  return canEditDesign(accessType) || accessType === _accessTypeConstants.VIEW_ACCESS;
}