# Investigate rendering using images

## Necessary steps to achieve.

### Conversion ????

- Create API/Lambda which can automatically convert the given PDF's to images. After this they have to be stored on s3 and can be served trough CloudFront.

- Hook API/Lambda into upload of a new book PDF

- Create batch process to convert all existing books.

- Serve Images trough Cloudfront distribution?

#### Image types

- Measured using Spitze 1 p.9 (title page: Ich bin wie du)

- PNG: 
- JPEG:

### Player implications 1 week

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


