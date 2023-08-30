import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import docx, { ExternalHyperlink, HeadingLevel, IPatch, ImageRun, Paragraph, PatchDocumentOptions, PatchType, Table, TableCell, TableRow, TextDirection, TextRun, VerticalAlign, patchDocument } from "docx";
import * as fs from "fs";
import { IMydocx } from './IMydocx';
@Injectable()
export class MydocxService {



    async teste(props: IMydocx) {

        const myVariable: { [key: string]: IPatch } = {

        }

        const listaDeDados: [string, IPatch][] = props.informacoes.map((valor, index) => {
            return [
                valor[0],
                {
                    type: PatchType.PARAGRAPH,
                    children: [
                        new TextRun({
                            text: valor[1],
                            bold: true,
                            font: "Arial",
                            size: 24
                        })],
                }
            ]
        })
        listaDeDados.forEach(([chave, patch]) => {
            myVariable[chave] = patch;
        });

        const doc = await patchDocument(fs.readFileSync(props.pathModelContract), {
            patches: myVariable
        })
        return doc;

        /*
     .then((doc) => {
         return ;
      
 exec(`start ./public/contract/contract.docx`, (error, stdout, stderr) => {
     if (error) {
         console.error(`Erro ao abrir o arquivo: ${error}`);
     }
 });
     });*/
    }
}
