const PaymentDetails = require('./../models/PaymentDetailsModel');
const Subscription = require('./../models/SubscriptionModel');
const User = require('./../models/UserModel');

exports.fetchPaymentDetails = async (req, res) => {

    const pagesize = +req.query.pagesize;
    const currentpage = +req.query.page;
    const PaymentQuery = PaymentDetails.find();
    if (pagesize && currentpage) {
        PaymentQuery
            .skip(pagesize * (currentpage - 1))
            .limit(pagesize)

    }
    const totallength = await PaymentDetails.estimatedDocumentCount({}, (err, count) => {
        if (err) {

        } else {
            return count;
        }
    });
    await PaymentQuery.find().populate("userid", "email username", User).populate('subscriptionid', "subscriptionName subscriptionPrice", Subscription)
        .then((data) => {
            if (data.length<=0) {
                res.status(404).json({
                    message: "No Data Found",

                });
            } else {
                res.status(200).json({
                    "message": "Data received Successfully",
                    data: data,
                    totallength: totallength
                });
            }
        }).catch(
            (err) => {

                res.status(404).json({
                    message: "No Data Found",
                    data: data

                });

            }
        )

}