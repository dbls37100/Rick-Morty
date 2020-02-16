import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import useLocalStorage from 'react-use-localstorage';
import { Link } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

const Home = () => {
    // donnée générale
    const [ apiData, setApiData ] = useState([]);
    // Numéro de page
    const [ numberPage, setNumberPage ] = useState(1);
    // Url de recherche api
    const [ statusUrlApi, setStatusUrlApi ] = useState(`https://rickandmortyapi.com/api/character/?page=${numberPage}`);
    // Nom recherchée
    const [ name, setName ] = useState('');
    // locale storage
    // eslint-disable-next-line
    const [urlApi, setUrlApi] = useLocalStorage('urlApi', statusUrlApi );

    
    const setUrl = (url) => {
        setStatusUrlApi(url);
        setUrlApi(url);
    }
    // Id dynamique


    // cherchez un nom 

    const handleSubmitName = (e) => {
        setUrl(`https://rickandmortyapi.com/api/character/?name=${name}&page=${1}`);
        e.preventDefault();
    }

    // Cherchez par status (En vie, Mort, Inconnue)

    const handleSubmitAlive = (e) => {
        e.preventDefault();
        setUrl(`https://rickandmortyapi.com/api/character/?status=Alive&page=${1}`);
    }

    const handleSubmitDead = (e) => {
        setUrl(`https://rickandmortyapi.com/api/character/?status=Dead&page=${1}`);
    }

    const handleSubmitUnknown = (e) => {
        setUrl(`https://rickandmortyapi.com/api/character/?status=unknown&page=${1}`);
    }

    // Selectionnez par id

    /* const selectId = (event) => {
        setNumberPage(1);
        setId(event.target.value)
        setUrl(`https://rickandmortyapi.com/api/character/${id}/?page=${numberPage}`);
    } */

    // Retour au parametre Api de bases

    const listReturn = (e) => {
        setNumberPage(1);
        setUrl(`https://rickandmortyapi.com/api/character/?page=${1}`);
    }

    // Pagination

    const previousPage = (e) => {
        if(numberPage > 1){
            setNumberPage(numberPage - 1);
            setUrl(`https://rickandmortyapi.com/api/character/?page=${numberPage-1}`);
        } else {
            setUrl(`${statusUrlApi}?page=${numberPage}`)
        }
    }

    const nextPage = (e) => {
        setNumberPage(numberPage + 1);
        setUrl(`https://rickandmortyapi.com/api/character/?page=${numberPage +1}`);
    }

      // ComponentDidMount/DidUpdate

    useEffect(() => {
        axios.get(urlApi)
        .then(res => {
            setApiData(res.data.results);
          })
    },[ statusUrlApi, urlApi]);

    return (
        <div>
            <form className="form-Disposition" onSubmit={handleSubmitName}>
                <TextField className="color-Textfield" id="outlined-basic" label="Outlined" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
            </form>
            <div className="display-Filter">
                <i onClick={handleSubmitAlive} className="fas fa-heartbeat"></i>
                <i onClick={handleSubmitDead} className="fas fa-skull-crossbones"></i>
                <i onClick={handleSubmitUnknown} className="fas fa-question-circle"></i>
            </div>
            <div className="display_Button-align">
                <Button variant="contained" color="primary" onClick={listReturn}>Reinitialiser les filtres</Button>
            </div>
            <div className="structure-card">
            <div className="sizeCard">
                {apiData.map((data, key) => (
                <div  className="style-card" key={key}>
                    <Link value={data.id}  to={`/personnage/${data.id}`}>Voir Plus</Link>
                    <h1>{data.name}</h1>
                    <h2 >{data.status}</h2>
                    <div>
                        <img className="img-Size" src={data.image} alt="rick et compagnie"/>
                    </div>
                </div>
                ))}
            </div>
            </div>
            <div className="Footer-button_display">
                
                <div className="bouton-left">
                    <Button variant="contained" color="primary" onClick={previousPage}>{numberPage - 1}</Button> 
                </div>

                <div className="bouton-right">
                <Button variant="contained" color="primary" onClick={nextPage}>{numberPage + 1}</Button>
                </div>
            </div>
        </div>
    )
}

export default Home;
