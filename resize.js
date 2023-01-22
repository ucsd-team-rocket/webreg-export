const jimp = require('jimp');

async function main() {
	// Read the image.
	const image = await jimp.read('myschedule.png');

	// Resize the image to width 150 and auto height.
	await image.resize(3840, jimp.AUTO, jimp.RESIZE_HERMITE);

    image.color([
        { apply: 'greyscale', params: [],
          apply: 'darken', params: [32] }
      ]);


    image.contrast(1);
    image.color([
        { apply: 'greyscale', params: []}
      ]);
    
	// Save and overwrite the image
	await image.writeAsync('myschedule-resize.png');

}

main();