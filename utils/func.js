import { ethers } from "ethers";

export function similar_text(first, second, percent) {
    //  discuss at: http://phpjs.org/functions/similar_text/
    // original by: Rafał Kukawski (http://blog.kukawski.pl)
    // bugfixed by: Chris McMacken
    // bugfixed by: Jarkko Rantavuori original by findings in stackoverflow (http://stackoverflow.com/questions/14136349/how-does-similar-text-work)
    // improved by: Markus Padourek (taken from http://www.kevinhq.com/2012/06/php-similartext-function-in-javascript_16.html)
    //   example 1: similar_text('Hello World!', 'Hello phpjs!');
    //   returns 1: 7
    //   example 2: similar_text('Hello World!', null);
    //   returns 2: 0
  
    if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
      return 0;
    }
  
    first += '';
    second += '';
  
    var pos1 = 0,
      pos2 = 0,
      max = 0,
      firstLength = first.length,
      secondLength = second.length,
      p, q, l, sum;
  
    max = 0;
  
    for (p = 0; p < firstLength; p++) {
      for (q = 0; q < secondLength; q++) {
        for (l = 0;
          (p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++)
        ;
        if (l > max) {
          max = l;
          pos1 = p;
          pos2 = q;
        }
      }
    }
  
    sum = max;
  
    if (sum) {
      if (pos1 && pos2) {
        sum += this.similar_text(first.substr(0, pos1), second.substr(0, pos2));
      }
  
      if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
        sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,
          secondLength - pos2 - max));
      }
    }
  
    if (!percent) {
      return sum;
    } else {
      return (sum * 200) / (firstLength + secondLength);
    }
  }

  export const convertToMoney = (amount) =>{
    return Number(ethers.utils.formatUnits(amount || 0, 8).toString())
         .toFixed(2)
         .replace(/\d(?=(\d{3})+\.)/g, "$&,")
   }
 
  export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation)

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}


  export async function getCroppedImg(
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
  
    if (!ctx) {
      return null
    }
  
    const rotRad = getRadianAngle(rotation)
  
    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    )
  
    // set canvas size to match the bounding box
    canvas.width = bBoxWidth
    canvas.height = bBoxHeight
  
    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
    ctx.rotate(rotRad)
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
    ctx.translate(-image.width / 2, -image.height / 2)
  
    // draw rotated image
    ctx.drawImage(image, 0, 0)
  
    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    )
  
    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
  
    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0)
  
    // As Base64 string
    return canvas.toDataURL('image/jpeg');
  
    // As a blob
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((file) => {
    //     resolve(URL.createObjectURL(file))
    //   }, 'image/jpeg')
    // })
  }