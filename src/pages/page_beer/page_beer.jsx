import React, { useEffect } from "react";
import { useParams } from "react-router";
import "./style.css";
import Header from "../../components/base/header/header";
import { IonPage, IonContent } from '@ionic/react';

function PageBeer({ items }) {

  useEffect(() => {
    const page = document.querySelector(".ion-page.ion-page-invisible");
    page.classList.add("can-go-back");
    page.classList.remove("ion-page-invisible");
    page.style.zIndex = "101";
  }, []);

  const activeUrl = useParams();
  const beer = items.find((item) => item.name === activeUrl.id);

    return (
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <div className="page-beer">
            <img src={beer.image_url} alt={beer.name} width={75} height={200}/>
            <h2 className="page-beer__title">{beer.name}</h2>
            <span>{beer.abv} %</span>
            <span>Дата первой варки: {beer.first_brewed}</span>
            <h3 className="page-beer__title-list">Ингридиенты:</h3>
            <ul className="page-beer__list">
              <li>Солод: {beer.ingredients.malt[0].name}</li>
              <li>Хмель: {beer.ingredients.hops[0].name}</li>
              <li>Дрожжи: {beer.ingredients.yeast}</li>
            </ul>
          </div>
        </IonContent>
      </IonPage>
    );
}


export default PageBeer;
