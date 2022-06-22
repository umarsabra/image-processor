# Image Processor

Simple API that allows you to resize image by giving the image name, width and height as query strings

## Usage

- it can be embedded in an src tag as it returns the resized image without any additional information
- it also caches the resized image for fast access in the future without going through the processing time again

## Installation

`git clone https://github.com/umarsabra/image-processor.git`

`http://localhost:3000/resize` takes 3 query strings

- **Name:** Image name from the raw folder
- **Width:** Desired image width
- **Height:** Desired image height

## Examples

- **Example 1:** `http://localhost:3000/resize?name=cat&width=400&height=400`
- **Example 2:** `http://localhost:3000/resize?name=city&width=800&height=400`
- **Example 3:** `http://localhost:3000/resize?name=phone&width=400&height=700`
