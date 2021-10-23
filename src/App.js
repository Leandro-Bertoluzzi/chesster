// Styles
import './App.css';
// Widgets
import Board from './widgets/Board';
import MovesList from './widgets/MovesList';

function App() {
  return (
    <div className="Chesster">
      <Board size="8" />
      <MovesList />
    </div>
  );
}

export default App;
