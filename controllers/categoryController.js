const Categorys = require('./../models/CategoryModel');


exports.addCategory = async (req, res) => {

    const categoryName = req.body.categoryName;
    const categoryTags = req.body.categoryTags;
    console.log("cate",categoryTags);
    if (!categoryName || !categoryTags) {
        res.status(404).json({
            "message": "Please Enter All Category Fields"
        })
    } else {

        const categoryObject = await new Categorys({
                categoryName: req.body.categoryName,
                categoryTags: req.body.categoryTags
            }

        );

        categoryObject.save().then(
            (data) => {
                res.status(200).json({
                    "message": "Category Added Successfully"
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                res.status(204).json({
                    "message": "Category not Added"
                })
            }
        )
    }

}


exports.fetchCategorys = async (req, res) => {

    const pagesize = +req.query.pagesize;
    const currentpage = +req.query.page;
    const CategoryQuery = Categorys.find();
    if (pagesize && currentpage) {
        CategoryQuery
            .skip(pagesize * (currentpage - 1))
            .limit(pagesize)

    }
    const totallength=await  Categorys.count({}, function( err, count){
        console.log( "Number of users:", count );
    });

    CategoryQuery.find().then(
        (data) => {
            if (data.length <= 0) {
                res.status(404).json({
                    message: "No Categorys Available",
                    data: data,

                });

            } else {
                res.status(200).json({
                    message: "Categorys fetched successfully",
                    data: data,
                    totallength:totallength

                });
            }
        }
    ).catch(
        (err) => {

            res.status(404).json({
                message: "No Data Found",
                data: data

            });

        }
    )

}


//Update Category
exports.updateCategory = async (req, res) => {

    const categoryid = await req.params.categoryid;
    const categoryName = await req.body.categoryName;
    const categoryTags = await req.body.categoryTags;

    if (!categoryid || !categoryName || !categoryTags) {
        res.status(404).json({
            message: "Category Not Found",
        })
    } else {

        Categorys.findByIdAndUpdate({
            _id: categoryid
        }, {
            categoryName: categoryName,
            categoryTags: categoryTags
        }, (err, result) => {
            if (err) {
                res.status(204).json({
                    "message": "Category Not Updated"
                })
                console.log(err);
            } else {
                res.status(200).json({
                    "message": "Category Updated Successfully"
                })
            }
        })
    }

}

//Delete Category
exports.deleteCategory = (req, res) => {
    const categoryid = req.params.categoryid;

    if (!categoryid) {
        res.status(404).json({
            "message": "Category not found"
        });
    } else {
        Categorys.deleteOne({
            _id: categoryid
        }, (err, data) => {

            if (err) {
                console.log("er", err)
                res.status(204).json({
                    "message": "Category deletion failed"
                })
            } else {
                res.status(200).json({
                    "message": "Category deleted Successfully"
                })
            }

        })

    }
}