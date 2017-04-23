'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports._fromObjectSchema = _fromObjectSchema;
exports._createSchemaFromRange = _createSchemaFromRange;
exports._flattenHierarchies = _flattenHierarchies;
exports.generateFromClass = generateFromClass;

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _fromStringRange(range) {
  var constraint = { type: 'string' };
  if (range.format) {
    switch (range.format) {
      case utils.TEXT_FORMAT_URL:
        constraint.format = 'uri';
        break;
      case utils.TEXT_FORMAT_EMAIL:
        constraint.format = 'email';
        break;
      case utils.TEXT_FORMAT_HOSTNAME:
        constraint.format = 'hostname';
        break;
      default:
    }
  } else if (range.regex) {
    constraint.pattern = range.regex;
  }

  if (utils.isNumber(range.minLength)) {
    constraint.minLength = range.minLength;
  }
  if (utils.isNumber(range.maxLength)) {
    constraint.maxLength = range.maxLength;
  }

  return constraint;
} /* eslint no-use-before-define: ["error", { "functions": false }]*/

function _fromNumberRange(range) {
  var constraint = {};

  switch (range.format) {
    case utils.NUMBER_INT:
    case utils.NUMBER_INT_8:
    case utils.NUMBER_INT_16:
    case utils.NUMBER_INT_32:
    case utils.NUMBER_INT_64:
      constraint.type = 'integer';
      break;
    default:
      constraint.type = 'number';
  }

  if (utils.isNumber(range.min)) {
    constraint.minimum = range.min;
  }
  if (utils.isNumber(range.max)) {
    constraint.maximum = range.max;
  }

  return constraint;
}

function _fromDateRange(range) {
  var constraint = { type: 'string' };
  if (range.format === utils.DATE_DATETIME) {
    constraint.format = 'date-time';
  }
  return constraint;
}

function _fromLinkedClassRange(context, range) {
  var rangeClass = context.classCache[range.ref];
  var keyName = rangeClass.uid.replace('https://', '');

  if (!context.definitions[keyName]) {
    context.definitions[keyName] = _fromObjectSchema(context, rangeClass.propertyRefs);
  }

  return { $ref: '#/definitions/' + keyName };
}

function _fromObjectSchema(context, propertyRefs) {
  var constraint = {
    type: 'object',
    required: []
  };

  constraint.properties = propertyRefs.reduce(function (prev, propertyRef) {
    var property = context.propertyCache[propertyRef.ref];
    var label = property.label,
        range = property.range;

    var childConstraint = _createSchemaFromRange(context, range);

    if (utils.isRequiredCardinality(propertyRef.cardinality)) {
      constraint.required.push(label);
    }

    var isArray = utils.isMultipleCardinality(propertyRef.cardinality);
    return (0, _assign2.default)({}, prev, (0, _defineProperty3.default)({}, label, isArray ? { type: 'array', items: childConstraint } : childConstraint));
  }, {});

  if (constraint.required.length === 0) {
    delete constraint.required;
  }

  return constraint;
}

function _createSchemaFromRange(context, range) {
  switch (range.type) {
    case utils.BOOLEAN:
      return { type: 'boolean' };
    case utils.ENUM:
      return { enum: range.values };
    case utils.DATE:
      return _fromDateRange(range);
    case utils.TEXT:
      return _fromStringRange(range);
    case utils.NUMBER:
      return _fromNumberRange(range);
    case utils.NESTED_OBJECT:
      return _fromObjectSchema(context, range.propertyRefs);
    case utils.LINKED_CLASS:
      return _fromLinkedClassRange(context, range);
    default:
      throw new Error('Not expecting type: ' + range.type);
  }
}

/* If there is a property label lower in the hierarchy,
do not overwrite it from parent with same name */
function existsInRefs(context, propertyRefs, parentRef) {
  return propertyRefs.some(function (ref) {
    var node = context.propertyCache[ref.ref];
    var parentNode = context.propertyCache[parentRef.ref];
    return node.label === parentNode.label;
  });
}

function _flattenHierarchies(context) {
  (0, _keys2.default)(context.classCache).forEach(function (key) {
    var classNode = context.classCache[key];
    var recurseNode = function recurseNode(node) {
      if (node.subClassOf) {
        var parent = context.classCache[node.subClassOf];
        parent.propertyRefs.forEach(function (parentRef) {
          var exclude = classNode.excludeParentProperties && classNode.excludeParentProperties.includes(parentRef.ref);
          var exists = existsInRefs(context, classNode.propertyRefs, parentRef);
          if (!exclude && !exists) {
            classNode.propertyRefs.push(parentRef);
          }
        });
        recurseNode(parent);
      }
    };
    recurseNode(classNode);
  });
}

/*
  Entry point. Provide the graph, the classId, and options
*/
function generateFromClass(graph, classId) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  /* Create a simple context obj to thread through */
  var context = {
    classCache: {},
    propertyCache: {},
    definitions: {}
  };

  /* Create a dict lookup for classes and properties for speed and convenience */
  graph.forEach(function (node) {
    if (node.type === 'Class') {
      context.classCache[node.uid] = node;
    } else if (node.type === 'Property') {
      context.propertyCache[node.uid] = node;
    }
  });

  _flattenHierarchies(context);

  var currentClass = context.classCache[classId];

  /* Create top level object schema */
  var schema = _fromObjectSchema(context, currentClass.propertyRefs, context.schema);

  /* Add meta and definitions (if there are any) */
  schema.$schema = 'http://json-schema.org/draft-04/schema#';
  if ((0, _keys2.default)(context.definitions).length) {
    schema.definitions = context.definitions;
  }

  return schema;
}