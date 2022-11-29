import { Model } from 'sequelize';
import { MyResponse } from '../types/server';
import constants from './constants';

export const cascade = {
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
};

export function notFoundChecker(
  entity: Model | number | null,
  id: string,
  response: MyResponse,
  type: string
) {
  if (entity === null || entity === 0) {
    console.log(entity);

    response.status = constants.statusCodes.notFound;
    response.message = `${type} with id ${id} not found.`;
    throw new Error(response.message);
  }
}
