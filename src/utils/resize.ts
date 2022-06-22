import sharp from "sharp";
import path from "path";

export default async function resize(
  width: number,
  height: number,
  target: string
) {
  //Naming the resized image to be easily accessed while caching
  const output = `${target}_${width}_${height}.jpg`;

  //Resizing image with sharp
  await sharp(path.resolve(`assets/raw/${target}.jpg`))
    .resize(width, height)
    .toFile(path.resolve("assets/processed/", output));

  //Returning the newly resized image name
  return output;
}
