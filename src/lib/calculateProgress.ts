
export const calculateProgress = (
    start: [number, number],
    current: [number, number],
    destination: [number, number]
  ): number => {
    const euclideanDistance = (point1: [number, number], point2: [number, number]): number => {
      const [x1, y1] = point1;
      const [x2, y2] = point2;
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    };
  
    const totalDistance = euclideanDistance(start, destination);
    const traveledDistance = euclideanDistance(start, current);
    console.log('totalDistance:',totalDistance)
    console.log('traveledDistance:',traveledDistance)
    const progress = (traveledDistance / totalDistance) * 100; 
    console.log('progress:',progress);
    return progress;
  };