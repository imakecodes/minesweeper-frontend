import { RestClient, getResponseData } from './base';

export class GameService extends RestClient {
  base = '/';

  CLICK_NAIVE = 8;

  createNewGame(rows, cols, mines) {
    return this.client
      .post(`${this.base}games`, { rows, cols, mines })
      .then(getResponseData);
  }

  cellClick(row, col, gameId) {
    return this.client
      .post(`${this.base}games/${gameId}/events`, { row, col })
      .then(getResponseData);
  }
}
