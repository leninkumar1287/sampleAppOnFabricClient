const crypto = require('crypto')
const fs = require('fs')

exports.signPDF = (pdfPath, privateKey, callback) => {
    console.log("private key : ", privateKey);
    const pdfContent = fs.readFileSync(pdfPath);

    const sign = crypto.createSign('SHA256');
    sign.update(pdfContent);
    const signature = sign.sign(privateKey);
	console.log(" signature : ",signature)

    // Concatenate the PDF content and signature
    const signedPdfBuffer = Buffer.concat([pdfContent, Buffer.from('\n\nSignature: ' + signature)]);
    
    // Update the PDF file with the concatenated content
    fs.writeFileSync(pdfPath, signedPdfBuffer);

    callback(null, signedPdfBuffer);
}