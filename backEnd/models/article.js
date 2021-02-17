//Database for storing memes
const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
  {
    MemeOwner: {
      //Name of the Meme Owner
      type: String,
      required: true,
    },
    MemeCaption: {
      //Caption of the Meme
      type: String,
    },
    MemeUrl: {
      //Url of the Meme
      type: String,
      required: true,
    },
    createdAt: {
      //Time and date when the Meme was created
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

articleSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

articleSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Articles", articleSchema);
