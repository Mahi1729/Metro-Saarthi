import { useMemo, useState } from 'react'
import { ArrowDownUp, ArrowRight, ChevronRight, Navigation, Search, Sparkles } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { StationPicker } from './components/StationPicker'
import { MetroMap } from './components/MetroMap'
import { RouteSummary } from './components/RouteSummary'
import { RouteComparison } from './components/RouteComparison'
import { FeatureStrip as FeatureStripSection } from './components/FeatureStrip'
import { stations as rawStations, lines, connections } from './data/metroData'
import { useMetroRoute } from './hooks/useMetroRoute'

function App() {
  const stations = useMemo(() => rawStations.map((station) => ({ ...station, lineColor: lines[station.line].color, lineName: lines[station.line].name })), [])
  const [source, setSource] = useState('rajiv-chowk')
  const [destination, setDestination] = useState('airport-terminal')
  const [preference, setPreference] = useState('distance')
  const [activeMode, setActiveMode] = useState('distance')
  const { routes, error, findRoute } = useMetroRoute()
  const activeRoute = routes?.[activeMode] || null
  const networkDistance = connections.filter((edge) => edge.from < edge.to).reduce((sum, edge) => sum + edge.distance, 0)

  const handleFindRoute = () => { setActiveMode(preference); findRoute(source, destination, preference) }
  const swapStations = () => { setSource(destination); setDestination(source) }
  const selectComparison = (_, key) => setActiveMode(key)

  return <div id="top" className="app-shell"><Navbar /><main>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-pulse" /> Delhi NCR · Network online</div><h1>Move through<br /><em>the city,</em> <span>smarter.</span></h1><p className="hero-subtitle">Find the route that fits your day. Metro Saarthi maps the city's rhythm so you can focus on where you're going.</p><div className="hero-meta"><span><Sparkles size={15} /> Powered by graph algorithms</span><span>Updated today</span></div></div><div className="hero-map"><div className="map-orbit orbit-one" /><div className="map-orbit orbit-two" /><div className="hero-route-line line-a" /><div className="hero-route-line line-b" /><div className="hero-station station-a"><i /> <span>Dwarka</span></div><div className="hero-station station-b"><i /> <span>Rajiv Chowk</span></div><div className="hero-station station-c"><i /> <span>Hauz Khas</span></div><div className="hero-center"><Navigation size={28} /><small>YOUR<br />NETWORK</small></div><div className="hero-tag">22 stations<br /><b>4 lines</b></div></div></section>

    <section className="search-section"><div className="search-top"><div><span className="section-kicker">Plan a journey</span><h2>Where are you headed?</h2></div><span className="search-hint"><Search size={14} /> Search the network</span></div><div className="search-form"><StationPicker label="From" value={source} onChange={setSource} stations={stations} exclude={destination} /><button className="swap-button" type="button" onClick={swapStations} aria-label="Swap stations"><ArrowDownUp size={17} /></button><StationPicker label="To" value={destination} onChange={setDestination} stations={stations} exclude={source} /><div className="preference"><label>Route by</label><div className="segmented"><button className={preference === 'distance' ? 'active' : ''} onClick={() => setPreference('distance')} type="button">Shortest route</button><button className={preference === 'stops' ? 'active' : ''} onClick={() => setPreference('stops')} type="button">Fewest stops</button></div></div><button className="find-button" type="button" onClick={handleFindRoute}>Find route <ArrowRight size={18} /></button></div>{error && <p className="form-error">{error}</p>}</section>

    <section className="network-section" id="network"><div className="network-header"><div><span className="section-kicker">The living network</span><h2>See the city in lines.</h2><p>Every station is a node. Every connection, a choice.</p></div><div className="network-stats"><div><strong>{stations.length}</strong><span>stations</span></div><div><strong>4</strong><span>lines</span></div><div><strong>{networkDistance.toFixed(0)}<small>km</small></strong><span>network reach</span></div></div></div><MetroMap route={activeRoute} /></section>

    {routes && <><RouteComparison routes={routes} active={activeMode} onSelect={selectComparison} /><RouteSummary route={{ ...activeRoute, algorithm: activeMode }} /></>}
    <FeatureStripSection />
  </main><footer><span className="brand footer-brand">Metro <b>Saarthi</b></span><span>Designed for the daily commute.</span><a href="#top"><ChevronRight size={16} /> Back to top</a></footer></div>
}

export default App
