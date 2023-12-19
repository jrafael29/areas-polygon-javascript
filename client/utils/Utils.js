export default class Utils {
    static transformCoordinatesToArrayOfObjects(coordinatesSource = []) {
      return coordinatesSource.map(function (coord) {
        return { lat: coord[1], lng: coord[0] };
      });
    }
  
    static transformCoordinatesToArrayOfArrays(inputArray = []) {
      return inputArray.map((coord) => [coord.lat, coord.lng]);
    }
  
    static transformArrayOfObjectsCoordinatesToArrayOfArrays(inputArrayOfObjects){
      return inputArrayOfObjects.map(({x, y}) => {
        return [x, y]
      })
    }

    static extractLayerIdFromLeafletEvent(leafletEvent) {
      const id = Object.values(leafletEvent.layers._layers)[0].id;
      return id;
    }
  }