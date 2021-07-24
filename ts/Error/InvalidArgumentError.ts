import { GenericError } from './GenericError';

/**
 * Erro quando o argumento não é válido.
 */
export class InvalidArgumentError extends GenericError {
  /**
   * Construtor.
   * @param message Mensagem de erro.
   * @param innerError Erro original.
   * @protected
   */
  public constructor(message?: string, public innerError?: Error) {
    super(message, innerError, 'InvalidArgumentError');
  }
}
