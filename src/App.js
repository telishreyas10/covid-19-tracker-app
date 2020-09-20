import React, { useState, useEffect } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import globalStatsLogo from './assets/global-stats.png';
import totalCovidLogo from './assets/total-covid-logo.png';
import totalDeathsLogo from './assets/total-deaths-logo.png';
import totalRecoveredLogo from './assets/total-recovered-logo.png';
import covidLogoWhite from './assets/covid-logo-white.png';
import covidLogolarge from './assets/covid-logo-large.png';
import StatsInfo from './components/StatsInfo';
import CountryTable from './components/CountryTable';
import Map from './components/Map';


function App(props) {
  //DECLARATIONS
  const [countries, setCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState('Global');
  const [statsInfoData] = useState([
    {
      title: 'Stats Overview',
      logo: globalStatsLogo,
      readOnly: false,
      label: 'stats'
    },
    {
      title: 'Total COVID Cases',
      logo: totalCovidLogo,
      readOnly: true,
      label: 'cases'
    },
    {
      title: 'Total Recovered',
      logo: totalRecoveredLogo,
      readOnly: true,
      label: 'recovered'
    },
    {
      title: 'Total Deaths',
      logo: totalDeathsLogo,
      readOnly: true,
      label: 'deaths'
    },
  ])
  const [mapCenter, setMapCenter] = useState({lat:39.320138,lng:3.393749});
  const [mapZoom, setMapZoom] = useState(1.5);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
          setMapCountries(data);
        });
    }
    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data);
      });
  }, [])

  const selectedcountry = (c) => {
    setCountry(c);

    const getCountryData = async () => {
      const countryUrl = (c === 'Global') ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${c}?strict=true`
      await fetch(countryUrl)
        .then((res) => res.json())
        .then((data) => {
          setCountryData(data);
          setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
          setMapZoom(4);
        });
    }
    getCountryData();
  }

  return (
    <div className="app">

      <AppBar position="static" className="app__header">
        <Toolbar>
          <img alt="" src={covidLogoWhite} />
          <Typography variant="h6">
            COVID-19
          </Typography>
        </Toolbar>
      </AppBar>


      <div className="app__main">
        <div className="app__main__info">
          <Card className="app__main__info__card">
            <CardContent>
              <Typography variant="h5" component="h4">
                COVID-19 LIVE TRACKER
                </Typography><br />
              <Typography variant="body2" component="p">
                The Coronavirus (COVID-19) was first reported in Wuhan, Hubei, China in December 2019, the outbreak was later recognized as a pandemic by the World Health Organization (WHO) on 11 March 2020.
                  <br />
              </Typography>
            </CardContent>
          </Card>

          <div className="app__main__info__img">
            <img alt="" src={covidLogolarge} />
          </div>
        </div>
      </div>

      <Card className="app__main__info__stats">
        <CardContent className="app__main__info__stats_cardcontent">
          <StatsInfo countries={countries} country={country} countryData={countryData} selectedcountry={selectedcountry.bind(this)} statsInfoData={statsInfoData}></StatsInfo>
        </CardContent>
      </Card>

      <div className="app__info__data">
        <div className="app__info_data__map">
          <Card className="app__info_data__map__card">
            <CardContent>
              <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}></Map>
            </CardContent>
          </Card>
        </div>
        <div className="app__info_data__list">
          <Card className="app__info_data__list__card">
            <CardContent>
              <CountryTable countries={countries}></CountryTable>
            </CardContent>
          </Card>
        </div>
      </div>

      <AppBar position="static" className="app__footer">
        <Toolbar>
          {/* <img alt="" src={covidLogoWhite} /> */}
          <Typography variant="h6">
            © teliShreyas10
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
