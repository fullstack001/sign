async function drawImg(element, pdfDocument, pageNum) {
  // Check if the element does not have any canvas child
  const hasCanvas = element.querySelector("canvas");
  if (!hasCanvas) {
    const page = await pdfDocument.getPage(pageNum);

    // Create a canvas element to render the page
    const canvas = document.createElement("canvas");
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Append canvas to the element since it doesn't have one
    element.appendChild(canvas);
    const context = canvas.getContext("2d");

    // Render the page on the canvas
    await page.render({ canvasContext: context, viewport: viewport }).promise;
  }
}

export default drawImg;
