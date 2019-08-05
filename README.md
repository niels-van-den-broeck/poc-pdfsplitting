# Investigate rendering using images

## Necessary steps to achieve.

### Conversion

- external deps: node-canvas, pdfjs-dist

- Create API/Lambda which can automatically convert the given PDF's to images. After this they have to be stored on s3 and can be served trough CloudFront.

- Hook API/Lambda into upload of a new book PDF

- Create batch process to convert all existing books.

- Serve Images trough Cloudfront distribution?

#### Cover and back cover

Will require to be named as 'cover' and 'backCover' since we potentially don't know the totalPages when uploading a backCover


### Player implications

#### Player Rendering

- Refactor Book Index component to get URL's for current pages instead of PDF rendering.

- Take steps to remove everything offscreen rendering related from Book component

- **Is very network intensive!! Average file size for a book page is over 1MB when using .PNG**

***

#### Printing

- Can be hooked in relatively easily and in the same manner as with the book rendering.

- Does not cause any performance gain on main browsers.

- Improves performance slightly on Edge

- **Is very network intensive!! Average file size for a book page is over 1MB when using .PNG**

***


## Conclusion

### General

Player speed when navigating improves dramatically. Code gets a lot easier as well.
Given some setup on AWS (manually adding the image files for a pdf), the player and lambda could be developed at the same time. This does cause the 1 september deadline to be a stretch. I think the entire refactoring would take somewhere around 4 weeks (Could be more, could be less). If done efficiently, pairing might be able to speed this up a little bit. Mainly on the player part (Printing vs Book rendering).

Player performance can be viewed using the POC branch.

### Image format

- My personal opinion tells me that jpeg for book pages is the way to go. Size is nearly half of what png provides. Only disadvantage being the small loss of quality in the book pages.

- Tried to get the images into webP format but this requires an entirely different approach than PNG/JPEG.	

- Answer layer will need png nonetheless to provide transparency. Since the content of the answer pages is rather small this is not much of a problem

#### Size comparison (Spitze 1 page 10-11)
- PNG: 791 KB + 2.1 MB = 2.891 MB on disk
- JPEG: 655 KB + 786 KB = 1441 MB on disk
- PDF 705 KB on disk

### Image conversion

- Converting the images could happen via an AWS lambda. This would take the PDF file out of its bucket, and store the converted images.

- A migration script could call this lambda for each existing book.

- We would need a migration which fills in the totalPages for all books too! (legacy books on dev).

### Image serving

- Serving of the images would go trough Cloudfront (Static images) (Will need to do something about CORS though)

### Player Refactoring

#### Book rendering 

- Fabric Service remains untouched. 

- Major changes would happen mainly in Book index component. PDFPageProviderService would be redundant and could perhaps be replaced by a service which fetches a couple of images at a time.

- Fabric could handle the image trough a given url which enables us to use the native Image caching of the given browser.


### Printing

- Unfortunately printing performance stays the same since loading in a lot of images at the same time and doing mutations on them stays virtually the same.

- To improve printing additional steps would be required.


### PDFJS

- We can not remove pdfjs entirely since the image-viewer still relies on it to display medialink PDFs with type image preview. :(

### Future features.

#### Text content selection / highlighting

- Using the pdfjs api, text can be extracted and stored at any given point. this information has contains everything around positioning, fonts, etc.

- For selection/highlighting SVG format can be used. this allows us to select the text content, copy paste it and also allows us to handle events on its position.
Svg provides us with the possibility to only have to handle a single DOM element over the current book canvas. Text selection on SVG can be viewed [here](https://codesandbox.io/s/svg-text-select-sug1h).
