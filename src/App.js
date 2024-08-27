import './App.css';
import {Context, MyContext} from './MyContext';
import List from './pages/List'
import Insert from './pages/Insert'

function App() {
  return (
    <Context>
      <List />
      <Insert />
    </Context>
  );
}




export default App;
