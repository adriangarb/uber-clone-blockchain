import { useEffect, useContext,useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { UberContext } from '../context/uberContext'
import 'mapbox-gl/dist/mapbox-gl.css'
const style = {
  wrapper: `flex-1 h-full w-full`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const mapContainer = useRef(null);
  const { pickupCoordinates, dropoffCoordinates } = useContext(UberContext)
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-99.29011, 39.39172],
      zoom: 3,
    })
    if (pickupCoordinates) {
      addToMap(map, pickupCoordinates?.features[0]?.center)
    }

    if (dropoffCoordinates) {
      addToMap(map, dropoffCoordinates?.features[0]?.center)
    }
    if (pickupCoordinates && dropoffCoordinates) {
      map.fitBounds([dropoffCoordinates?.features[0]?.center, pickupCoordinates?.features[0]?.center], {
        padding: 100,
      })
    }
  }, [pickupCoordinates,dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
  }

  return (
  <div className={style.wrapper} ref={mapContainer}/>)
}

export default Map