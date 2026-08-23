export function calculateJourneyTime(edges, interchangeCount = 0) {
  const travelMinutes = edges.reduce((total, edge) => total + edge.time, 0)
  return Math.round(travelMinutes + edges.length * 0.5 + interchangeCount * 5)
}
