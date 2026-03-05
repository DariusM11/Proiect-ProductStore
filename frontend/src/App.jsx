import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import NavBar from "./components/NavBar"


function App() {

  return (
    <>
      <Box minH={"100vh"} bg={{ base: "gray.100", _dark: "gray.900" }}>
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
        <Toaster />
      </Box>
    </>
  )
}

export default App
