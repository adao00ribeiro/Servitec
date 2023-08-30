import { Controller, Get, Header, HttpException, HttpStatus, Post, Request, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthRequest } from './auth/dto/AuthRequest';
import { ExtractzipService } from './extractzip/extractzip.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PdfService } from './pdf/pdf.service';
import * as  fs from 'fs'
import * as path from 'path';
import { Response } from 'express';
import { MydocxService } from './mydocx/mydocx.service';
import { IMydocx } from './mydocx/IMydocx';
@Controller()
export class AppController {

  private uploadPath: string;
  private outputFolder: string;
  constructor(
    private readonly appService: AppService,
    private readonly extract: ExtractzipService,
    private readonly pdf: PdfService,
    private readonly doc: MydocxService

  ) {
    this.uploadPath = "./public/uploads";
    this.outputFolder = "./public/extracao";
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('doc')
  @Header('Content-Type', 'application/docx')
  @Header('Content-Disposition', 'attachment; filename="Contrato Locação.docx"')
  async getDoc(@Res({ passthrough: true }) response: Response) {
    const props: IMydocx = {

      pathModelContract: "./ModelContracts/ModeloLocacao.docx",
      informacoes: [
        ['LOCADORNOME', 'ADAO RIBEIRO CORREIA'],
        ['LOCADORNATURALIDADE', 'BRASILEIRO'],
        ['LOCADORESTADOCIVIL', 'SOLTEIRO'],
        ['LOCADORPROFISSAO', 'DESENVOLVEDOR DE SOFTWARE'],
        ['LOCADORENDERECO', 'RUA PIONEIRO JOAO JOSE FERREIRA'],
        ['LOCADORNUMERO', '721'],
        ['LOCADORBAIRRO', 'JD.VITORIA'],
        ['LOCADORCIDADE', 'ARARUNA'],
        ['LOCADORESTADO', 'PR'],
        ['LOCADORCEP', '87260-000'],
        ['LOCADORRG', '13.171.576-5'],
        ['LOCADORCPF', '093.113.239-85'],
      ]
    }
    const files = await this.doc.teste(props);
    return new StreamableFile(files);
  }


  @Post('mesclarpdf')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./public/uploads",
      filename: (req, file, cb) => {
        cb(null, `zippdf.zip`)
      }
    })
  }))
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="mesclado.pdf"')
  async Extract(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) response: Response
  ) {

    const { destination, filename } = file;
    await this.extract.ExtractToDirectory(path.join(this.uploadPath, filename), this.outputFolder);
    const mesclado = await this.pdf.Merge(this.outputFolder);
    const filess = fs.readFileSync(path.join(process.cwd(), mesclado));
    //fs.unlinkSync(join(process.cwd(), mesclado));
    this.deleteFolderRecursive(this.outputFolder);
    return new StreamableFile(filess);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }

  deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const currentPath = path.join(folderPath, file);

        if (fs.lstatSync(currentPath).isDirectory()) {
          // Recursivamente excluir subpastas e seu conteúdo
          this.deleteFolderRecursive(currentPath);
        } else {
          // Excluir arquivo
          fs.unlinkSync(currentPath);
        }
      });
      // Excluir pasta vazia
      fs.rmdirSync(folderPath);
    }
  }

}
