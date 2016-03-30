'use strict'

const assert = require('assert')

describe('OKCandidate API Unit Tests', () => {

  it('Environment variables should be not null', () => {
    assert.notEqual(process.env['OKC_DB_USER'], null)
    assert.notEqual(process.env['OKC_DB_PASSWORD'], null)
    assert.notEqual(process.env['OKC_DB_NAME'], null)
    assert.notEqual(process.env['SMARTY_STREETS_AUTH_ID'], null)
    assert.notEqual(process.env['SMARTY_STREETS_AUTH_TOKEN'], null)
  })
})
