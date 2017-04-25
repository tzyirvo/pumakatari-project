import { Action } from '@ngrx/store';
import { actionType } from '../util/action-type';

export const ActionTypes = {
  LOAD_DB_DATA: actionType('[Db] Load data')
};

export class LoadDbData implements Action {
  type = ActionTypes.LOAD_DB_DATA;
  constructor() {}
}
