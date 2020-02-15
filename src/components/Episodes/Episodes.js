import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Episodes.css';
import { Button } from '@material-ui/core';


const Episodes = (props) => {
    // donnée générale
    const [ apiData, setApiData ] = useState([]);
    // Récuperation props paramètre url
    const { match }  = props;
    let { id }       = match.params;
    const [ idUrl , setIdUrl] = useState(id)
    // locale storage url de recherche api
    const urlApi2 =`https://rickandmortyapi.com/api/character/${id}`;



    const previousPage = (e) => {
        if(id > 1){
            setIdUrl(id - 1);
        }
    }

    const nextPage = (e) => {
        setIdUrl(id + 1);
    }

    // ComponentDidMount/DidUpdate


    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => {
            setApiData(res.data);
          })
    },[ urlApi2, id, idUrl]);

    return (
        <div className="style-card">
            <div className="style-card_Solo">
                <h2>{apiData.name}</h2>
                <h2>{apiData.status}</h2>
                <img className="img-Size" src={apiData.image} alt="rick et compagnie"/>
                <h2>{apiData.species}</h2>
                <h2>{apiData.gender}</h2>
                <h2>{apiData.type}</h2>
            </div>
            <div className="Footer-button_display">
                <div className="bouton-left">
                    <Button variant="contained" color="primary" onClick={previousPage}>{id - 1}</Button> 
                </div>
                <div className="bouton-right">
                <Button variant="contained" color="primary" onClick={nextPage}>{id + 1}</Button>
                </div>
        </div>
        </div>
    )
}

export default Episodes;
