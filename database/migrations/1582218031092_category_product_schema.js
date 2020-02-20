'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoryProductSchema extends Schema {
  up () {
    this.create('category_product', (table) => {
      table.increments()
      table.integer('product_id', 100)
      table.integer('category_id', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('category_products')
  }
}

module.exports = CategoryProductSchema
