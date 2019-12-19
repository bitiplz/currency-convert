import axios from 'axios';

const fetchRates = ( cb )=> {
    return axios.get( "https://openexchangerates.org/api/latest.json", {
        params: { app_id : "913d3d5c3f6d4cddb2e96b1899cf734e" },
    }).then( res => cb( res ) );
}

export default fetchRates;