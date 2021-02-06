import React from 'react'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
// https://github.com/Hopding/pdf-lib/tree/master/apps/web 

async function getAndModifyPdf(someMessage) {
    //    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    // Some big PDF that I found in the .gov site. It is of no interest - I just wanted a big PDF.
    // const url = 'https://www.bls.gov/respondents/iif/soii-sy2020-long-form-omb.pdf'
    const url = 'soii-sy2020-long-form-omb.pdf'


    // arrayBuffer and an iFrame are the only things _actually_ needed to display
    // a PDF. However, I want the page width and heights to properly style 
    // my iframe. And I want the pages count so that maybe I could make 
    // some sort of navigation mechanism. 
    // 
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const pages = pdfDoc.getPages()
    // const firstPage = pages[0]
    const { width, height } = pages[0].getSize()
    const msg = `Pages: ${pages.length}, Width: ${width}, Height: ${height}`
    alert(msg)
    // alert("the width is " + width + " and the height is " + height);
    // firstPage.drawText(someMessage, {
    //     x: 5,
    //     y: height / 2 + 300,
    //     size: 50,
    //     font: helveticaFont,
    //     color: rgb(0.95, 0.1, 0.1),
    //     rotate: degrees(-45),
    // })

    const pdfBytes = await pdfDoc.save()
    // return existingPdfBytes
    return pdfBytes
}



const renderInIframe = (pdfBytes, startTime) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    document.getElementById('iframe').src = blobUrl;
    let delta = new Date().getTime() - startTime
    delta /= 1000
    console.log("It took this long to fetch, modify & render the pdf, in seconds: " + delta)
};



const doPdfLogic = () => {
    const t1 = new Date().getTime()

    // const pdfBytes = getAndModifyPdf()
    // renderInIframe(pdfBytes)
    getAndModifyPdf("This is a messsage!").then(pdfBytes => renderInIframe(pdfBytes, t1))


}
//https://pdf-lib.js.org/#examples 

const PdfDisplayer = () => {
    return (
        <div>
            <iframe id="iframe"></iframe>
            <button onClick={() => doPdfLogic()} >PdfDisplayer</button>
        </div>
    )
}
export default PdfDisplayer