'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderAccessName = renderAccessName;
exports.renderRole = renderRole;

var _accessTypeConstants = require('../constants/accessTypeConstants');

function renderAccessName(accessType) {
  switch (accessType) {
    case _accessTypeConstants.OWNER_ACCESS:
      return 'Owner';
    case _accessTypeConstants.ADMIN_ACCESS:
      return 'Admin';
    case _accessTypeConstants.EDIT_ACCESS:
      return 'Edit';
    case _accessTypeConstants.VIEW_ACCESS:
      return 'Member';
    case _accessTypeConstants.ORG_OWNER_ACCESS:
      return 'Owner';
    case _accessTypeConstants.ORG_ADMIN_ACCESS:
      return 'Admin';
    case _accessTypeConstants.ORG_MEMBER_ACCESS:
      return 'Member';
    default:
      return '';
  }
}

// export function renderOrgRoleName (role) {
//   switch (role) {
//   }
// }

function renderRole(memberUid, $$design) {
  // if (!$$design) {
  //   return ''
  // }
  // const design = $$design.toJS()

  // if (design.owner === memberUid) {
  //   return renderRoleName(DESIGN_OWNER_ROLE)
  // }
  // if (includes(design.canAdminDesign, memberUid)) {
  //   return renderRoleName(DESIGN_ADMIN_ROLE)
  // }
  // if (includes(design.canEditDesign, memberUid)) {
  //   return renderRoleName(DESIGN_EDIT_ROLE)
  // }
  // if (includes(design.canViewesign, memberUid)) {
  //   return renderRoleName(DESIGN_VIEW_ROLE)
  // }

  // throw new Error('Bad Role, user does not exist')
}