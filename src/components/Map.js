import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { Circle } from 'react-leaflet';
import { Popup } from 'react-leaflet';

function Map({ center, zoom, countries }) {
    const caseTypeColor = {
        cases: {
            hex: '#CC1034',
            multiplier: 800
        },
        recovered: {
            hex: '#7dd71d',
            multiplier: 1200
        },
        deaths: {
            hex: '#fffff',
            multiplier: 2000
        }
    }

    const showMapData = (data, caseType = 'cases') => (
        data.map((country, i) => (
            <Circle
                key={i}
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={caseTypeColor[caseType].hex}
                fillColor={caseTypeColor[caseType].hex}
                radius={Math.sqrt(country[caseType]) * caseTypeColor[caseType].multiplier}
            >
                <Popup>
                    <div>
                        <div className="map__name" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                        <div className="map__countryName">{country.country}</div>
                        <div className="map__case">Cases:{country.cases}</div>
                        <div className="map__death">Deaths:{country.deaths}</div>
                        <div className="map__recovered">Recovered:{country.recovered}</div>
                    </div>
                </Popup>
            </Circle>
        ))
    );

    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'></TileLayer>
                {showMapData(countries, 'cases')}
            </LeafletMap>
        </div>
    )
}

export default Map
