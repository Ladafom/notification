import { NotificationManager } from './components/NotificationManager';
import { useServiceWorker } from './hooks/useServiceWorker';
import './App.css';

function App() {

  useServiceWorker();

  return (
    <NotificationManager/>
  )
}

export default App