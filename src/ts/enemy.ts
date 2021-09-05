import { lerp, Vector } from './vector';

export enum Type {
  Basic = 'Basic'
}

export interface Enemy {
  position: Vector;
  type: Type;
  age: number;
}

export interface WorldData {
  width: number;
  height: number;
}

export interface NextPositionData {
  enemy: Enemy;
  deltaTime: number;
  worldData: WorldData;
}

export function calcNextPosition(data: NextPositionData): Vector {
  return movePatterns[data.enemy.type](data);
}

const movePatterns: { [type in Type]: (data: NextPositionData) => Vector } = {
  Basic({ enemy, deltaTime, worldData }: NextPositionData) {
    const destination = {
      x: worldData.width / 2,
      y: worldData.height / 2
    };
    return lerp(enemy.position, destination, deltaTime * 1);
  }
}
