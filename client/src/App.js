import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import CreateTask from './pages/CreateTask';
import ViewAllTask from './pages/ViewAllTask';
import ViewTask from './pages/ViewTask';
import Wallet from './pages/Wallet';
import DeleteTask from './pages/DeleteTask';
import Updatetask from './pages/Updatetask';
import Navigation from './pages/Navigation';
function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,

  });


  const saveState = ({ web3, contract, account }) => {
    setState({ web3, contract, account })
  }



  return (
    <div className='App ' style={{ margin: '10px' }}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<ViewAllTask />} />
          <Route path="/create" element={<CreateTask state={state} />} />
          <Route path="/view" element={<ViewTask />} />
          <Route path="/delete/:id" element={<DeleteTask state={state} />} />
          <Route path="/update/:id" element={<Updatetask state={state} />} />
          <Route path="/wallet" element={<Wallet saveState={saveState} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
