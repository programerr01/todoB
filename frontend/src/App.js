import './App.css';
import {BrowserRouter as Router,Routes, Switch, Route,  } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import TodosPage from './components/TodosPage';

function App() {
  return (
    <Router>
      
      <Layout>
        <Routes>
          <Route exact path="/" Component={LandingPage} />
          <Route exact path="/todos" Component={TodosPage} />

        </Routes>

      </Layout>
    </Router>
  );  
}

export default App;
