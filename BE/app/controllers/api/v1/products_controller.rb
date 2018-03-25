module Api::V1
  class ProductsController < ApplicationController
    def index
      @products = Product.all
      render json: @products
    end
    def create
	  @product = Product.create(product_params)
	  render json: @product
	end

	private

	  def product_params
	    params.require(:product).permit(:title, :description, :votes)
	  end
  end
end
