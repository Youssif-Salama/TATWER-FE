import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Contract from './pages/Contract';
import CreateContractAddress from './components/contracts/createAddress/CreateContractAddress';
import CreateContractFiles from './components/contracts/createFiles/CreateContractFiles';
import AllContracts from './components/contracts/allContracts/AllContracts';
import Create from './components/contracts/createContract/Create';
import CreateContract from './components/contracts/createContract/CreateContract';
import Systems from './pages/Systems';
import Settings from './pages/Settings';
import TaxCollection from './components/settings/tax/TaxCollection';
import PaymentCollection from './components/settings/ payment/ PaymentCollection';
import Estate from './pages/Estate';
import AllEstates from './components/estates/allEstates/AllEstates';
import Create2 from './components/estates/createEstate/Create2';
import CreateEstate from './components/estates/createEstate/CreateEstate';
import CreateEstateAddress from './components/estates/createAddress/CreateEstateAddress';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="systems" element={<Systems />} />
            <Route path="settings" element={<Settings />} >
              <Route index element={<TaxCollection />} />
              <Route path="payment" element={<PaymentCollection />} />
            </Route>
            <Route path="contracts" element={<Contract />}>
              <Route index element={<AllContracts />} />
              <Route path="create" element={<Create />}>
                <Route index element={<CreateContract />} />
                <Route path="address" element={<CreateContractAddress />} />
                <Route path="files" element={<CreateContractFiles />} />
              </Route>
            </Route>
            <Route path="estates" element={<Estate />}>
              <Route index element={<AllEstates />} />
              <Route path="create" element={<Create2 />}>
                <Route index element={<CreateEstate />} />
                <Route path="address" element={<CreateEstateAddress />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
