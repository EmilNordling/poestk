import { Instantiation } from 'one-atom';
import ReactDOM from 'react-dom';
import { ApplicationService } from './backend/application_service';
import App from './components/app.component';
import { Dev } from './components/dev.component';

const service = Instantiation.resolve(ApplicationService);
service.boot();

ReactDOM.render(
  <Dev.h>
    <App />
  </Dev.h>,
  document.getElementById('root'),
);
