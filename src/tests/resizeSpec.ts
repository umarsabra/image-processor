import { resize } from "../utils";

describe("Testing the resize functionality", () => {
  it("Check the output of the resized image ", async () => {
    const output = (await resize(300, 300, "cat")) as string;
    /*
        if the resize function returned an output of cat_300_300.jpg that means the function has successfully resized the image cat.jpg from the raw folder
     */
    expect(output).toBe("cat_300_300.jpg");
  });
});
