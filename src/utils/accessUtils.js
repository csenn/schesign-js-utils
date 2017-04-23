import isString from 'lodash/isString';
import includes from 'lodash/includes';
import { validateUserUid } from 'schesign-js-graph-utils/dist/validate';
import {
  OWNER_ACCESS,
  ADMIN_ACCESS,
  EDIT_ACCESS,
  VIEW_ACCESS,

  ORG_OWNER_ACCESS,
  ORG_ADMIN_ACCESS,
  ORG_MEMBER_ACCESS,
} from '../constants/accessTypeConstants';

export function getDesignAccess(design, userUid) {
  if (isString(userUid)) {
    if (design.owner === userUid) {
      return OWNER_ACCESS;
    }

    if (design.canAdminDesign && includes(design.canAdminDesign, userUid)) {
      return ADMIN_ACCESS;
    }

    if (design.canEditDesign && includes(design.canEditDesign, userUid)) {
      return EDIT_ACCESS;
    }

    if (design.isPrivate === true && design.canViewDesign && includes(design.canViewDesign, userUid)) {
      return VIEW_ACCESS;
    }
  }

  if (design.isPrivate === false) {
    return VIEW_ACCESS;
  }

  return null;
}

export function getOrgAccess(org, userUid) {
  const err = validateUserUid(userUid);
  if (userUid && err) {
    throw new Error(`Not a userUid: ${userUid}`);
  }

  if (org.owner === userUid) {
    return ORG_OWNER_ACCESS;
  }

  if (includes(org.admins, userUid)) {
    return ORG_ADMIN_ACCESS;
  }

  if (includes(org.members, userUid)) {
    return ORG_MEMBER_ACCESS;
  }

  return null;
}

/* Org getters */
export function doesOwnOrg(accessType) {
  return accessType === ORG_OWNER_ACCESS;
}

export function canAdminOrg(accessType) {
  return doesOwnOrg(accessType)
    || accessType === ORG_ADMIN_ACCESS;
}

export function hasOrgMemberAccess(accessType) {
  return canAdminOrg(accessType)
    || accessType === ORG_MEMBER_ACCESS;
}

/* Design getters */
export function doesOwnDesign(accessType) {
  return accessType === OWNER_ACCESS;
}

export function canAdminDesign(accessType) {
  return doesOwnDesign(accessType)
    || accessType === ADMIN_ACCESS;
}

export function canEditDesign(accessType) {
  return canAdminDesign(accessType)
    || accessType === EDIT_ACCESS;
}

export function canViewDesign(accessType) {
  return canEditDesign(accessType)
    || accessType === VIEW_ACCESS;
}
