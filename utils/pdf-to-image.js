const fs = require('fs');
const path = require('path');

const NodeCanvasFactory = require('./canvas-factory');
const { loadDoc } = require('./pdf-helpers');


module.exports = async function pdfToImage(buffer, isAnswer) {
  const pdfDocument = await loadDoc(buffer);
  
  console.log(`# PDF document loaded, it has ${pdfDocument.numPages} pages`);

  for (let pageNumber = 1; pageNumber === pdfDocument.numPages; pageNumber++) {
    console.log(`${pageNumber} started`);
    const page = await pdfDocument.getPage(pageNumber);
 
    const viewport = page.getViewport({ scale: 2 });
    const canvasFactory = new NodeCanvasFactory();
    const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      canvasFactory: canvasFactory,
    };

    if (isAnswer) renderContext.background = 'rgba(0,0,0,0)';

    const renderTask = page.render(renderContext);

    await renderTask.promise();

    const outPng = fs.createWriteStream(path.join(__dirname, isAnswer ? `../assets/png/${pageNumber}a.png` : `../assets/png/${pageNumber}.png`));
    const outJpeg = fs.createWriteStream(path.join(__dirname, isAnswer ? `../assets/jpeg/${pageNumber}.jpeg` : `../assets/jpeg/${pageNumber}.jpeg`));
    
    const pngStream = canvas.createPNGStream({
      compressionLevel: 1,
    });
    const jpegStream = canvas.createJPEGStream({ quality: 1 });
    pngStream.pipe(outPng);
    jpegStream.pipe(outJpeg);

    await Promise.all([
      new Promise(resolve => {
        outPng.on('finish', () => {
          console.log(`${pageNumber}.png CREATED`);
          resolve();
        });
      }),
      new Promise(resolve => {
        outJpeg.on('finish', () => {
          console.log(`${pageNumber}.jpeg CREATED`);
          resolve();
        });
      }),
    ]);
  }
};


