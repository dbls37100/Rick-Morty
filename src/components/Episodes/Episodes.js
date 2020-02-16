import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Episodes.css';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


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
        <div className="style-card">
            <div className="style-card_Solo">
                <h1>{apiData.name}</h1>
                <h2>{apiData.status}</h2>
                <img className="img-Size" src={apiData.image} alt="rick et compagnie"/>
                <h2>{apiData.species}</h2>
                <h2>{apiData.gender}</h2>
                <h2>{apiData.type}</h2>
            </div>
            <div className="Footer-button_display">

            <Link to="/">
                <Button renderAs="button" variant="contained" color="primary">
                    <span>Page précédente</span>
                </Button>
            </Link>
        </div>
        </div>
    )
}

export default Episodes;
