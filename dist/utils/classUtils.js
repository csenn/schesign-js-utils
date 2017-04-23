// import { NESTED_OBJECT } from '~/common/constants/rangeConstants'

// export function createEmptyStrucutre (classItem, classCache, propertyCache) {
//   const result = {}

//   function recursePropertyRefs (propertyRefs) {
//     propertyRefs.forEach(ref => {
//       const property = propertyCache[ref.propertyId]
//       const { range } = property

//       let value
//       if (range.type === NESTED_OBJECT) {
//         value = recursePropertyRefs(range.propertyRefs)
//       } else {
//         value = ''
//       }

//       result[property.name] = ref.cardinality.isMultiple ? [value] : value
//     })
//   }

//   function recurseParents (classId) {
//     if (!classId) {
//       return
//     }
//     const nextClass = classCache[classId]
//     recursePropertyRefs(nextClass.propertyRefs)
//     if (nextClass.subClassOf) {
//       recurseParents(nextClass.subClassOf)
//     }
//   }

//   recurseParents(classItem._id)

//   return result
// }
"use strict";