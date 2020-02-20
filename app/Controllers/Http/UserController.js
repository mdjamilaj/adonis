'use strict'

const User = use('App/Models/User');
const Product = use('App/Models/Product');
const Category = use('App/Models/Category');
const Hash = use('Hash')
const { validate } = use('Validator')

  

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, auth, response, view }) {

    // const User = use('App/Models/User')



    const user = await User.find(1)
    const userPost = await user.posts().fetch()
    const userProfile = await user.profile().fetch()
    console.log(userProfile.toJSON());


    // belongsToMany Data Fetch

    // const product_category = await Product.query().with('categorys').fetch();
    // const category_product = await Category.query().with('products').fetch();
    // return category_product;
    // return product_category;

      const product = await Product.all();
      const category = await Category.all();
      // console.log(product.rows);
      const users = await User
        .query()
        .where('id', auth.user.id)
        .fetch()

        // console.log(users.toJSON());

      return view.render('index', {
        users: users.toJSON(),
        name: auth.user.username,
        Products: product.rows,
        Category: category.rows
      })


    return view.render('index.edge');
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
  
}

module.exports = UserController
