const fs = require('fs');
const PDFDocument = require('pdfkit');

exports.generatePDF = async (pdfPath,content) => {
    const doc = new PDFDocument();
    const pdfPromise = new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(pdfPath);

        doc.pipe(writeStream);
        doc.text(content);
        doc.end();

        writeStream.on('finish', (qe,mes) => {
			console.log("mes : ", mes)
            resolve();
        });

        writeStream.on('error', (error) => {
            reject(error);
        });
    });

    await pdfPromise;
}