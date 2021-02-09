const { mongoose } = require("mongoose");
const AudioBook = require("./../models/AudioBookModel");
const users = require("./../models/UserModel");
const { ObjectId } = require("mongodb");
exports.addAudiobook = async (req, res) => {
  const audioTitle = req.body.audioTitle;
  const audioDescription = req.body.audioDescription;
  const audioImage = req.body.audioImage;
  const audioTag = req.body.audioTag;
  const UserId = req.body.userID;
  if (!audioTitle || !audioDescription || !audioImage || !audioTag || !UserId) {
    res.status(404).json({
      message: "Please Enter All AudioBooks Fields",
    });
  } else {
    console.log("user", ObjectId(UserId));
    const audioBookObject = await new AudioBook({
      audioTitle: audioTitle.trim(),
      audioDescription: audioDescription.trim(),
      audioImage: audioImage.trim(),
      audioTag: audioTag,
      audiouploadedBy: ObjectId(UserId.trim()),
    });
    audioBookObject
      .save()
      .then((data) => {
        res.status(200).json({
          message: "AudioBook Added Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(204).json({
          message: "AudioBook not Added",
        });
      });
  }
};
exports.AddaudioEpsodes = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const streamUrl = req.body.streamUrl;
  const audioBookId = req.params.audioBookId;
  if (!title || !description || !streamUrl || !audioBookId) {
    res.status(404).json({
      message: "Please Enter All Epsode Fields",
    });
  } else {
    const Data = {
      title: title,
      description: description,
      streamUrl: streamUrl,
    };
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim() },
      { $push: { audioEpsodes: Data } },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "AudioBook not Added",
          });
        } else {
          res.status(200).json({
            message: "Epsode Added Successfully",
          });
        }
      }
    );
  }
};
exports.addCommentAudiobook = async (req, res) => {
  const comment = req.body.comment;
  const userID = req.body.userID;
  const audioBookId = req.params.audioBookId;
  if (!comment || !userID || !audioBookId) {
    res.status(404).json({
      message: "Please Enter All Comment Fields",
    });
  } else {
    const Data = {
      comment: comment,
      userId: userID,
    };
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim() },
      { $push: { audioComments: Data } },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "Comment to AudioBook not Added",
          });
        } else {
          res.status(200).json({
            message: "Comment Added Successfully",
          });
        }
      }
    );
  }
};
exports.addCommentResponseAudiobook = async (req, res) => {
  const comment = req.body.comment;
  const commentId = req.body.commentId;
  const userID = req.body.userID;
  const audioBookId = req.params.audioBookId;
  if (!comment || !userID || !audioBookId) {
    res.status(404).json({
      message: "Please Enter All Comment response Fields",
    });
  } else {
    const Data = {
      comment: comment,
      userId: userID,
    };
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim(), "audioComments._id": commentId.trim() },
      { $push: { "audioComments.$[].response": Data } },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not add comment response",
          });
        } else {
          res.status(200).json({
            message: "comment response Added Successfully",
          });
        }
      }
    );
  }
};
exports.addcommentEpsode = async (req, res) => {
  const comment = await req.body.comment;
  const epsodeId = await req.body.epsodeId;
  const userID = await req.body.userID;
  const audioBookId = await req.params.audioBookId;
  if (!comment || !userID || !audioBookId || !epsodeId) {
    res.status(404).json({
      message: "Please Enter All Comment response Fields",
    });
  } else {
    const Data = {
      comment: comment,
      userId: userID,
    };

    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim(), "audioEpsodes._id": epsodeId },
      {
        $push: {
          "audioEpsodes.$[].epsodeComments": {
            Data,
          },
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not add comment response",
          });
        } else {
          res.status(200).json({
            message: "comment response Added Successfully",
          });
        }
      }
    );
  }
};
exports.addCommentResponseEpsode = async (req, res) => {
  const comment = req.body.comment;
  const epsodeId = req.body.epsodeId;
  const commentId = req.body.commentId;
  const userID = req.body.userID;
  const audioBookId = req.params.audioBookId;
  if (!comment || !userID || !audioBookId || !epsodeId || !commentId) {
    res.status(404).json({
      message: "Please Enter All Comment response Fields",
    });
  } else {
    const Data = {
      comment: comment.trim(),
      userId: userID.trim(),
    };
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId.trim(),
        "audioEpsodes.epsodeComments._id": commentId.trim(),
      },
      {
        $push: {
          "audioEpsodes.$[].epsodeComments.$[].response": {
            Data,
          },
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not add comment response",
          });
        } else {
          res.status(200).json({
            message: "comment response Added Successfully",
          });
        }
      }
    );
  }
};
exports.subscribeAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  if (!audioBookId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId },
      {
        $inc: { audioTotalSubscriptions: 1 },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not increment subscription count",
          });
        } else {
          res.status(200).json({
            message: "subscribed",
          });
        }
      }
    );
  }
};
exports.unsubscribeAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  if (!audioBookId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId },
      {
        $inc: { audioTotalSubscriptions: -1 },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not decrement subscription count",
          });
        } else {
          res.status(200).json({
            message: "unsubscribed",
          });
        }
      }
    );
  }
};
exports.viewAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  if (!audioBookId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId },
      {
        $inc: { audioTotalViews: 1 },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not increment view count",
          });
        } else {
          res.status(200).json({
            message: "View Added",
          });
        }
      }
    );
  }
};
exports.likesAudioBookComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioBookId || !commentId || !userId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim(), "audioComments._id": commentId.trim() },
      {
        $push: { "audioComments.$[].likes": userId.trim() },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not like comment",
          });
        } else {
          res.status(200).json({
            message: "comment Liked",
          });
        }
      }
    );
  }
};
exports.unlikesAudioBookComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioBookId || !commentId || !userId) {
    res.status(404).json({
      message: "Please pass all data ",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim(), "audioComments._id": commentId.trim() },
      {
        $pull: { "audioComments.$[].likes": { $in: [userId.trim()] } },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not unlike comment",
          });
        } else {
          res.status(200).json({
            message: "comment unLiked",
          });
        }
      }
    );
  }
};

exports.likesAudioBookResponseComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioBookId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioComments._id": parentcommentId.trim(),
        "audioComments.response._id": childCommentId,
      },
      {
        $push: { "audioComments.$[].response.$[].likes": userId.trim() },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not like comment",
          });
        } else {
          res.status(200).json({
            message: "comment Liked",
          });
        }
      }
    );
  }
};
exports.unlikesAudioBookResponseComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioBookId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioComments._id": parentcommentId.trim(),
        "audioComments.response._id": childCommentId,
      },
      {
        $pull: {
          "audioComments.$[].response.$[].likes": { $in: [userId.trim()] },
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not unlike comment",
          });
        } else {
          res.status(200).json({
            message: "comment unLiked",
          });
        }
      }
    );
  }
};

exports.likesEpsodeComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioBookId || !commentId || !userId || !epsodeId) {
    res.status(404).json({
      message: "Please pass all fileds Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId.trim(),
        "audioEpsodes.epsodeComments._id": commentId.trim(),
      },
      {
        $push: { "audioEpsodes.$[].epsodeComments.$[].likes": userId.trim() },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not like comment",
          });
        } else {
          res.status(200).json({
            message: "comment Liked",
          });
        }
      }
    );
  }
};
exports.unlikesEpsodeComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioBookId || !commentId || !userId || !epsodeId) {
    res.status(404).json({
      message: "Please pass all fileds Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId.trim(),
        "audioEpsodes.epsodeComments._id": commentId.trim(),
      },
      {
        $pull: {
          "audioEpsodes.$[].epsodeComments.$[].likes": { $in: [userId.trim()] },
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not unlike comment",
          });
        } else {
          res.status(200).json({
            message: "comment unLiked",
          });
        }
      }
    );
  }
};

exports.likesEpsodeResponseComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (
    !audioBookId ||
    !parentcommentId ||
    !userId ||
    !childCommentId ||
    !epsodeId
  ) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId.trim(),
        "audioEpsodes.epsodeComments._id": parentcommentId.trim(),
        "audioEpsodes.epsodeComments.response._id": childCommentId.trim(),
      },
      {
        $push: {
          "audioEpsodes.$[].epsodeComments.$[].response.$[].likes": userId.trim(),
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not like comment",
          });
        } else {
          res.status(200).json({
            message: "comment Liked",
          });
        }
      }
    );
  }
};
exports.unlikesEpsodeResponseComment = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioBookId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId.trim(),
        "audioEpsodes.epsodeComments._id": parentcommentId.trim(),
        "audioEpsodes.epsodeComments.response._id": childCommentId.trim(),
      },
      {
        $pull: {
          "audioEpsodes.$[].epsodeComments.$[].response.$[].likes": {
            $in: [userId.trim()],
          },
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "can not unlike comment",
          });
        } else {
          res.status(200).json({
            message: "comment unLiked",
          });
        }
      }
    );
  }
};

//Admin Panel Routes
exports.listofAudioBooks = async (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;

  const Count = await AudioBook.estimatedDocumentCount({}, (Err, count) => {
    if (Err) {
      console.log(Err);
    }
    return count;
  });
  const AudioBookQuery = AudioBook.find();

  if (pagesize && currentpage) {
    AudioBookQuery.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }
  AudioBookQuery.find()
    .populate("audiouploadedBy", "username email", users)
    .then((data) => {
      if (data.length <= 0) {
        res.status(404).json({
          message: "No AudioBook Available",
          data: data,
        });
      } else {
        res.status(200).json({
          message: "AudioBook fetched successfully",
          data: data,
          totallength: Count,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "error while fetching data",
        data: err,
      });
    });
};

exports.verifiyAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  console.log("verify" + req.body.verify);
  const verify = !req.body.verify;
  AudioBook.findOneAndUpdate(
    {
      _id: audioBookId.trim(),
    },
    { $set: { audioverify: !verify } },
    (err, success) => {
      if (err) {
        console.log("AudioBook", err);
        res.status(204).json({
          message: "Can Not " + verify ? "verify" : "unverify" + " AudioBook",
        });
      } else {
        res.status(200).json({
          message: verify ? "AudioBook Verified" : "AudioBook Not Verified",
        });
      }
    }
  );
};
exports.BlockunBlockAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const block = !req.body.block;
  AudioBook.findOneAndUpdate(
    {
      _id: audioBookId.trim(),
    },
    { $set: { audioblock: block } },
    (err, success) => {
      if (err) {
        console.log("AudioBook", err);
        res.status(204).json({
          message: "can not " + block ? "blocked" : "unblocked" + " AudioBook",
        });
      } else {
        res.status(200).json({
          message: "AudioBook " + block ? "blocked" : "unblocked",
        });
      }
    }
  );
};

exports.deleteAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  if (!audioBookId) {
    res.status(404).json({
      message: "AudioBook not found",
    });
  } else {
    AudioBook.findOneAndDelete({ _id: audioBookId.trim() }, (err, data) => {
      if (err) {
        console.log("er", err);
        res.status(204).json({
          message: "AudioBook deletion failed",
        });
      } else {
        res.status(200).json({
          message: "AudioBook deleted Successfully",
        });
      }
    });
  }
};
exports.deleteEpsode = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  if (!audioBookId || !epsodeId) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim(), "audioEpsodes._id": epsodeId.trim() },
      {
        $pull: {
          "audioEpsodes.$[]._id": { $in: [epsodeId.trim()] },
        },
      },
      (err, data) => {
        if (err) {
          console.log("er", err);
          res.status(204).json({
            message: "Epsode deletion failed",
          });
        } else {
          res.status(200).json({
            message: "Epsode deleted Successfully",
          });
        }
      }
    );
  }
};

exports.editAudioBook = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const audioTag = req.body.audioTag;
  const audioTitle = req.body.audioTitle;
  const audioDescription = req.body.audioDescription;
  const audioImage = req.body.audioImage;
  if (
    !audioBookId ||
    !audioTag ||
    !audioTitle ||
    !audioDescription ||
    !audioImage
  ) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
      },
      {
        $set: {
          audioTag: audioTag,
          audioTitle: audioTitle,
          audioDescription: audioDescription,
          audioImage: audioImage,
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "AudioBook not updated comment",
          });
        } else {
          res.status(200).json({
            message: "AudioBook Updated",
          });
        }
      }
    );
  }
};
exports.editEpsode = async (req, res) => {
  const audioBookId = req.params.audioBookId;
  const epsodeId = req.body.epsodeId;
  const title = req.body.title;
  const description = req.body.description;
  const streamUrl = req.body.streamUrl;
  const epsodeImage = req.body.epsodeImage;
  if (
    !audioBookId ||
    !epsodeId ||
    !title ||
    !description ||
    !streamUrl ||
    !epsodeImage
  ) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpsodes._id": epsodeId,
      },
      {
        $set: {
          title: title,
          audioTitle: audioTitle,
          description: description,
          streamUrl: streamUrl,
          epsodeImage: epsodeImage,
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "Epsode not updated",
          });
        } else {
          res.status(200).json({
            message: "epsode Updated",
          });
        }
      }
    );
  }
};

exports.adduserlikes = (req, res) => {
  const audioBookId = req.params.audioBookId;
  const userId = req.body.userID;
  console.log(req.body);
  if (!audioBookId || !userId) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioBookId.trim() },
      { $inc: { likes: 1 } },
      (err, success) => {
        if (err) {
          res.status(204).json({
            message: "Error while liking",
          });
        } else {
          users.findOneAndUpdate(
            { _id: userId },
            { $push: { userLikes: audioBookId } },
            (err, success) => {
              if (err) {
                res.status(204).json({
                  message: "Error while liking",
                });
              } else {
                res.status(200).json({ message: "user Like success" });
              }
            }
          );
        }
      }
    );
  }
};
