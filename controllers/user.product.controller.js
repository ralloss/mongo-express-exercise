const User = require('../models/user.model');

exports.findAll = function (req, res) {
  console.log("Find all users");

  User.find({},{username: 1, products: 1}, (err, results) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: results });
		}
	});
};

exports.findOne = function (req, res) {
  
  const username = req.params.username;

  console.log("Find user with username", username);

  User.findOne({ username: username },{username: 1, products: 1}, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
	});
};

exports.create = function (req, res) {
  
  const username = req.body.username;
  const products = req.body.products;

  console.log("insert products to username:", username);

  User.updateOne(
    { username: username },
    {
      $push: {
        products:products,
      }
    },
    (err, result) => {
      if (err) {
        res.json({ status: false, data: err });
      } else {
        res.json({ status: true, data: result });
      }
    }
  );
};

exports.update = function (req, res) {

  const username = req.body.username;
  const product_id = req.body.product._id;
  const product_quantity = req.body.product.quantity;

  console.log("Update product for username:", username);

  User.updateOne(
    { username: username, "products._id": product_id  }, 
    {
      $set: {
        "products.$.quantity": product_quantity
      }
    },
    (err, result) => {
      if (err) {
        res.json({ status: false, data: err });
      } else {
        res.json({ status: true, data: result });
      }
	});
};

exports.delete = function (req, res) {

  const username = req.params.username;
  const product_id = req.params.id;

  console.log("Delete product for username", username);

  User.updateOne(
    { username: username }, 
    {
      $pull: {
        products: { _id: product_id } }
    },
    (err, result) => {
      if (err) {
        res.json({ status: false, data: err });
      } else {
        res.json({ status: true, data: result });
      }
	});
};

exports.stats1 = function (req, res) {

  console.log("For all users sum by product and count");

  User.aggregate([
    {
      $unwind: "$products" 
    },
    {
      $project: {
        id: 1,
        username:1,
        products:1
      }
    },
    {
        $group: {
        _id: { 
          username: "$username", 
          product: "$products.product" },
        totalAmount: { 
          $sum: { 
            $multiply: [ "$products.cost", "$products.quantity" ] 
          } 
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort:{ "_id.username" : 1, "_id.product" : 1 }
    },
  ],
  (err, result) => {
    if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
  });
};

exports.stats2 = function (req, res) {

  const username = req.params.username;
 
  console.log("For user sum by product and count", username);

  User.aggregate([
    {
      $match:  { 
        username: username  
      } 
    },
    {
      $unwind: "$products" 
    },
    {
      $project: {
        id: 1,
        username:1,
        products:1
      }
    },
    {
        $group: {
        _id: { 
          username: "$username", 
          product: "$products.product" },
        totalAmount: { 
          $sum: { 
            $multiply: [ "$products.cost", "$products.quantity" ] 
          } 
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort:{ "_id.username" : 1, "_id.product" : 1 }
    },
  ],
  (err, result) => {
    if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
  });
};