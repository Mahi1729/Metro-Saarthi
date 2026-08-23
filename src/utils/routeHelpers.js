export function getInterchanges(path, edges) {
  return path.filter((_, index) => index > 0 && index < path.length - 1 && edges[index - 1]?.line !== edges[index]?.line)
}

export function summarizeRoute(result, stationById, fareCalculator, journeyCalculator) {
  if (!result || !result.path?.length || result.path.some((stationId) => !stationById[stationId])) return null
  const stops = result.path.length - 1
  const interchanges = getInterchanges(result.path, result.edges)
  const distance = result.distance ?? result.edges.reduce((total, edge) => total + edge.distance, 0)
  return { ...result, stops, distance, interchanges, time: journeyCalculator(result.edges, interchanges.length), fare: fareCalculator(distance), stationNames: result.path.map((id) => stationById[id].name) }
}
