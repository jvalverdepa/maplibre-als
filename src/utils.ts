import distance from "@turf/distance";
import { Coord } from "@turf/turf";

const calculatePointsDistance = (point1: Coord, point2: Coord) => distance(point1, point2);

export const calculateMaxPointDistanceWithoutRepetitions = (points: Coord[]) =>
  points.reduce<{ maxDistance: number; p1: Coord | null; p2: Coord | null }>(
    (acc, curr, index, array) => {
      for (let i = index + 1; i < array.length; i++) {
        const distance = calculatePointsDistance(curr, array[i]);

        if (distance > acc.maxDistance) {
          acc.maxDistance = distance;
          acc.p1 = curr;
          acc.p2 = array[i];
        }
      }

      return acc;
    },
    {
      maxDistance: 0,
      p1: null,
      p2: null,
    }
  );
