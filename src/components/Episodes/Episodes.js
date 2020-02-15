import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Episodes.css';


const Episodes = (props) => {
    // donnée générale
    const [ apiData, setApiData ] = useState([]);
    // Récuperation props paramètre url
    const { match }  = props;
    let { id }       = match.params;
    // locale storage url de recherche api
    const urlApi2 =`https://rickandmortyapi.com/api/character/${id}`;


    // ComponentDidMount/DidUpdate


    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
            setApiData(res.data);
          })
    },[ urlApi2, id]);

    return (
        <div>
            <div className="style-card_Solo">
                <h2>{apiData.name}</h2>
                <h2>{apiData.status}</h2>
                <img className="img-Size" src={apiData.image} alt="rick et compagnie"/>
                <h2>{apiData.species}</h2>
                <h2>{apiData.gender}</h2>
                <h2>{apiData.type}</h2>
            </div>
        </div>
    )
}

export default Episodes;
