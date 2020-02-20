'use strict'

const Product = use("App/Models/Product");
const CategoryProduct = use("App/Models/CategoryProduct");
const Helpers = use('Helpers')
const Hash = use('Hash')
const { validate } = use('Validator')
const Drive = use('Drive')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    // const Product = await Product.all();
    console.log(Product);
    
    return view.render('product',{products: product.rows})
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, auth, response, view, session }) {

      const rules = {
        product_name: 'required',
      }
      const validation = await validate(request.all(), rules);
      if (validation.fails()) {
        return "Insert Form data error";
      }

      const unixTime  = Date.now();
      const product_img = request.file('product_img', {
        types: ['image'],
        size: '1mb'
      })

      if (!product_img) {
        this.uploadError = "No file";
        return false;
      }

      const fileName = `${unixTime}_product.${product_img.extname}`;

      // const product_img = request.file('product_img');
      const id = await auth.user.id;

      const product = await Product.create({
        user_id: id,
				product_name: request.input('product_name'),
				product_status: request.input('product_status'),
        product_price: request.input('product_price'),
        product_img: fileName
				
      })

      // return product.id;

      const arr = request.input('categorys');

      // return arr;

      for(var i=0; i<arr.length; i++){
        const categoryProduct = new CategoryProduct();
        categoryProduct.category_id = arr[i];
        categoryProduct.product_id = product.id;
        await categoryProduct.save();
      }
      


      
      
      const myPicture = request.file('product_img')

      await myPicture.move(Helpers.appRoot('public/uploads/post'), {
			name: fileName
    })
    
    if (!myPicture.moved()) {
			this.uploadError = profilePic.error();
			// return false;
		}

			session.flash({ successMessage: 'You have registered successfully!' })
      return response.redirect('/index')
      
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const user = Product.find(params.id);
    return user;
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, auth, request, response }) {
    
    const rules = {
			product_name: 'required',
			product_status: 'required'
		}

      const validation = await validate(request.all(), rules);
      if (validation.fails()) {
        return "Insert Form data error";
      }

      const unixTime  = Date.now();
      const product_img = request.file('product_img', {
        types: ['image'],
        size: '1mb'
      })

      if (!product_img) {
        this.uploadError = "No file";
        return false;
      }

      const fileName = `${unixTime}_product.${product_img.extname}`;

     
      // const product_img = request.file('product_img');

      const product = await Product.find(params.id)
      const id = await auth.user.id;
      // const fileName = await this._uploadLogo(request);
      product.user_id = id;
      product.product_name = request.input('product_name')
      product.product_price = request.input('product_price')
      product.product_status = request.input('product_status')
      if (fileName) {
        await Drive.delete(`${Helpers.appRoot()}/uploads/post/${product.product_img}`)
        product.product_img = fileName;
      }
      const myPicture = request.file('product_img')

      await myPicture.move(Helpers.appRoot('public/uploads/post'), {
			name: fileName
    })

    await product.save();
    
    if (!myPicture.moved()) {
			this.uploadError = profilePic.error();
			return false;
    }
    
    return "Update SuccessFully!!!";

  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const product = await Product.find(params.id)
    if(!product) {
      return "No Product Found This Id";
    }
    await Drive.delete(`${Helpers.appRoot()}/public/uploads/post/${product.product}`);
    await product.delete();

    return "Product  Delete Successsfully!!!";
  }
}

module.exports = ProductController
