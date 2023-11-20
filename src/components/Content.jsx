import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Home = () => <div>Contenido de Inicio</div>;
const Link1 = () => <div>Contenido de Enlace 1</div>;
const Link2 = () => <div>Contenido de Enlace 2</div>;

const Content = () => {
  return (
    <Container style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/link1" component={Link1} />
        <Route path="/link2" component={Link2} />
      </Switch>
    </Container>
  );
};

export default Content;
