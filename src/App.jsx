import { useContext, useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import Form from "./components/Form"
import { DataContext } from "./lib/DataContext"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Search from "./components/Search"

function App() {
  const { data: initialData, setData } = useContext(DataContext) ?? {}
  const [data, setLocalData] = useState(initialData)
  const [title, setTitle] = useState("")
  const [titleValid, setTitleValid] = useState(true)
  const [body, setBody] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    setLocalData(initialData)
  }, [initialData])

  const submitHandler = (e) => {
    e.preventDefault()
    if (title.length > 50) {
      toast.warning('Input harus kurang dari 50 karakter', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return
    }

    let newData = {
      id: self.crypto.randomUUID(),
      title: title,
      body: body,
      createdAt: +new Date(),
      archived: false
    }

    setData([...initialData, newData])
    setLocalData([...data, newData])

    toast.success('Data Berhasil Ditambahkan!!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

    setTitle("")
    setBody("")
  }

  const deleteHandler = (id) => {
    const updatedData = data.filter(item => item.id !== id)
    setData(updatedData)
    setLocalData(updatedData)
    toast.success('Data Berhasil Dihapus!!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  const handleArchive = (id) => {
    const updatedData = data.map(item => {
      if (id === item.id) {
        const newItem = { ...item, archived: !item.archived }
        item.archived ?
          toast.success('Data Berhasil Dipindahkan Ke Halaman Utama!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }) :
          toast.success('Data Berhasil Diarsipkan!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        return newItem
      }
      return item
    })
    setData(updatedData)
    setLocalData(updatedData)
  }

  const titleHandler = (e) => {
    const inputValue = e.target.value
    if (inputValue.length > 50) {
      toast.warn('Data Tidak Boleh Lebih dari 50 karakter!!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setTitleValid(false)
    } else {
      setTitleValid(true)
    }
    setTitle(inputValue)
  }

  const handleTextSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {
    const filteredData = initialData.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    setLocalData(filteredData)
    
    if (filteredData.length > 0) {
      toast.success(`Data ditemukan`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    } else {
      toast.info('Data tidak ditemukan', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }
  }

  const handleResetSearch = () => {
    setSearch("")
    setLocalData(initialData)
    toast.info('Pencarian telah direset.', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="hero bg-base-200 min-h-fit flex flex-col justify-start pt-10">
        <Search
          onSearch={handleSearch}
          onChangeSearch={handleTextSearch}
          searchValue={search}
        />
        {search !== "" && (
          <button onClick={handleResetSearch} className="btn btn-primary mt-5">Reset Search</button>
        )}
      </div>

      <div className="hero bg-base-200 min-h-fit flex flex-col justify-start">
        <div className="hero-content">
          <Form
            onSubmit={submitHandler}
            onChangeTitle={titleHandler}
            onChangeBody={(e) => setBody(e.target.value)}
            titleValue={title}
            bodyValue={body}
            char={50 - title.length}
          >
            <button type="submit" disabled={!titleValid} className="btn btn-primary">Submit</button>
          </Form>
        </div>
      </div>

      <div className="hero bg-base-200 min-h-fit flex flex-col justify-start items-center w-full ">
        <div>
          <h2 className="self-start font-semibold text-2xl my-5 mx-5">Catatan Anda</h2>
          <div className="hero-content flex flex-wrap justify-center min-w-fit items-center gap-5 border border-primary rounded-3xl lg:justify-start md:items-start">
            {data && data.filter(item => !item.archived).length > 0
              ? data.filter(item => !item.archived).map((item) =>
                  <Card
                    key={item.id}
                    archiveButton={() => handleArchive(item.id)}
                    deleteButton={() => deleteHandler(item.id)}
                    isArchive={"Arsipkan"}
                    {...item}
                  />
                )
              : <p>Tidak Ada Catatan</p>
            }
          </div>
        </div>

        <div>
          <h2 className="self-start font-semibold text-2xl my-5 mx-5">Arsip Anda</h2>
          <div className="hero-content flex flex-wrap justify-start items-start gap-5 border border-primary rounded-3xl lg:justify-start md:items-start">
            {data && data.filter(item => item.archived).length > 0
              ? data.filter(item => item.archived).map((item) =>
                  <Card
                    key={item.id}
                    archiveButton={() => handleArchive(item.id)}
                    deleteButton={() => deleteHandler(item.id)}
                    isArchive={"Buka Arsip"}
                    {...item}
                  />
                )
              : <p>Tidak Ada Catatan yang diarsipkan</p>
            }
          </div>
        </div>

        <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-5">
          <aside>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by BikraDev</p>
          </aside>
        </footer>
      </div>
    </>
  )
}

export default App