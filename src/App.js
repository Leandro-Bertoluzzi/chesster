// Styles
import './App.css';
// Widgets
import './widgets/Board';
import Board from './widgets/Board';
import './widgets/MovementsList';
import MovementsList from './widgets/MovementsList';

function App() {
  return (
    <div className="App">
      <Board size="8" />
      <MovementsList />
    </div>
  );
}

export default App;
