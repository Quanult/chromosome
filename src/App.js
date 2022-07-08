import React, {useState /*, useEffect*/} from 'react'
import CanvasDraw from "react-canvas-draw"

function App() {
  // const [data, setData] = useState([{}])
  
  // useEffect(() => {
  //   fetch('/members').then(
  //     res => res.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])


  // return (
  //   <div>
  //       {(typeof data.members === 'undefined') ?
  //       (<p> Loading....</p>) : (data.members.map((member, i)=> (
  //         <p key ={i}> {member}</p>
  //         ))
  //       )} 
  //   </div>
  // )
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    setLoading(true)
    const res = await fetch(
      '	/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = files[0]//await res.json()
    //console.log(file)
    file.preview = URL.createObjectURL(file)
    setImage(file.preview)
    console.log(file)
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        id= "file"
        accept='image/*'
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} />
      )}
      <div>
        <CanvasDraw imgSrc={image} lazyRadius={0} brushRadius={2} onChange/>
      </div>
    </div>
  )
}

export default App