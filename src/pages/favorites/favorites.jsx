import React, { useState } from "react";
import Header from "/src/components/base/header/header";
import  "./style.css";
import { IonPage, IonContent } from '@ionic/react';

function Favorites() {

  const [count, setCount] = useState(localStorage.length);

  const beers = [];

  if(localStorage.length) {
    for(let i = 0; i < localStorage.length; i++) {
      const nameBeer = localStorage.key(i);
      const objBeer = localStorage.getItem(nameBeer);
      beers.push(JSON.parse(objBeer));
    }
  }

  return(
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
          <section className="favorites">
            <span className="favorites__count">Все {count}</span>
            <ul className="favorites__list">
              {beers.length ?
                beers.map((beer, index) => {
                  return(
                    <li className="favorites__item" key={index}>
                      <img src={beer.image_url} alt={beer.name} width={75} height={200}/>
                      <h2 className="favorites__title">{beer.name}</h2>
                      <span>{beer.abv} %</span>
                      <button className="favorites__button"
                        onClick={() => {localStorage.removeItem(beer.name);
                        setCount(count - 1);
                        }}>
                        Удалить
                      </button>
                    </li>
                  );
                })
                :
                <li>
                  <p>
                    У вас нет избранного пива!
                  </p>
                </li>
              }
            </ul>
          </section>
      </IonContent>
    </IonPage>
  );
}

export default Favorites;
