export function bfs(graph, source, destination) {
  if (!graph || !graph[source] || !graph[destination]) return null

  const queue = [source]
  const previous = { [source]: null }
  while (queue.length) {
    const current = queue.shift()
    if (current === destination) break
    graph[current].forEach((edge) => {
      if (!graph[edge.station]) return
      if (!(edge.station in previous)) { previous[edge.station] = { station: current, edge }; queue.push(edge.station) }
    })
  }
  if (!(destination in previous)) return null
  const path = []
  let cursor = destination
  while (cursor) { path.unshift(cursor); cursor = previous[cursor]?.station }
  return { path, edges: path.slice(1).map((id) => previous[id].edge), stops: path.length - 1, algorithm: 'bfs' }
}
