import { RestClient, getResponseData } from './base';

export class GameService extends RestClient {
  base = '/';

  createNewGame(rows, cols, mines) {
    return this.client
      .post(`${this.base}games`, { rows, cols, mines })
      .then(getResponseData);
  }
}
