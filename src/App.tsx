import { Game } from './components/Game';

function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          height: '100%',
          maxHeight: '540px',
          position: 'relative',
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        <Game />
      </div>
    </div>
  );
}

export default App;
