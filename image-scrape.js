async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.textDetection('myschedule.png');
  const detections = result.textAnnotations;
  console.log('Text:');

  const storeArray = [];
  const xGrid = [];
  const yGrid = [];

  detections.forEach(text => storeArray.push([text.boundingPoly.vertices.map(vertex => vertex.x), text.boundingPoly.vertices.map(vertex => vertex.y), text]));
  
  storeArray.sort((a,b) => a[1] - b[1])
  storeArray.sort((a,b) => a[0] - b[0])

  const origin = storeArray[0];
  xGrid.push(origin[0]);
  yGrid.push(origin[1]);

  storeArray.forEach(text => {
    if(text[1] > (origin[1]-3) && text[1] < (origin[1]+3)){
      xGrid.push(text[0]);
    }
  });

  storeArray.forEach(text => {
    if(text[0] > (origin[0]-3) && text[0] < (origin[0]+3)){
      xGrid.push(text[1]);
    }
  });

    





  console.log(xGrid);
  console.log(yGrid);



  //console.log(text.description + text.boundingPoly.vertices.map(vertex => vertex.x + " " + vertex.y))






}
quickstart();