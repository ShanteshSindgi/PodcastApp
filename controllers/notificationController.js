const Notifications = require('./../models/NotificationModel');


exports.addNotification = async (req, res) => {

    const notificationName = req.body.notificationName;
    const notificationDescription = req.body.notificationDescription;
    if (!notificationName || !notificationDescription) {
        res.status(404).json({
            "message": "Please Enter All Notification Fields"
        })
    } else {

        const notificationObject = await new Notifications({
                notificationName: req.body.notificationName,
                notificationDescription: req.body.notificationDescription
            }

        );

        notificationObject.save().then(
            (data) => {
                res.status(200).json({
                    "message": "Notification Added Successfully"
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(204).json({
                    "message": "Notification not Added"
                })
            }
        )
    }

}


exports.fetchNotifications = (req, res) => {

    const pagesize = +req.query.pagesize;
    const currentpage = +req.query.page;
    const NotificationQuery = Notifications.find();
    if (pagesize && currentpage) {
        NotificationQuery
            .skip(pagesize * (currentpage - 1))
            .limit(pagesize)

    }
    NotificationQuery.find().then(
        (data) => {
            if (data.length <= 0) {
                res.status(404).json({
                    message: "No Notifications Available",
                    data:data
                    
                });

            }
            else{
            res.status(200).json({
                message: "Notifications fetched successfully",
                data: data
            });
        }
        }
    ).catch(
        (err) => {

            res.status(404).json({
                message: "No Data Found",
                data:data
                
            });

        }
    )

}


//Update Notification
exports.updateNotification = async (req, res) => {

    const notificationid = await req.params.notificationid;
    const notificationName = await req.body.notificationName;
    const notificationDescription = await req.body.notificationDescription;

    if (!notificationid || !notificationName || !notificationDescription) {
        res.status(404).json({
            message: "Notification Not Found",
        })
    } else {

        Notifications.findByIdAndUpdate({
            _id: notificationid
        }, {
            notificationName: notificationName,
            notificationDescription: notificationDescription
        }, (err, result) => {
            if (err) {
                res.status(204).json({
                    "message": "Notification Not Updated"
                })
                console.log(err);
            } else {
                res.status(200).json({
                    "message": "Notification Updated Successfully"
                })
            }
        })
    }

}

//Delete Notification
exports.deleteNotification = (req, res) => {
    const notificationid = req.params.notificationid;

    if (!notificationid) {
        res.status(404).json({
            "message": "Notification not found"
        });
    } else {
        Notifications.deleteOne({
            _id: notificationid
        }, (err, data) => {

            if (err) {
                console.log("er", err)
                res.status(204).json({
                    "message": "Notification deletion failed"
                })
            } else {
                res.status(200).json({
                    "message": "Notification deleted Successfully"
                })
            }

        })

    }
}