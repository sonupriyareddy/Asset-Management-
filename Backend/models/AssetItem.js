import mongoose from "mongoose";
const assetItemSchema = new mongoose.Schema(
  {
    model: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"AssetModel" }, //it will take object id from assetmodel
    serialNumber: { type: String,unique:true, required: true },
    purchaseDate: { type: Date,require:true},
    purchaseCost:{type:Number},
    location:{type:String},

   status: {
      type: String,
      enum: ["available","assigned","mentainance","tetired"],
      default: "available",
    },
   
    condition: { type: String,enum:["new","good","fair","poor"] ,default:"good"},
  },
  { timestamps: true }
); //this timestamps will create 2 default field (created,updated)

const AssetItem = mongoose.model("AssetItem", assetItemSchema);
export default AssetItem;
