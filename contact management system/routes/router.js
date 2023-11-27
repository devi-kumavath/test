const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

//image uploading
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

//render user form
router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add Users" });
});

// add user
router.post("/add", upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    await user.save();

    req.session.message = {
      type: "success",
      message: "User added successfully",
    };

    res.redirect("/");
  } catch (err) {
    res.json({
      message: err.message,
      type: "danger",
    });
  }
});

//get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().exec();

    res.render("index", {
      title: "The Techie Girl",
      users: users,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
});

// render edit  user
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findById(id);

    if (user == null) {
      res.redirect("/");
    } else {
      res.render("edit_users", {
        title: "edit user",
        user: user,
      });
    }
  } catch (err) {
    res.redirect("/");
  }
});

//update user
router.post("/update/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        const filePath = path.join(
          __dirname,
          "..",
          "uploads",
          req.body.old_image
        );
        fs.unlinkSync(filePath);
        console.log("File deleted successfully!");
      } catch (error) {
        console.log(error);
      }
    } else {
      new_image = req.body.old_image;
    }

    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    });

    req.session.message = {
      type: "success",
      message: "Updated successfully",
    };

    res.redirect("/");
  } catch (error) {
    res.json({
      message: error.message,
      type: "danger",
    });
  }
});

//delete user

router.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);

    if (user.image !== "") {
      const imagePath = path.join(__dirname, "..", "uploads", user.image);
      fs.unlinkSync(imagePath);
      console.log("User image deleted successfully!");
    }

    req.session.message = {
      type: "info",
      message: "User deleted successfully",
    };
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});

module.exports = router;
