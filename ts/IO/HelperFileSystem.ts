import { InvalidExecutionError } from '../Error/InvalidExecutionError';
import { InvalidArgumentError } from '../Error/InvalidArgumentError';
import { HelperText } from '../Data/HelperText';
import * as fs from 'fs';
import { default as pathNode } from 'path';

/**
 * Utilitário para arquivo e diretórios.
 */
export class HelperFileSystem {
  /**
   * Construtor proibido.
   */
  public constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }

  /**
   * Separa um caminho em suas partes.
   * @param path Caminho.
   * @param separators Separadores válidos. Por padrão barras: \ ou /
   */
  public static splitPath(
    path: string,
    separators: string[] = ['\\', '/']
  ): string[] {
    if (separators.length == 0) {
      throw new InvalidArgumentError('Empty list for separators.');
    }

    const regexSeparators = new RegExp(
      `${separators
        .map(separator => HelperText.escapeRegExp(separator))
        .join('|')}`
    );

    return path.split(regexSeparators);
  }

  /**
   * Obtem a extensão de um arquivo.
   * @param path Caminho ou arquivo.
   * @param extensionMarks Marcadores de extensão de arquivo. Por padrão ponto: .
   */
  public static getExtension(
    path: string,
    extensionMarks: string[] = ['.']
  ): string {
    if (extensionMarks.length == 0) {
      throw new InvalidArgumentError('Empty list for extension marks.');
    }

    for (const extensionMark of extensionMarks) {
      if (extensionMark.length === 0) {
        throw new InvalidArgumentError('Empty extension mark.');
      }

      const index = path.lastIndexOf(extensionMark);
      if (index >= 0) {
        return path.substring(index);
      }
    }

    return '';
  }

  /**
   * Apaga recursivamente todos os itens no caminho.
   * @param path Caminho
   * @return Retorna o total de itens excluídos.
   */
  public static deleteRecursive(path: string): number {
    if (!fs.existsSync(path)) {
      return 0;
    }

    const isDirectory = fs.lstatSync(path).isDirectory();

    if (!isDirectory) {
      fs.unlinkSync(path);
      return 1;
    }

    let affected = 1;
    const items = fs.readdirSync(path);
    for (const item of items) {
      affected += this.deleteRecursive(pathNode.join(path, item));
    }

    fs.rmdirSync(path);

    return affected;
  }

  /**
   * Cria recursivamente todos os itens de um caminho
   * @param path Caminho.
   * @param isFile Sinaliza que é para criar um arquivo.
   */
  public static createRecursive(path: string, isFile = false): number {
    if (fs.existsSync(path)) {
      const isDirectory = fs.lstatSync(path).isDirectory();

      if (isDirectory === isFile) {
        throw new InvalidExecutionError(
          'Path already exists but has other type.'
        );
      }

      return 0;
    }

    fs.mkdirSync(path, {
      recursive: true
    });

    const absolutePath = fs.realpathSync(path);

    if (isFile) {
      fs.rmdirSync(absolutePath);
      fs.writeFileSync(absolutePath, '');
    }

    return HelperFileSystem.splitPath(path).filter(item => Boolean(item))
      .length;
  }
}
