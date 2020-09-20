import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import NumericLabel from 'react-pretty-numbers';

function CountryTable(props) {

    const sortedData = [...props.countries];
    sortedData.sort((a,b)=> {
        if(a.cases > b.cases){
            return -1;
        } else{
            return 1;
        }
       return sortedData;
    });
    
    const numParams = {
        'commafy': true,
        'shortFormat': true,
        'cssClass':['numLabelTable'],
        'precision':'2'
    }

    return (
        <div className="countryTable">
            {sortedData.map((country, i) => (
                <List key={i} className="countryTable__list">
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="" src={country.countryInfo.flag} />
                        </ListItemAvatar>
                        <ListItemText primary={country.country} />
                        <ListItemText edge="end" style={{textAlign:'',color:'#262C7C'}}>
                            <NumericLabel params={numParams}>{country.cases}</NumericLabel>
                        </ListItemText>
                    </ListItem>
                </List>
            ))}
        </div>
    )
}

export default CountryTable
