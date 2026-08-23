const FARE_SLABS = [
  { max: 2, fare: 10 }, { max: 5, fare: 20 }, { max: 12, fare: 30 }, { max: 21, fare: 40 }, { max: 32, fare: 50 }, { max: Infinity, fare: 60 },
]
export function calculateFare(distance) { return FARE_SLABS.find((slab) => distance <= slab.max).fare }
