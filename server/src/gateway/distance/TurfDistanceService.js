import * as turf from "@turf/turf";

export default class TurfDistanceService {
  getDistance(lat1, lng1, lat2, lng2) {
    const point1 = turf.point([lng1, lat1]);
    const point2 = turf.point([lng2, lat2]);
    const distance = turf.distance(point1, point2);

    const durationInMinutes = (distance * 4).toFixed(2);
    return {
      distance: distance.toFixed(2),
      duration: durationInMinutes,
    };
  }
}
