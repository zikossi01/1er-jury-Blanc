import Projects from '../components/projects/Projects'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from '../components/tasks/Tasks';
import Resources from '../components/resources/Resources';

const Home = () => {
    return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Projects />}/>
          <Route path="/Tasks" element={<Tasks />}/>
          <Route path='/resources' element={<Resources/>}/>
      </Routes>
    </BrowserRouter>
    )
}

export default Home