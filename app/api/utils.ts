export function pointToCoords(point: string) {
  return point.replaceAll(/[()]/g, '').split(',').map(parseFloat) as [
    number,
    number
  ];
}
