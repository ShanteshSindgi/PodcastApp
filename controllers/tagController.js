const tags = require("./../models/tagsModel");

exports.addTag = async (req, res) => {
  const tagName = req.body.tagName;
  const tagDescription = req.body.tagDescription;
  if (!tagName || !tagDescription) {
    res.status(404).json({
      message: "Please Enter All tag Fields",
    });
  } else {
    const tagObject = await new tags({
      tagName: req.body.tagName,
      tagDescription: req.body.tagDescription,
    });

    tagObject
      .save()
      .then(
        (data) => {
          res.status(200).json({
            message: "tag Added Successfully",
          });
        },
        (err) => {
          if (err)
            res.status(204).json({
              message: "Duplicate Tag Found",
            });
        }
      )
      .catch((err) => {
        if (err) {
          res.status(204).json({
            message: "Tag not added",
          });
        }
      });
  }
};

exports.fetchtags = (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const tagQuery = tags.find();
  if (pagesize && currentpage) {
    tagQuery.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }
  tagQuery
    .find()
    .then((data) => {
      if (data.length <= 0) {
        res.status(404).json({
          message: "No tags Available",
          data: data,
        });
      } else {
        res.status(200).json({
          message: "tags fetched successfully",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "No Data Found",
        data: data,
      });
    });
};

//Update tag
exports.updateTag = async (req, res) => {
  const tagid = await req.params.tagid;
  const tagName = await req.body.tagName;
  const tagDescription = await req.body.tagDescription;

  if (!tagid || !tagName || !tagDescription) {
    res.status(404).json({
      message: "tag Not Found",
    });
  } else {
    tags.findByIdAndUpdate(
      {
        _id: tagid,
      },
      {
        tagName: tagName,
        tagDescription: tagDescription,
      },
      (err, result) => {
        if (err) {
          res.status(204).json({
            message: "tag Not Updated",
          });
          console.log(err);
        } else {
          res.status(200).json({
            message: "tag Updated Successfully",
          });
        }
      }
    );
  }
};

//Delete tag
exports.deletetTag = (req, res) => {
  const tagid = req.params.tagid;

  if (!tagid) {
    res.status(404).json({
      message: "tag not found",
    });
  } else {
    tags.deleteOne(
      {
        _id: tagid,
      },
      (err, data) => {
        if (err) {
          console.log("er", err);
          res.status(204).json({
            message: "tag deletion failed",
          });
        } else {
          res.status(200).json({
            message: "tag deleted Successfully",
          });
        }
      }
    );
  }
};
