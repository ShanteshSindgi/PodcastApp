const Subscriptions = require("./../models/SubscriptionModel");
const User = require("./../models/UserModel");
const Payment = require("./../models/PaymentDetailsModel");
const checkAuth = require("./../middleware/checkAuth");

exports.addSubscription = async (req, res) => {
  const subscriptionName = req.body.subscriptionName;
  const subscriptionPrice = req.body.subscriptionPrice;
  const subscriptionFeatures = req.body.subscriptionFeatures;
  const subscriptionDuration = req.body.subscriptionDuration;

  if (!subscriptionName || !subscriptionPrice || !subscriptionFeatures || !subscriptionDuration) {
    res.status(404).json({
      message: "Please Enter All Subscription Fields",
    });
  } else {
    const subscriptionObject = await new Subscriptions({
      subscriptionName: req.body.subscriptionName,
      subscriptionPrice: req.body.subscriptionPrice,
      subscriptionFeatures: req.body.subscriptionFeatures,
      subscriptionDuration: req.body.subscriptionDuration,
    });

    subscriptionObject
      .save()
      .then((data) => {
        res.status(200).json({
          message: "Subscription Added Successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(204).json({
          message: "Subscription not Added",
        });
      });
  }
};

exports.fetchSubscriptions = async (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const SubscriptionQuery = Subscriptions.find();
  if (pagesize && currentpage) {
    SubscriptionQuery.skip(pagesize * (currentpage - 1)).limit(pagesize);
  }
  const totallength = await Subscriptions.count({}, function (err, count) {
    console.log("Number of users:", count);
  });

  SubscriptionQuery.find()
    .then((data) => {
      if (data.length <= 0) {
        res.status(404).json({
          message: "No Subscriptions Available",
          data: data,
        });
      } else {
        res.status(200).json({
          message: "Subscriptions fetched successfully",
          data: data,
          totallength: totallength,
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

//Update Subscription
exports.updateSubscription = async (req, res) => {
  console.log("HIII")
  const subscriptionid = await req.params.subscriptionid;
  const subscriptionName = await req.body.subscriptionName;
  const subscriptionPrice = await req.body.subscriptionPrice;
  const subscriptionFeatures = req.body.subscriptionFeatures;
  const subscriptionDuration = req.body.subscriptionDuration;

  if (
    !subscriptionid ||
    !subscriptionName ||
    !subscriptionPrice ||
    !subscriptionFeatures ||
    !subscriptionDuration
  ) {
    res.status(404).json({
      message: "Subscription Not Found",
    });
  } 
  else {
    Subscriptions.findByIdAndUpdate({
        _id: subscriptionid,
      }, {
        subscriptionName: subscriptionName,
        subscriptionPrice: subscriptionPrice,
        subscriptionFeatures: subscriptionFeatures,
        subscriptionDuration: subscriptionDuration,
      },
      (err, result) => {
        if (err) {
          res.status(204).json({
            message: "Subscription Not Updated",
          });
          console.log(err);
        } else {
          res.status(200).json({
            message: "Subscription Updated Successfully",
          });
        }
      }
    );
  }
};

//Delete Subscription
exports.deleteSubscription = (req, res) => {
  const subscriptionid = req.params.subscriptionid;

  if (!subscriptionid) {
    res.status(404).json({
      message: "Subscription not found",
    });
  } else {
    Subscriptions.deleteOne({
        _id: subscriptionid,
      },
      (err, data) => {
        if (err) {
          console.log("er", err);
          res.status(204).json({
            message: "Subscription deletion failed",
          });
        } else {
          res.status(200).json({
            message: "Subscription deleted Successfully",
          });
        }
      }
    );
  }
};

//Buy Subscription
exports.buySubscription = (req, res) => {
  const userid = checkAuth.getUserid();
  const subscriptionid = req.body.subscriptionid;

  console.log("us", userid);

  if (!userid || !subscriptionid) {
    res.status(404).json({
      message: "Required Fields not got",
    });
  } else {
    Subscriptions.findById(subscriptionid).then(
      (resd) => {
        if (resd) {
          User.findOneAndUpdate({
              _id: userid,
            }, {
              $push: {
                subscriptionTaken: {
                  subscriptionid: subscriptionid,
                  subscriptionPurchasedDate: Date.now(),
                },
              },
            },
            (err, result) => {
              if (err) {
                res.status(204).json({
                  message: "Subscription purchase Failed",
                });
                console.log(err);
              } else {
                const paymentObj = new Payment({
                  userid: userid,
                  transactionid: Math.floor(Math.random() * 100) + 100000,
                  subscriptionid: subscriptionid,
                });

                paymentObj
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: "Subscription purchased Successfully",
                    });
                  })
                  .catch(() => {
                    res.status(204).json({
                      message: "Subscription purchase Failed",
                    });
                  });
              }
            }
          );
        }
      },
      (err) => {
        res.status(422).json({
          message: "Invalid SubscriptionID",
        });
      }
    );
  }
};