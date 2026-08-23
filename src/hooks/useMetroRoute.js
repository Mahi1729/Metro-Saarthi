import { useState } from 'react'
import { dijkstra } from '../algorithms/dijkstra'
import { bfs } from '../algorithms/bfs'
import { metroGraph, stationById } from '../data/metroData'
import { calculateFare } from '../utils/fareCalculator'
import { calculateJourneyTime } from '../utils/journeyCalculator'
import { summarizeRoute } from '../utils/routeHelpers'

export function useMetroRoute() {
  const [routes, setRoutes] = useState(null)
  const [error, setError] = useState('')
  const findRoute = (source, destination, preference) => {
    setError('')
    if (!source || !destination) {
      setRoutes(null)
      setError('Choose a source and destination station.')
      return null
    }
    if (source === destination) {
      setRoutes(null)
      setError('Choose two different stations for your journey.')
      return null
    }

    try {
      const distanceRoute = summarizeRoute(dijkstra(metroGraph, source, destination), stationById, calculateFare, calculateJourneyTime)
      const stopsRoute = summarizeRoute(bfs(metroGraph, source, destination), stationById, calculateFare, calculateJourneyTime)
      if (!distanceRoute || !stopsRoute) throw new Error('No route found between the selected stations.')
      const selectedRoute = preference === 'stops' ? stopsRoute : distanceRoute
      const nextRoutes = { active: selectedRoute, distance: distanceRoute, stops: stopsRoute }
      setRoutes(nextRoutes)
      return nextRoutes
    } catch (routeError) {
      console.error(routeError)
      setRoutes(null)
      setError('Unable to find a route between these stations.')
      return null
    }
  }
  return { routes, error, findRoute }
}
