const {Schema, model}=require('mongoose')

const StitchSchema=new Schema({
    StitchName:{
        type:String,
        required:true
    },
    StitchPrice:{
        type:Number,
        required:true
    },
    reviews: {
        type: Array,
       default:[]
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    StitchCategory:{
        type:String,
        required:true
    },
    StitchBrand:{
        type:String,
        required:true
    },
    StitchThumbnail:{
        type:String,
        required:true
    },
    StitchDescription:{
        type:String,
        required:true
    }
    ,
    StitchImageArray:{
        type:[String],
        required:true
    }

})

const StitchFromModel=model('Stitch',StitchSchema)
module.exports={StitchFromModel}