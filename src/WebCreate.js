import SampleCreateEdit from './pages/SampleCreateEdit';
import SampleList from './pages/SampleList';
import SampleShare from './pages/SampleShare';
import Header from './components/Header';
import Footer from './components/Footer';
import './starterstyles.css';

function App() {
  return (
    <>
      <Header />
      {/* <SampleCreateEdit /> */}
      {/* <SampleList /> */}
      {/* <SampleShare /> */}
      <SampleCreateEdit />
      
      <Footer />
    </>
  );
}

export default App;
