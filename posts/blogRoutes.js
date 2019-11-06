const express = require("express");
const Data = require("../data/db");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.query);
  Data.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        sucess: false,
        err: "The posts information could not be retrieved."
      });
    });
});

router.get("/:id", (req, res) => {
  Data.findById(req.params.id)
    .then(p => {
      if (p) {
        res.status(200).json(p);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        err: "The posts information could not be retrieved."
      });
    });
});

router.post("/", (req, res) => {
  Data.insert(req.body)
    .then(p => {
      res.status(201).json(p);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        err: "There was an error while saving the post to the database."
      });
    });
});

router.delete("/:id", (req, res) => {
  Data.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          url: `/posts/${id}`,
          operation: `DELETE for posts with id ${id}`
        });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        err: "The posts information could not be retrieved."
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Data.update(req.params.id, changes)
    .then(p => {
      if (p) {
        res.status(200).json(p);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved"
      });
    });
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Data.findPostComments(req.params.id);

    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The comments information could not be retrieved."
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  const commentInfo = { ...req.body, comment_id: req.params.id };

  try {
    const comment = await Data.insertComment(commentInfo);
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        error: "There was an error while saving the comment to the database"
      });
  }
});

module.exports = router;
