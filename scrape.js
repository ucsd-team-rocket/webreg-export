

function crop(callback) {

    const filepath = "imageDesktop2.png"

    const Jimp = require('jimp')
    const imgItems = require('img-Items')

    
    const options = {
        background: 0xFFFFFFFF,
        backgroundThreshold: 30,
        //30
        gapThreshold: 3,
        widthThreshold: 5,
        heightThreshold: 200
  }

    Jimp.read(filepath)
    .then(image => {
        imgItems(image, options).then((items) => {
            const largest = items.reduce((p, c) => ((p.width + p.height) > (c.width + c.height)) ? p : c)
            
            image.crop(largest.left, largest.top, largest.width, largest.height).write('largest.png')
            callback();
        })
    })
}

async function scrape() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
    
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    
    // Performs label detection on the image file
    const [result] = await client.textDetection('largest.png');
    const detections = result.textAnnotations;
    console.log('Text:');
    // detections.forEach((text, index) => console.log(index + ": " + text.description + " " + text.boundingPoly.vertices.map(vertex => vertex.x + " " + vertex.y)));
    // (detections.forEach((text, index) => console.log((text.boundingPoly.vertices[1].y - text.boundingPoly.vertices[0].y) / (text.boundingPoly.vertices[3].y - text.boundingPoly.vertices[0].y))))
    detections.sort((a, b) => {
        if (Math.abs(a.boundingPoly.vertices[0].y - b.boundingPoly.vertices[0].y ) <= 12) {
            return a.boundingPoly.vertices[0].x - b.boundingPoly.vertices[0].x;
        } else {
            return a.boundingPoly.vertices[0].y - b.boundingPoly.vertices[0].y
        }
    })
    let string = "";
    const badboys = [",", ":", "-", "/"];
    detections.forEach((text, index) => string += index === 0 ? "" : ((badboys.includes(text.description) || badboys.includes(detections[index-1].description)) ? "" : " ") + text.description);
    console.log(string);
}

crop(scrape);