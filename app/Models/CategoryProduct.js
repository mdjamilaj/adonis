'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CategoryProduct extends Model {
    static get table(){
        return 'category_products'
    }
}

module.exports = CategoryProduct
