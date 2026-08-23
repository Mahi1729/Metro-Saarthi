export function dijkstra(graph, source, destination) {
  if (!graph || !graph[source] || !graph[destination]) return null

  const nodeIds = Object.keys(graph)
  const distances = Object.fromEntries(nodeIds.map((id) => [id, Infinity]))
  const previous = {}
  const visited = new Set()
  distances[source] = 0

  while (visited.size < nodeIds.length) {
    const unvisited = nodeIds.filter((id) => !visited.has(id))
    const current = unvisited.reduce((best, id) => distances[id] < distances[best] ? id : best, unvisited[0])
    if (!current || distances[current] === Infinity) break
    visited.add(current)
    if (current === destination) break

    graph[current].forEach((edge) => {
      if (!graph[edge.station] || !Number.isFinite(edge.distance) || edge.distance < 0) return
      const candidate = distances[current] + edge.distance
      if (candidate < distances[edge.station]) {
        distances[edge.station] = candidate
        previous[edge.station] = { station: current, edge }
      }
    })
  }

  if (distances[destination] === Infinity) return null
  const path = []
  let cursor = destination
  while (cursor) { path.unshift(cursor); cursor = previous[cursor]?.station }
  return { path, distance: distances[destination], edges: path.slice(1).map((id) => previous[id].edge), algorithm: 'dijkstra' }
}
