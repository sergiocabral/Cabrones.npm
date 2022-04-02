import { InvalidExecutionError } from '../Error/InvalidExecutionError';

/**
 * Utilitário para arquivo e diretórios.
 */
export class HelperIO {
  /**
   * Construtor proibido.
   */
  public constructor() {
    throw new InvalidExecutionError('This is a static class.');
  }
}
