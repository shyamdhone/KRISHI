const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.get("/", async (req, res) => {

  const articles = await Article.find().sort({ createdAt: -1 });

  res.render("articles/index", { articles });

});

router.get("/:id", async (req, res) => {

  const article = await Article.findById(req.params.id);

  res.render("articles/show", { article });

});

module.exports = router;