'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertForKnex = convertForKnex;
var JSON_SCHEMA = exports.JSON_SCHEMA = 'JSON_SCHEMA';
var XML_SCHEMA = exports.XML_SCHEMA = 'XML_SCHEMA';
var JSON_LD = exports.JSON_LD = 'JSON_LD';

var POSTGRE_SQL = exports.POSTGRE_SQL = 'POSTGRE_SQL';
var MY_SQL = exports.MY_SQL = 'MY_SQL';
var MARIA_DB = exports.MARIA_DB = 'MARIA_DB';
var SQ_LITE = exports.SQ_LITE = 'SQ_LITE';
var MS_SQL = exports.MS_SQL = 'MS_SQL';
var ORACLE = exports.ORACLE = 'ORACLE';

function convertForKnex(db) {
  switch (db) {
    case POSTGRE_SQL:
      return 'postgres';
    case MY_SQL:
      return 'mysql2';
    case MARIA_DB:
      return 'maria';
    case SQ_LITE:
      return 'sqlite3';
    case MS_SQL:
      return 'mssql';
    case ORACLE:
      return 'oracle';
    default:
      throw new Error('bad db constant: ' + db);
  }
}