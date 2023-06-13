import logo from './logo.svg';
import './App.css';
import MyMap from './common/components/mapSample.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <MapComponent/> 
        </a>
        <MyMap />
      </header>
    </div>
  );


}

const MapComponent = () =>{
  return(<div>
    I am the map
    </div>)

}


export default App;