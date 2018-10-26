import geoJsonStats from 'geojson-stats'
import crashData from 'resources/data.json'

const statProperties = ['total', '2010', '2011', '2012', '2013', '2014']

const getStats = () => {
  const properties = ['length', 'area', ...statProperties]
  const stats = geoJsonStats(crashData, statProperties)

  return properties.reduce((accum, property, idx) => ({
    ...accum,
    [property]: {
      ...stats[idx]
    }
  }), {})
}

export const dataCenter = [38.90364199734993, -77.02342987060545]

export const data = crashData
export const dataStats = getStats();
