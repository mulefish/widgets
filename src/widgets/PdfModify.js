import React from 'react'
// const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
// import { PDFDocument } from 'pdf-lib'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


async function getAndModifyPdf(someMessage) {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText(someMessage, {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
    })

    const pdfBytes = await pdfDoc.save()
    // return pdfDoc
    return pdfBytes
}



const renderInIframe = (pdfBytes, startTime) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    document.getElementById('iframe_pdf_modify').src = blobUrl;
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


const PdfThing = () => {
    return (
        <div>
            <iframe id="iframe_pdf_modify"></iframe>
            <button onClick={() => doPdfLogic()} >PdfModify</button>
        </div>
    )
}
export default PdfThing