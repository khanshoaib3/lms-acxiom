import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./components/auth/SignUp"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/sign-up" element={<SignUp />}/>
          {/* <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
