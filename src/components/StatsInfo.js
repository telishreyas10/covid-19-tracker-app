import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NumericLabel from 'react-pretty-numbers';

function StatsInfo(props) {
    console.log(props);

    const numParams = {
        'commafy': true,
        'shortFormat': true,
        'cssClass':['numLabel'],
        'precision':'2'
    }

    const onCountryChange = (e) => {
        props.selectedcountry(e.target.value);
    }

    return (
        <div className="statsInfo">
            {props.statsInfoData.map((statsInfo, i) => (
                <Card key={i} className="statsInfo__card">
                    <div>
                        <CardContent className="statsInfo__cardContent">
                            <Avatar src={statsInfo.logo} title="stats" />
                            <FormControl className="statsInfo__form">
                                <InputLabel shrink className="statsInfo__input">{statsInfo.title}</InputLabel>
                                {!statsInfo.readOnly ? (
                                    <Select defaultValue={props.country} className="statsInfo__select" selectedcountry={onCountryChange.bind(this)} onChange={onCountryChange}>
                                        <MenuItem value={props.country}>Global</MenuItem>
                                        {props.countries.map((country, i) => (
                                            <MenuItem key={i} value={country.country}> {country.country}</MenuItem>
                                        ))}
                                    </Select>) : (
                                        <Typography variant="h6" className="statsInfo__typo">
                                            <NumericLabel params={numParams} style={{textAlign:'none !important'}}>
                                                {
                                                    statsInfo.label === 'cases' ? props.countryData.cases : statsInfo.label === 'deaths' ? props.countryData.deaths : props.countryData.recovered
                                                }
                                            </NumericLabel>
                                        </Typography>
                                    )}

                            </FormControl>
                        </CardContent>
                    </div>
                </Card>
            ))}


        </div >
    )
}

export default StatsInfo
