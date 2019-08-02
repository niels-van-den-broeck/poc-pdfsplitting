const pdfjsLib = require('pdfjs-dist');
const fs = require('fs');
const path = require('path');

const NodeCanvasFactory = require('./canvas-factory');

function loadDoc(binary) {
  return pdfjsLib.getDocument(binary).promise;
}


module.exports = async function pdfToImage(binary, isAnswer) {
  return loadDoc(binary)
    .then(pdfDocument => {
      console.log('# PDF document loaded.', pdfDocument);

      const pages = new Array(pdfDocument.numPages).fill(null);

      const promises =
        pages.map((x, index) => {
          return pdfDocument.getPage(index + 1).then(page => {
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

            return renderTask.promise
              .then(() => {
                const outPng = fs.createWriteStream(path.join(__dirname, isAnswer ? `../assets/png/${index + 1}a.png` : `../assets/png/${index + 1}.png`));
                const outJpeg = fs.createWriteStream(path.join(__dirname, isAnswer ? `../assets/jpeg/${index + 1}.jpeg` : `../assets/jpeg/${index + 1}.jpeg`));
                const pngStream = canvas.createPNGStream({
                  compressionLevel: 1,
                });
                const jpegStream = canvas.createJPEGStream({ quality: 1 });
                pngStream.pipe(outPng);
                jpegStream.pipe(outJpeg);

                return Promise.all([
                  new Promise(resolve => {
                    outPng.on('finish', () => {
                      console.log(`${index + 1}.png CREATED`);
                      resolve();
                    });
                  }),
                  new Promise(resolve => {
                    outJpeg.on('finish', () => {
                      console.log(`${index + 1}.jpeg CREATED`);
                      resolve();
                    });
                  }),
                ]);
              });
          });
        });

      return Promise.all(promises);
    });
};


