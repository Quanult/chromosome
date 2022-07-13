import React, {useState /*, useEffect*/} from 'react'
//import CanvasDraw from "react-canvas-draw"
import { HiPlus } from "@react-icons/all-files/hi/HiPlus";
import Draggable from 'react-draggable';
import SortableList, { SortableItem } from 'react-easy-sort'
import arrayMove from 'array-move'
import './App.css'


function App() {
  const colorList = ['red', 'yellow', 'cyan', 'lime', 'orange', 'pink', 'violet', 'blue', 'green', 'salmon' ]
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
  const [coordinate, setCoordinate] = useState([])
  //const [ClientY, setClientY] = useState('')


  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    const res = await fetch(
      '	/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = files[0]
    const predict_coor = await res.json()
    console.log(predict_coor['members'])
    file.preview = URL.createObjectURL(file)
    setImage(file.preview)
    //console.log(file)
    setCoordinate([])
  }

  //const img = document.querySelector("myImage")
  function getCoordinate(e) {
    // Get the target
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoordinate([...coordinate,[x , y]])
    console.log(x + ' : ' + y);
  //return [x, y];
}    
  function draw_pointer(){
    const image_coor = document.getElementById('myImage').getBoundingClientRect()
    const x = image_coor.top
    const y = image_coor.left
    return [x, y]
  }

  const onSortEnd = (oldIndex , newIndex) => {
    setCoordinate((array) => arrayMove(array, oldIndex, newIndex))
  }

  var updateCoordinate = (e, position, i) =>{
    // const target = e.target
    // const rect = target.getBoundingClientRect();
    // const x = rect.top
    // const y = rect.left
    // const updateCoordinate = coordinate
    // updateCoordinate[i] = [x, y]
    // setCoordinate(updateCoordinate)
    const x = position.x;
    const y = position.y;
    const updateCoordinate = coordinate;
    updateCoordinate[i] = [x, y];
    setCoordinate(updateCoordinate);
  }


  // move the point
  

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
      
      <img src={image} alt=''/>
      
      {/* <div >

        <CanvasDraw imgSrc={image} lazyRadius={0} brushRadius={2} disabled={true}/>
      </div> */}
      <div>
        <img id ='myImage'src ={image} onClick={getCoordinate} alt=''/>
        {
          coordinate.map( (coor, i) => {
            const offset = draw_pointer();
            console.log(offset);
            console.log(coor);
            return <Draggable key={String(coor)} position={{x: Math.round(coor[0]), y: Math.round(coor[1])}} onDrag={updateCoordinate}><HiPlus color={colorList[i]} style={{position: 'absolute', top: offset[0]-7, left: offset[1]-7 }}/></Draggable>
          })
        }
      </div>
      <SortableList onSortEnd={onSortEnd} className="list" draggedItemClassName="dragged">
        
        {coordinate.map((item, i) => (
        <SortableItem key={item}>
        <div className="coordinateShow">{item.toString()} ({i+1})</div>
        
      </SortableItem>
      ))}
    </SortableList>
      <div> 
        Coordinate: 
        {coordinate.map((coor, i) => 
        i === 0 ? '[ ' + coor.toString() + ' ]' +'('+String(i+1)+')' :', [ ' + coor.toString() + ' ]'+'('+String(i+1)+')')} 
      </div>
      <h3> Lets go for a <Draggable ><HiPlus color='yellow' /></Draggable>? </h3>
    
    </div>
  )
}
//<Draggable defaultPosition={{x:100, y:100}}><HiPlus color='yellow' /></Draggable>
export default App