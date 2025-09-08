async function getPdfPageImageBuffers(pdfDocument, pageNum) {
  // Loop through each page
  const page = await pdfDocument.getPage(pageNum);

  // Create a canvas element to render the page
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render the page
  await page.render({ canvasContext: context, viewport: viewport }).promise;

  // Convert the canvas content to a base64 image (alternatively, to a Blob)
  const imageData = canvas.toDataURL("image/png");

  return imageData;
}

export default getPdfPageImageBuffers;
