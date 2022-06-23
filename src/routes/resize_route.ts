import express, { NextFunction } from "express";
import fs from "fs";
import path from "path";
import { resize } from "../utils";

const router = express.Router();

//Raw image array  assets/raw
const images: string[] = ["beach", "cat", "city", "globe", "laptop", "phone"];

//Middelware for valditating user input
router.use(
  (req: express.Request, res: express.Response, next: NextFunction): void => {
    //Validating the user required input (name, width, height)
    if (!req.query.name || !req.query.width || !req.query.height) {
      res.status(400); //Bad Request
      res.json({
        error: "name, width and height are required!",
      });

      //Checking the data type
    } else if (!Number(req.query.width) || !Number(req.query.height)) {
      res.status(400); //Bad Request
      res.json({
        error: "width and height should be of type number!",
      });

      //Checking if the image exists
    } else if (!images.includes(req.query.name as string)) {
      res.status(404); //Not Found
      res.json({
        error: `there is no image with name: ${req.query.name}`,
      });

      //Validation Passed
    } else {
      next();
    }
  }
);

router.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    //Converting the query parameters
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const target = String(req.query.name);

    /*
    Processed image have in it's name the width and height for refering to it in the future if the image has been processed before with the same dimensions
   */

    //Check cache for desired image size
    const resized_image_name = `${target}_${width}_${height}.jpg`; //Expected image name
    const resized_image_path = path.resolve(
      "assets/processed",
      resized_image_name
    );

    const isImageExist = fs.existsSync(resized_image_path); //Returns true if path exist and false otherwise

    //If image was found in the processed folder returns it directly
    if (isImageExist) {
      res.sendFile(resized_image_path);

      //If image was not found
    } else {
      //Awaiting for the resizing process
      const output = await resize(width, height, target);

      //Sending the resized image
      res.sendFile(path.resolve("assets/processed", output));
    }
  }
);

export default router;
