import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res
      .status(404)
      .json({ message: `Invalid ObjectId of :  ${req.params.id}` });
  }
  next();
}

export default checkObjectId;
