const crypto = require('crypto');
const { generatePDF } = require('../helper/generatePdf');
const { signPDF } = require('../helper/signPDF');
const { gatewayFunction } = require('../gateway/gateway');

exports.pdfController = async ( request, response ) => {
    const {filename, content} = request.body
    // Generate a PDF file on the server side
    const pdfPath = `/Users/apple/${filename}.pdf`;
    await generatePDF(pdfPath,content);
    let privateKey = await gatewayFunction()
    console.log("privateKey From PdfController : ", privateKey);
    // Sign the PDF using the provided private key
    signPDF(pdfPath, privateKey , (err, signedPdfBuffer) => {
        if (err) {
            return res.status(500).send('Error signing PDF');
        }

        // Provide the signed PDF for download
        response.setHeader('Content-Disposition', 'attachment; filename=signed_output.pdf');
        response.setHeader('Content-Type', 'application/pdf');
        response.send(signedPdfBuffer);
    });
}