export default class OpenRouteDistanceService {
  async getDistance(lat1, lng1, lat2, lng2) {
    const OpenRouteAppToken = process.env.OPEN_ROUTE_API_KEY;
    const url =
      "https://api.openrouteservice.org/v2/directions/driving-car/json";
    const headers = {
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      Authorization: OpenRouteAppToken,
      "Content-Type": "application/json; charset=utf-8",
    };
    const body = {
      coordinates: [
        [lng1, lat1],
        [lng2, lat2],
      ],
    };

    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        const distance = (data.routes[0].summary.distance / 1000).toFixed(2) ;
        const durationInMinutes = (
          (data.routes[0].summary.duration * 2) /
          60
        ).toFixed(2);
        return {
          distance,
          duration: durationInMinutes,
        };
      });
  }
}
