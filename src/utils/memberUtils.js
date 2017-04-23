import {
  OWNER_ACCESS,
  ADMIN_ACCESS,
  EDIT_ACCESS,
  VIEW_ACCESS,
  ORG_OWNER_ACCESS,
  ORG_ADMIN_ACCESS,
  ORG_MEMBER_ACCESS
} from '../constants/accessTypeConstants'

export function renderAccessName (accessType) {
  switch (accessType) {
    case OWNER_ACCESS: return 'Owner'
    case ADMIN_ACCESS: return 'Admin'
    case EDIT_ACCESS: return 'Edit'
    case VIEW_ACCESS: return 'Member'
    case ORG_OWNER_ACCESS: return 'Owner'
    case ORG_ADMIN_ACCESS: return 'Admin'
    case ORG_MEMBER_ACCESS: return 'Member'
  }
}

// export function renderOrgRoleName (role) {
//   switch (role) {
//   }
// }

export function renderRole (memberUid, $$design) {
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
