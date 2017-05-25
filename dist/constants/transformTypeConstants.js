'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var JSON_SCHEMA = exports.JSON_SCHEMA = 'jsonschema';
var XML_SCHEMA = exports.XML_SCHEMA = 'xmlschema';
var JSON_LD = exports.JSON_LD = 'jsonld';
var SQL = exports.SQL = 'sql';
var MONGOOSE = exports.MONGOOSE = 'mongoose';
var JAVA = exports.JAVA = 'java';
var GO = exports.GO = 'go';
var GRAPH_QL = exports.GRAPH_QL = 'graphql';
var SWAGGER = exports.SWAGGER = 'swagger';

var POSTGRE_SQL = exports.POSTGRE_SQL = 'postgres';
var MY_SQL = exports.MY_SQL = 'mysql2';
var MARIA_DB = exports.MARIA_DB = 'maria';
var SQ_LITE = exports.SQ_LITE = 'sqlite3';
var MS_SQL = exports.MS_SQL = 'mssql';
var ORACLE = exports.ORACLE = 'oracle';

// export function convertForKnex (db) {
//   switch (db) {
//     case POSTGRE_SQL: return 'postgres'
//     case MY_SQL: return 'mysql2'
//     case MARIA_DB: return 'maria'
//     case SQ_LITE: return 'sqlite3'
//     case MS_SQL: return 'mssql'
//     case ORACLE: return 'oracle'
//     default:
//       throw new Error(`bad db constant: ${db}`)
//   }
// }