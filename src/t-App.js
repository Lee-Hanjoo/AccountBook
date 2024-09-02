
import {AccountState} from './AccountState';
import './App.css';
import AccountList from './component/AccountList';
import Chart from './component/Chart';

function App() {
  return (
    <AccountState>
      <AccountList/>
      <Chart/>        
    </AccountState>
  );
}

export default App;
