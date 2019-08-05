const pdfjsLib = require('pdfjs-dist');

module.exports.loadDoc = function (binary) {
  return pdfjsLib.getDocument(binary).promise;
};

module.exports.getPageContent = function (pdfDoc) {
  return Promise.all(
    new Array(pdfDoc.numPages)
      .fill(null)
      .map((stuff, index) => {
        return pdfDoc.getPage(index + 1)
          .then(page => {
            return page.getTextContent().then(function (textContent) {
              return textContent;
            });
          });
      }),
  );
};

