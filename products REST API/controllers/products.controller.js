const productModel = require("../models/productsModel");
const { isValidObjectId } = require("mongoose");

const itemsPerPage = 10;

const errorHandler = (res, statusCode, errorMessage) => {
  return res.status(statusCode).json({ error: errorMessage });
};

// Controller for retrieving a paginated list of all products.
const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  try {
    const skip = (page - 1) * itemsPerPage;
    const productsData = await productModel.find().skip(skip).limit(itemsPerPage).exec();

    res.status(200).json({
      data: productsData,
      page,
    });
  } catch (error) {
    errorHandler(res, 500, "An error occurred while fetching products.");
  }
};

// Controller for retrieving a product by its ID, with error handling for invalid IDs.
const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return errorHandler(res, 400, "Invalid product ID.");
  }

  try {
    const productData = await productModel.findOne({ _id: id }).exec();

    if (!productData) {
      return errorHandler(res, 404, "Product not found.");
    }

    res.status(200).json({
      data: productData,
    });
  } catch (error) {
    errorHandler(res, 500, "An error occurred while fetching the product.");
  }
};

// Controller for filtering products based on company, name, and featured status.
const filterProducts = async (req, res) => {
  try {
    const { company, name, featured } = req.query;
    const queryObject = {};

    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (featured) {
      queryObject.featured = featured;
    }

    const myData = await productModel.find(queryObject).exec();

    res.status(200).json({
      data: myData,
    });
  } catch (error) {
    errorHandler(res, 500, "An error occurred while fetching the product.");
  }
};

// Controller for sorting and filtering products based on name and sort criteria.
const sortProducts = async (req, res) => {
  try {
    const { name, sort } = req.query;
    const queryObject = {};

    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }

    let apiData = productModel.find(queryObject);

    if (sort) {
      const sortFix = sort.replace(",", " ");
      const sortQuery = sortFix.split(" ").reduce((acc, val) => {
        const order = val.startsWith("-") ? -1 : 1;
        const field = val.replace(/^-/, "");
        acc[field] = order;
        return acc;
      }, {});

      apiData = apiData.sort(sortQuery);
    }

    const myData = await apiData.exec();

    res.status(200).json({
      data: myData,
    });
  } catch (error) {
    errorHandler(res, 500, "An error occurred while fetching the product.");
  }
};

module.exports = { getAllProducts, getProductById, filterProducts, sortProducts };
