import express from "express";
import fs from "fs";
import path from "path";
import { resize } from "../utils";

const router = express.Router();

//Raw image array  assets/raw

const images: string[] = ["beach", "cat", "city", "globe", "laptop", "phone"];

router.use((req, res, next) => {
  //Validating the user required input
  if (!req.query.name || !req.query.width || !req.query.height) {
    res.status(400);
    res.json({
      error: "name, width and height are required!",
    });

    //Checking the data type
  } else if (!Number(req.query.width) || !Number(req.query.height)) {
    res.status(400);
    res.json({
      error: "width and height should be of type number!",
    });

    //Checking if the image exists
  } else if (!images.includes(req.query.name as string)) {
    res.json({
      error: `there is no image with name: ${req.query.name}`,
    });
    res.status(404);
  } else {
    next();
  }
});

router.get("/", async (req, res) => {
  //Converting the query parameters
  const width = Number(req.query.width);
  const height = Number(req.query.height);
  const target = String(req.query.name);

  //Check cache for desired image size
  const resized_image_name = `${target}_${width}_${height}.jpg`;
  const resized_image_path = path.resolve(
    "assets/processed",
    resized_image_name
  );

  const isImageExist = fs.existsSync(resized_image_path);

  if (isImageExist) {
    res.sendFile(resized_image_path);
  } else {
    //Awaiting for the resizing process
    const output = await resize(width, height, target);

    //Sending the resized image
    res.sendFile(path.resolve("assets/processed", output));
  }
});

export default router;
