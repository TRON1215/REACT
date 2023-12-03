import {Route,Routes,useNavigate} from 'react-router-dom'
// import { About } from './components/About'
// import { Home } from './components/Home'
// import { Header } from './components/Header'
import { Home,About,Header,Tasks,Todo } from './components'
import {ToastContainer} from 'react-toastify'
import { Footer } from './components/layout/Footer'
function App() {
//  const navigate=useNavigate()

// const handleAboutClick= ()=>{
//   navigate('/About');
// };


  return (
    <>
      <Header/>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/todo/:todoId" element={<Todo />} />

      </Routes>
      <Footer/>
      {/* <button onClick={handleAboutClick}>To About</button> */}
    </>
  )
}

export default App
