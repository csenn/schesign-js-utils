export const JSON_SCHEMA = 'JSON_SCHEMA'
export const XML_SCHEMA = 'XML_SCHEMA'
export const JSON_LD = 'JSON_LD'

export const POSTGRE_SQL = 'POSTGRE_SQL'
export const MY_SQL = 'MY_SQL'
export const MARIA_DB = 'MARIA_DB'
export const SQ_LITE = 'SQ_LITE'
export const MS_SQL = 'MS_SQL'
export const ORACLE = 'ORACLE'

export function convertForKnex (db) {
  switch (db) {
    case POSTGRE_SQL: return 'postgres'
    case MY_SQL: return 'mysql2'
    case MARIA_DB: return 'maria'
    case SQ_LITE: return 'sqlite3'
    case MS_SQL: return 'mssql'
    case ORACLE: return 'oracle'
    default:
      throw new Error(`bad db constant: ${db}`)
  }
}
