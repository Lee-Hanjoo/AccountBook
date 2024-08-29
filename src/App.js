import './App.css';
import {Context, MyContext} from './MyContext';
import List from './pages/List'
import Insert from './pages/Insert'
import { Home } from './pages/Home';

function App() {
  return (
    <Context>
      <Home />
    </Context>
  );
}




export default App;
