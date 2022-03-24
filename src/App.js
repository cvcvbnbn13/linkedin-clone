// import { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import { useEffect } from 'react';
import { useActions } from './hooks/useActions';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppLoading from './components/AppLoading';
import { auth } from './firebase';

function App(props) {
  const { getUserAuth } = useActions();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    getUserAuth();
  }, []);

  return (
    <div className="App">
      {loading && <AppLoading show={true} />}
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
