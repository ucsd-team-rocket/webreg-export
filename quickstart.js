async function quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.textDetection('https://media.discordapp.net/attachments/1066259583380762665/1066976054926913577/image.png');
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

quickstart();