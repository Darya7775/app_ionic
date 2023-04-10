import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { triangle } from 'ionicons/icons';
import ListBeers from './pages/list_beers/list_beers';
import PageBeer from './pages/page_beer/page_beer';
import Favorites from './pages/favorites/favorites';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
        })
      .catch(() => {
        alert('Не удалось загрузить данные с сервера!');
      });
  }, [])

  return(
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>

            <Route exact path="/catalog_beers_1">
              <Route render={() => <ListBeers page={1} />} />
              <Route
                path="/catalog_beers_1/:id"
                render={() => <PageBeer items={items} />}
              />
            </Route>

            <Route exact path="/catalog_beers_2">
              <Route render={() => <ListBeers page={2} />} />
              <Route
                path="/catalog_beers_2/:id"
                render={() => <PageBeer items={items} />}
              />
            </Route>

            <Route exact path="/catalog_beers_3">
              <Route render={() => <ListBeers page={3} />} />
              <Route
                path="/catalog_beers_3/:id"
                render={() => <PageBeer items={items} />}
              />
            </Route>

            <Route path="/favorites">
              <Favorites />
            </Route>

            <Route exact path="/">
              <Redirect to="/catalog_beers_1" />
            </Route>

          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/catalog_beers_1">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/catalog_beers_2">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/catalog_beers_3">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
