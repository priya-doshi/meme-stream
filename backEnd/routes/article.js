const express = require("express");
const Articles = require("../models/article");
const router = express.Router();

//GET request to get the details of all the memes in database
router.get("/", async (req, res) => {
  try {
    const articles = await Articles.find().sort({ updatedAt: -1 }).limit(100);
    res.send(articles);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

//GET request with id to get the detail of particular meme
router.get("/:id", getArticle, (req, res) => {
  res.json(res.article);
});

//POST request to post a meme
router.post("/", async (req, res) => {
  const article = new Articles({
    MemeOwner: req.body.name,
    MemeCaption: req.body.caption,
    MemeUrl: req.body.url,
  });
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//PATCH  request to update the meme of particular id
router.patch("/:id", getArticle, async (req, res) => {
  if (req.body.MemeOwner != null) {
    res.article.MemeOwner = req.body.MemeOwner;
  }

  if (req.body.MemeCaption != null) {
    res.article.MemeCaption = req.body.MemeCaption;
  }

  if (req.body.MemeUrl != null) {
    res.article.MemeUrl = req.body.MemeUrl;
  }

  try {
    const updatedMeme = await res.article.save();
    res.json(updatedMeme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE request to update the meme of particular id
router.delete("/:id", getArticle, async (req, res) => {
  try {
    await res.article.remove();
    res.json({ message: "Deleted Meme" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getArticle(req, res, next) {
  let article;
  try {
    article = await Articles.findById(req.params.id);
    console.log(article);
    if (article == null) {
      return res.status(404).json({ message: "Cannot find Meme" });
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Cannot find Meme" });
    }
    return res.status(500).json({ message: err.message });
  }

  res.article = article;
  next();
}

module.exports = router;
