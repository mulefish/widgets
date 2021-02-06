import React from 'react'
// const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
// import { PDFDocument } from 'pdf-lib'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';


async function getAndModifyPdf() {
    const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
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



const renderInIframe = (pdfBytes) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    document.getElementById('iframe').src = blobUrl;
};


const doPdfLogic = () => {
    try {

        const t1 = new Date().getTime()

        const pdfBytes = getAndModifyPdf()
        renderInIframe(pdfBytes)
        const t2 = new Date().getTime() - t1
        alert("yayDone and it took " + t2 + " and I have this many bytes " + pdfBytes)
    } catch (boom) {
        alert(boom)
    }


}


const PdfThing = () => {
    return (
        <div>PdfThing! Zoom !!

            <iframe id="iframe"></iframe>


            <button onClick={() => doPdfLogic()} >doPdfLogic()</button>



        </div>
    )
}
export default PdfThing