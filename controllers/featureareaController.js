const featureArea = require("../models/featureAreaModel");
const audioBook = require("../models/AudioBookModel");
exports.AddnewFeatureArea = async (req, res) => {
  const featureName = req.body.featureName;
  const featurePosition = req.body.featurePosition;
  const featureAudios = req.body.featureAudios;
  if (!featureName || !featurePosition !== true) {
    console.log(!featurePosition);
    res.status(404).json({
      message: "Invalid Params",
    });
  } else {
    const featureAreaObject = await new featureArea({
      featureName: featureName.trim(),
      featurePosition: featurePosition,
      featureAudios: featureAudios,
    });
    featureAreaObject
      .save()
      .then((data) => {
        res.status(200).json({
          message: "Feature Created",
        });
      })
      .catch((Err) => {
        res.status(203).json({
          message: "error while creating feature area ",
        });
      });
  }
};
exports.fetchAllFeatureArea = async (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;

  const TotalLenght = await featureArea.estimatedDocumentCount(
    {},
    (err, count) => {
      if (err) {
        res.status(203).json({
          message: "error while fetching Data",
        });
      } else {
        return count;
      }
    }
  );
  if (pagesize && currentpage) {
    featureArea.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }
  featureArea
    .find()
    .populate("featureAudios", audioBook)
    .then((data) => {
      res.status(200).json({
        message: "All Feature Area",
        data: data,
        totallength: TotalLenght,
      });
    })
    .catch((err) => {
      res.status(203).json({
        message: "error while fetching Data",
      });
    });
};
exports.fetchAllFeatureAreaWithoutMedia = async (req, res) => {
  const TotalLenght = await featureArea.estimatedDocumentCount(
    {},
    (err, count) => {
      if (err) {
        res.status(203).json({
          message: "error while fetching Data",
        });
      } else {
        return count;
      }
    }
  );

  featureArea
    .find({}, { featureAudios: 0 })
    .then((data) => {
      res.status(200).json({
        message: "All Feature Area",
        Data: data,
        totallength: TotalLenght,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(203).json({
        message: "error while fetching Data",
      });
    });
};
exports.addNewMedia = async (req, res) => {
  const featureId = req.params.featureId;
  const media = req.body.media;
  console.log(featureId,media);

  if (!featureId) {
    if (media instanceof String) {
      res.status(404).json({
        message: "Media Must be an Array",
      });
    } else {
      res.status(404).json({
        message: "Invalid Params",
      });
    }
  } else {
    featureArea.findOneAndUpdate(
      { _id: featureId },
      {
        $push: { featureAudios:{ $each : media} },
      },
      (err, success) => {
        if (err) {
          console.log(err);
          res.status(203).json({
            message: "error While Adding Data ",
          });
        } else {
          res.status(200).json({
            message: "Media Added",
          });
        }
      }
    );
  }
};

exports.removeMedia = async (req, res) => {
  const featureId = req.params.featureId;
  const mediaId = req.body.mediaId;
  if (!featureId || !mediaId) {
    res.status(404).json({
      message: "Invalid Params",
    });
  } else {
    featureArea.findOneAndUpdate(
      { _id: featureId },
      {
        $pull: { "featureAudios.$[]._id": { $in: [mediaId.trim()] } },
      },
      (err, success) => {
        if (err) {
          res.status(203).json({
            message: "error While removing Data ",
          });
        } else {
          res.status(200).json({
            message: "Media Removed",
          });
        }
      }
    );
  }
};
exports.deleteFeatureArea = async (req, res) => {
  const featureId = req.params.featureId;
  if (!featureId) {
    res.status(404).json({
      message: "Invalid Params",
    });
  } else {
    featureArea.findOneAndDelete({ _id: featureId.trim() }, (err, data) => {
      if (err) {
        console.log("er", err);
        res.status(204).json({
          message: "feature area deletion failed",
        });
      } else {
        res.status(200).json({
          message: "feature area deleted Successfully",
        });
      }
    });
  }
};
