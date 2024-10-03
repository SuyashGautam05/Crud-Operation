const Customer = require("../models/Customer.");
const mongoose = require("mongoose");

/**
Get /
Homepage
*/

exports.homepage = async (req, res) => {
  const messages = await req.flash("info");
  const locals = {
    title: "NodeJs",
    description: "NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.homepage = async (req, res) => {
//   const messages = await req.flash("info");
//   const locals = {
//     title: "NodeJs",
//     description: "NodeJs User Management System",
//   };

//   try {
// 	const customers = await Customer.find({}).limit(22);
// 	res.render("index", { locals, messages, customers });
//   } catch (error) {
// 	console.log(error)
//   }

// };


/**
Get /
About
*/
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
Get /
New Customer Form
*/

exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "NodeJs User Management System",
  };
  res.render("customer/add", locals);
};

/**
post /
Create New Customer Form
*/

exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  // const locals = {
  //     title: 'New Customer Added!',
  //     description: 'NodeJs User Management System'
  // }

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
Get /
Customer Data
*/
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "View Customer Data",
      description: "NodeJs User Management System",
    };
    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
Get /
edit Customer Data
*/
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "edit Customer Data",
      description: "NodeJs User Management System",
    };
    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
Get /
Update Customer Data
*/
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
Delete /
delete Customer Data
*/
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
Get /
Search Customer Data
*/
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "NodeJs User Management System",
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
