import { Inject, Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class PdfService {
    async Merge(folderPdfs: string) {
        const pdfs = fs.readdirSync(folderPdfs);
        try {
            const destino = await PDFDocument.create();

            for (const item of pdfs) {
                const uint8Array = fs.readFileSync(path.join(folderPdfs, path.basename(item)));
                const pdfDoc = await PDFDocument.load(uint8Array);
                const pages = await destino.copyPages(pdfDoc, pdfDoc.getPageIndices());
                pages.forEach(page => destino.addPage(page));
            }
            const pdfBytes = await destino.save();

            fs.writeFileSync(folderPdfs + "/mesclado.pdf", pdfBytes);
            return folderPdfs + "/mesclado.pdf";
        }
        catch (e) {
            return "erro";
        }

    }

    async create(pdfdestino: string, FolderPdfs: string) {

        const pdfs = fs.readdirSync(FolderPdfs);
        let destino = await PDFDocument.create();
        await destino.save()
    }
}
