import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { NotificationProvider } from './tools/context/notification.context';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
