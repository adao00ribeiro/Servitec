import { Injectable } from '@nestjs/common';
import * as AdmZip from 'adm-zip';
import * as path from 'path';
import * as fs from 'fs'
@Injectable()
export class ExtractzipService {
    async ExtractToDirectory(pathZip: string, pathExtract: string) {
        try {
            const zip = new AdmZip(pathZip);
            const zipEntries = zip.getEntries();
            const pdfFiles = zipEntries.filter((zipEntry: AdmZip.IZipEntry) => {
                return !zipEntry.isDirectory && zipEntry.entryName.slice(-4).toLowerCase() === '.pdf';
            });
            if (pdfFiles.length === 0) {
                console.log("Nenhum arquivo PDF encontrado no zip.");
                return false;
            }
            if (!fs.existsSync(pathExtract)) {
                fs.mkdirSync(pathExtract, { recursive: true });
            }
            pdfFiles.forEach(zipEntry => {
                const pdfOutputPath = path.join(pathExtract, path.basename(zipEntry.entryName));
                const pdfData = zipEntry.getData();
                fs.writeFileSync(pdfOutputPath, pdfData);
            });
            return true;
        } catch (error) {
            return false;
        }

        /*
        return new Promise((resolve, reject) => {
            zip.extractAllToAsync(pathExtract, true, true, (error) => {
                if (error) {
                    console.error("ocorreu um erro", error);
                    resolve(false); // Resolvendo a Promise com false para indicar erro
                }
                console.log("com sucesso");
                resolve(true); // Resolvendo a Promise com true para indicar sucesso

            });
        });
        */
    }
}





