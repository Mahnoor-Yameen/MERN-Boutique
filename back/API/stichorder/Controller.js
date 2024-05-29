const { StitchFromModel } = require("./Model");
const { connect } = require("mongoose");
const  { MONGO_URL } = require ("./../../index")


const CreateStitch = async (req, res) => {
  const {
    StitchName,
    StitchCategory,
    StitchPrice,
    StitchBrand,
    rating,
    StitchThumbnail,
    StitchDescription,
    StitchImageArray
  } = req.body;

  // // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
  if (
    !StitchName ||
    !StitchCategory ||
    !StitchPrice ||
    !StitchBrand ||
    !StitchThumbnail ||
    !StitchDescription ||
    !StitchImageArray
  ) {
    res.status(403).json({
      message: "Some Fields are Missing",
    });
  } else {
    try {
      await connect(MONGO_URL);
    //   res.json({
    //     message: "database connected",
    //   });

      // Check if Stitch already exists
      const checkExistance = await StitchFromModel.exists({
        StitchName,
        StitchCategory,
        StitchBrand,
        StitchPrice,
        StitchThumbnail,
        StitchDescription,
        StitchImageArray,
      });
      if (checkExistance) {
        res.status(400).json({
          message: "Stitch already exists",
        });
      } else {
        await StitchFromModel.create({
          StitchName,
          StitchCategory,
          StitchPrice,
          StitchBrand,
          StitchThumbnail,
          rating,
          StitchDescription,
          StitchImageArray
        });

        const AllStitchs = await StitchFromModel.find();
        res.json({
          message: "New Stitch Created",
          AllStitch: AllStitchs,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Some error occurred:",
        errorMessage: error.message,
      });
    }
  }
};

const StitchByName =async (req, res) => {
  const {StitchName}=req.query

    try {
     await connect(MONGO_URL)
     const StitchByName=await StitchFromModel.findOne({StitchName})
     res.json({StitchByName})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const StitchReviews = async (req, res) => {

  const { _id, rating, username, review } = req.body

  try {
      await connect(MONGO_URL)
      console.log("DB CONNECTED")

      const Stitch = await StitchFromModel.findOne({ _id })
      Stitch.reviews.unshift({ username, rating, review })

      await Stitch.save();

      const allStitch = await StitchFromModel.findOne({ _id })

      res.status(201).json({
          message: "Reviews Added Successfully",
          Stitch: allStitch
      })

  } catch (error) {
      console.error(error)
      res.status(500).json({
          message: "Database Connection Failed"
      })
  }
}

const AllStitch=async (req, res) => {

  try {
      await connect(MONGO_URL)  //connect hoga db idher

      const AllStitchs=await StitchFromModel.find()
              res.json({
                  
                  Stitchs:AllStitchs

              })
  
      
  } catch (error) {
      res.status(400).json({
          message:"Error:",
          messagedusra:error.message
      })
      
  }
}

const StitchByID =async (req, res) => {
  const {_id}=req.query

    try {
     await connect(MONGO_URL)
     const StitchById=await StitchFromModel.findOne({_id})
     res.json({StitchById})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const StitchByBrandName =async (req, res) => {
  const {StitchBrand}=req.query

    try {
     await connect(MONGO_URL)
     const StitchByBrandName=await StitchFromModel.find({StitchBrand})
     res.json({StitchByBrandName})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const StitchByStitchCategoryName =async (req, res) => {
  const {StitchCategory}=req.query

    try {
     await connect(MONGO_URL)
     const StitchByStitchCategory=await StitchFromModel.find({StitchCategory})
     res.json({StitchByStitchCategory})
        
    } catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

const UpdateStitch =async (req, res) => {
  const {
    _id,
    StitchName,
    StitchCategory,
    StitchPrice,
    StitchBrand,
    rating,
    StitchThumbnail,
    StitchDescription,
    StitchImageArray
  } = req.body;
     
    
  const filter = { _id };
  const update = { StitchName,
    StitchCategory,
    StitchPrice,
    StitchBrand,
    rating,
    StitchThumbnail,
    StitchDescription,
    StitchImageArray };

  try {
      //db connection
      await connect(MONGO_URL)  //connect hoga db idher
      await StitchFromModel.findOneAndUpdate(filter, update, {
          new: true
        });

      //   sara lany k liye
      const StitchUpdate= await StitchFromModel.find()

      res.json({
          message:"Updation Done Succesfully",
          StitchUpdate
      })

      
  } catch (error) {
      res.status(400).json({
         message:"Some Error Came:",
         ErrorMessage:error.message
      })
      
  }
};

const DeleteStitch =async (req, res) => {
  const {_id}=req.body

    try {
     await connect(MONGO_URL)   //mongo connection
     //pehly find to karo k wo chez db mai hai bhi ya nahi
     if (_id){
            await StitchFromModel.deleteOne({_id})      //api call hony pe delete hojayegi
            const AllStitchs=await StitchFromModel.find()      //ek variable main baki ki mungwali
            res.status(200).json({
                message:"Deleted succesfully",
                AllStitchs
            })
        } else{
            res.json({
                message:"The id you are trying to delete do not exists"
            })
        }
    }catch (error) {
        res.status(400).json({
            message:"Some Error Came:",
            ErrorMessage:error.message
        })
        
    }
};

module.exports = {
  CreateStitch,
  StitchByName,
  StitchByBrandName,
  StitchByStitchCategoryName,
  StitchByID,
  UpdateStitch,
  DeleteStitch,
  AllStitch,
  StitchReviews
};
