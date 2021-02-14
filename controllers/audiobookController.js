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

//podcast
exports.addpodcast = async (req, res) => {
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
    const audioBookObject = await new AudioBook({
      audioTitle: audioTitle.trim(),
      audioDescription: audioDescription.trim(),
      audioImage: audioImage.trim(),
      audioTag: audioTag,
      audiouploadedBy: ObjectId(UserId.trim()),
      ispodcast: true,
    });
    audioBookObject
      .save()
      .then((data) => {
        res.status(200).json({
          message: "Podcast Added Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(204).json({
          message: "Podcast not Added",
        });
      });
  }
};

exports.AddaudioEpisode = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const streamUrl = req.body.streamUrl;
  const episodeImage = req.body.episodeImage;
  const audioId = req.params.audioId;
  if (!title || !description || !streamUrl || !audioId || !episodeImage) {
    res.status(404).json({
      message: "Please Enter All Epsode Fields",
    });
  } else {
    const Data = {
      title: title,
      description: description,
      streamUrl: streamUrl,
      episodeImage: episodeImage,
    };
    AudioBook.findOneAndUpdate(
      { _id: audioId.trim() },
      { $push: { audioEpisode: Data } },
      (err, success) => {
        if (err) {
          console.log("Audio", err);
          res.status(204).json({
            message: "Episode not Added",
          });
        } else {
          res.status(200).json({
            message: "Episode Added Successfully",
          });
        }
      }
    );
  }
};
exports.addCommentAudio = async (req, res) => {
  const comment = req.body.comment;
  const userID = req.body.userID;
  const audioId = req.params.audioId;
  if (!comment || !userID || !audioId) {
    res.status(404).json({
      message: "Please Enter All Comment Fields",
    });
  } else {
    const Data = {
      comment: comment,
      userId: userID,
    };
    AudioBook.findOneAndUpdate(
      { _id: audioId.trim() },
      { $push: { audioComments: Data } },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "Comment to Audio not Added",
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
exports.addCommentResponseAudio = async (req, res) => {
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
exports.addcommentEpisode = async (req, res) => {
  const comment = await req.body.comment;
  const episodeId = await req.body.epsodeId;
  const userID = await req.body.userID;
  const audioId = await req.params.audioId;
  if (!comment || !userID || !audioId || !episodeId) {
    res.status(404).json({
      message: "Please Enter All Comment response Fields",
    });
  } else {
    const Data = {
      comment: comment,
      userId: userID,
    };

    AudioBook.findOneAndUpdate(
      { _id: audioId.trim(), "audioEpisode._id": episodeId },
      {
        $push: {
          "audioEpisode.$[].episodeComments": {
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
exports.addCommentResponseEpisode = async (req, res) => {
  const comment = req.body.comment;
  const episodeId = req.body.episodeId;
  const commentId = req.body.commentId;
  const userID = req.body.userID;
  const audioId = req.params.audioId;
  if (!comment || !userID || !audioId || !episodeId || !commentId) {
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
        _id: audioId.trim(),
        "audioEpisode._id": episodeId.trim(),
        "audioEpisode.episodeComments._id": commentId.trim(),
      },
      {
        $push: {
          "audioEpisode.$[].episodeComments.$[].response": {
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
exports.subscribeAudio = async (req, res) => {
  const audioId = req.params.audioId;
  if (!audioId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId },
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
exports.unsubscribeAudio = async (req, res) => {
  const audioId = req.params.audioId;
  if (!audioId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId },
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

exports.viewAudio = async (req, res) => {
  const audioId = req.params.audioId;
  if (!audioId) {
    res.status(404).json({
      message: "Please pass AudioBook Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId },
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
exports.likesAudioComment = async (req, res) => {
  const audioId = req.params.audioId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioId || !commentId || !userId) {
    res.status(404).json({
      message: "Please pass Audio Id",
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
exports.unlikesAudioComment = async (req, res) => {
  const audioId = req.params.audioId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioId || !commentId || !userId) {
    res.status(404).json({
      message: "Please pass all data ",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId.trim(), "audioComments._id": commentId.trim() },
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

exports.likesAudioResponseComment = async (req, res) => {
  const audioId = req.params.audioId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioId.trim(),
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
exports.unlikesAudioResponseComment = async (req, res) => {
  const audioId = req.params.audioId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioId.trim(),
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

exports.likesEpisodeComment = async (req, res) => {
  const audioId = req.params.audioId;
  const episodeId = req.body.episodeId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioId || !commentId || !userId || !episodeId) {
    res.status(404).json({
      message: "Please pass all fileds Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioId.trim(),
        "audioEpisode._id": epsodeId.trim(),
        "audioEpisode.episodeComments._id": commentId.trim(),
      },
      {
        $push: { "audioEpisode.$[].episodeComments.$[].likes": userId.trim() },
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

exports.unlikesEpisodeComment = async (req, res) => {
  const audioId = req.params.audioId;
  const episodeId = req.body.episodeId;
  const commentId = req.body.commentId;
  const userId = req.body.userID;
  if (!audioId || !commentId || !userId || !episodeId) {
    res.status(404).json({
      message: "Please pass all fileds Id",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpisode._id": epsodeId.trim(),
        "audioEpisode.episodeComments._id": commentId.trim(),
      },
      {
        $pull: {
          "audioEpisode.$[].episodeComments.$[].likes": {
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

exports.likesEpisodeResponseComment = async (req, res) => {
  const audioId = req.params.audioId;
  const episodeId = req.body.episodeId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (
    !audioId ||
    !parentcommentId ||
    !userId ||
    !childCommentId ||
    !episodeId
  ) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioBookId.trim(),
        "audioEpisode._id": epsodeId.trim(),
        "audioEpisode.episodeComments._id": parentcommentId.trim(),
        "audioEpisode.episodeComments.response._id": childCommentId.trim(),
      },
      {
        $push: {
          "audioEpisode.$[].episodeComments.$[].response.$[].likes": userId.trim(),
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
exports.unlikesEpisodeResponseComment = async (req, res) => {
  const audioBookId = req.params.audioId;
  const episodeId = req.body.episodeId;
  const userId = req.body.userID;
  const parentcommentId = req.body.parentcommentId;
  const childCommentId = req.body.childCommentId;
  if (!audioId || !parentcommentId || !userId || !childCommentId) {
    res.status(404).json({
      message: "Please pass All Field",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioId.trim(),
        "audioEpisode._id": episodeId.trim(),
        "audioEpisode.episodeComments._id": parentcommentId.trim(),
        "audioEpisode.episodeComments.response._id": childCommentId.trim(),
      },
      {
        $pull: {
          "audioEpisode.$[].episodeComments.$[].response.$[].likes": {
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

  const Count = await AudioBook.estimatedDocumentCount(
    { ispodcast: false },
    (Err, count) => {
      if (Err) {
        console.log(Err);
      }
      return count;
    }
  );
  const AudioBookQuery = AudioBook.find({ ispodcast: false });

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

exports.listofpodcast = async (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;

  const Count = await AudioBook.estimatedDocumentCount(
    { ispodcast: true },
    (Err, count) => {
      if (Err) {
        console.log(Err);
      }
      return count;
    }
  );
  const AudioBookQuery = AudioBook.find({ ispodcast: true });

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
  const audioId = req.params.audioId;
  const verify = !req.body.verify;
  AudioBook.findOneAndUpdate(
    {
      _id: audioId.trim(),
    },
    { $set: { audioverify: verify } },
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
exports.BlockunBlockAudio = async (req, res) => {
  const audioId = req.params.audioId;
  const block = !req.body.block;
  AudioBook.findOneAndUpdate(
    {
      _id: audioId.trim(),
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

exports.deleteAudio = async (req, res) => {
  const audioId = req.params.audioId;
  if (!audioId) {
    res.status(404).json({
      message: "AudioBook not found",
    });
  } else {
    AudioBook.findOneAndDelete({ _id: audioId.trim() }, (err, data) => {
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
exports.deleteEpisode = async (req, res) => {
  const audioId = req.params.audioBookId;
  const episodeId = req.body.episodeId;
  if (!audioId || !episodeId) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId.trim(), "audioEpsodes._id": episodeId.trim() },
      {
        $pull: {
          "audioEpisodes.$[]._id": { $in: [episodeId.trim()] },
        },
      },
      (err, data) => {
        if (err) {
          console.log("er", err);
          res.status(204).json({
            message: "Episode deletion failed",
          });
        } else {
          res.status(200).json({
            message: "Episode deleted Successfully",
          });
        }
      }
    );
  }
};

exports.editAudio = async (req, res) => {
  const audioId = req.params.audioId;
  const audioTag = req.body.audioTag;
  const audioTitle = req.body.audioTitle;
  const audioDescription = req.body.audioDescription;
  const audioImage = req.body.audioImage;
  if (
    !audioId ||
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
        _id: audioId.trim(),
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
exports.editEpisode = async (req, res) => {
  const audioId = req.params.audioId;
  const episodeId = req.body.episodeId;
  const title = req.body.title;
  const description = req.body.description;
  const streamUrl = req.body.streamUrl;
  const episodeImage = req.body.episodeImage;
  if (
    !audioId ||
    !episodeId ||
    !title ||
    !description ||
    !streamUrl ||
    !episodeImage
  ) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      {
        _id: audioId.trim(),
        "audioEpisode._id": episodeId,
      },
      {
        $set: {
          title: title,
          audioTitle: audioTitle,
          description: description,
          streamUrl: streamUrl,
          episodeImage: episodeImage,
        },
      },
      (err, success) => {
        if (err) {
          console.log("AudioBook", err);
          res.status(204).json({
            message: "Episode not updated",
          });
        } else {
          res.status(200).json({
            message: "episode Updated",
          });
        }
      }
    );
  }
};

exports.adduserlikes = (req, res) => {
  const audioId = req.params.audioId;
  const userId = req.body.userID;

  if (!audioId || !userId) {
    res.status(404).json({
      message: "invalid params",
    });
  } else {
    AudioBook.findOneAndUpdate(
      { _id: audioId.trim() },
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
