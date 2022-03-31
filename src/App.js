import './App.css';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [localizacao, setLocalizao] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, log) => {
    let res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: log,
        appid: '9eeb8e2f7ba6dd7dbd548a22ea8bf623',
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocalizao(true)
    })
  }, [])

  return (
    <Fragment>

      <h3> O clima em {weather['name']} está {weather['weather'][0]['description']}...  </h3>
      <h2> Temperatura atual {weather['main']['temp']}° </h2>

      <ul>
        <li> Temperatura mínima é de {weather['main']['temp_min']}° </li>
        <li> Temperatura máxima: {weather['main']['temp_max']}° </li>
        <li> Velocidade do vento {weather['wind']['speed']} </li>
        <li> Umidade {weather['main']['humidity']}% </li>
      </ul>

    </Fragment >
  );
}

export default App;