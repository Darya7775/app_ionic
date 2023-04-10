import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonTitle } from '@ionic/react';
import { Link } from "react-router-dom";
import Header from "../../components/base/header/header";
import "./style.css";

function ListBeers ({ page }) {
  const [items, setItems] = useState([]);
  const [isActive, setActive] = useState(false);
  const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=5`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        })
      .catch(() => {
        alert('Не удалось загрузить данные с сервера!');
      });
  }, [page, isActive])

  const beers = [];

  if(localStorage.length) {
    for(let i = 0; i < localStorage.length; i++) {
      const nameBeer = localStorage.key(i);
      const objBeer = localStorage.getItem(nameBeer);
      beers.push(JSON.parse(objBeer));
    }
  }

  const objFavorit = {};

  for(let i = 0; i < beers.length; i++) {
    objFavorit[beers[i].id] = beers[i].id;
  }

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <ul className="list-beers">
          {items.map((item) => {
            if(objFavorit[item.id]) {
              return(
                <li className="list-beers__item" key={item.id}>
                  <Link className="list-beers__link" to={`/catalog_beers_${page}/${item.name}`} >
                    <img src={item.image_url} alt={item.name} width={75} height={200}/>
                    <h2 className="list-beers__title">{item.name}</h2>
                  </Link>
                  <span>{item.abv} %</span>
                  <button className="list-beers__button list-beers__button--active">в избранном</button>
                </li>
              );
            } else {
              return(
                <li className="list-beers__item" key={item.id}>
                  <Link className="list-beers__link" to={`/catalog_beers_${page}/${item.name}`} >
                    <img src={item.image_url} alt={item.name} width={75} height={200}/>
                    <h2 className="list-beers__title">{item.name}</h2>
                  </Link>
                  <span>{item.abv} %</span>
                  <button className="list-beers__button"
                    onClick={() => {
                      localStorage.setItem(`${item.name}`, JSON.stringify(item));
                      setActive(!isActive);
                    }}
                  >Добавить в избранное
                  </button>
                </li>
              );
            }})}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default ListBeers;
