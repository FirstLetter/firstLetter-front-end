import React, {userState} from 'react';
import logo from './logo.svg';
import './App.css'
import {useRoutes} from 'hookrouter'
import {useLoginContext} from 'context'
import { routes } from 'routes';
import { NotFoundPage } from 'components/NotFound/NotFoundPage';
import { Footer } from 'components/Footer/Footer';

function App() {
  const routeResult = useRoutes(routes)
  
  return (
  <div className="px-0 app-bg-main container-fluid h-100">
    {routeResult || <NotFoundPage />}
    <Footer />
  </div>)
}

export default App;
