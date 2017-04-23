import isString from 'lodash/isString'
import {
  createUid as createUidAlias,
  reduceUid as reduceUidAlias
} from 'schesign-js-graph-utils/dist/utils'
/*
  /u/csenn/design/some_design/version/some_version/class/some_class
  /u/csenn/some_design/some_version/class/some_class
*/

export const createUid = reduced => createUidAlias(reduced, true)
export const reduceUid = uid => reduceUidAlias(uid)

/* Old way, for backwards compatibility */
export function createIdentifier (ownerType, userOrOrg, designName, versionLabel, resourceType, classOrProperty) {
  return createUid({
    ownerType,
    userOrOrg,
    designName,
    versionLabel,
    resourceType,
    classOrProperty
  })
}

export function areFromSameDesign (uidA, uidB) {
  const reducedA = reduceUid(uidA)
  const redcuedB = reduceUid(uidB)

  return reducedA.ownerType
    && reducedA.userOrOrg
    && reducedA.designName
    && reducedA.ownerType === redcuedB.ownerType
    && reducedA.userOrOrg === redcuedB.userOrOrg
    && reducedA.designName === redcuedB.designName
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
export function displayIdentifier (classOrPropertyIdentifier) {
  const { userOrOrg, designName, versionLabel, classOrProperty } = reduceUid(classOrPropertyIdentifier)
  return `${userOrOrg}/${designName}/${versionLabel}/${classOrProperty}`
}
