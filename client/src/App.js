import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import { Box } from '@mui/material'

//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider, { LoginContext } from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import Flipgem from './Components/Flipgem';
import Coupon from './Components/Coupon';
import RulesPage from './Components/RulesAndRegulations/RulesAndRegulations';
import { useContext, useEffect } from 'react';
import TokenIssuePortalForm from './Components/TokenIssuer';
import About from './Components/About';
import Dashboard from './Components/DashboardHtml/Dashboard';

function App() {
  const {account,setaccount} = useContext(LoginContext);
  // const account = null
  return (
    <TemplateProvider>
     
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path= '/flipgem' element={account?<Dashboard/>:<Navigate to="/"/>} />
              <Route path= '/coupons' element={<Coupon />} />
              <Route path= '/rulesandregulations' element={<RulesPage />} />
              <Route path= '/issueToken' element={<TokenIssuePortalForm />} />
              <Route path= '/about' element={<About />} />
            </Routes>
          </Box>
        </BrowserRouter>
    </TemplateProvider>
  );
}

export default App;
