import './App.css';
import { Button, Typography, Card, Input } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import axios from 'axios';

// import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { TaskMaker } from './TaskMaker';
import { useEffect } from 'react';
import { IntersectingCirclesSpinner } from 'react-epic-spinners';

function App() {
  const [tasks,modifytasks] = useState([])
  const [newdata,modifynewdata] = useState('')
  const [outputtask,changeotask] = useState([])
  const [loading, setLoading] = useState(true)
  const toUpdate = useRef(true)
  const initialDataFetch = useRef(true)
  const handleSubmit = (e)=>{
    if(!newdata)return;
    const newtask = {idbrowser: new Date().getTime().toString(),data:newdata}
    modifytasks([...tasks, newtask]);
    modifynewdata('');
    toUpdate.current = true
    axios.post('https://tdl-backend-sv29.herokuapp.com/addtask',{...newtask})
    .then(()=>{
        console.log('Successfully Added')
    })
    .catch((e)=>{
      alert(e)
    })
  }
  useEffect(()=>{
    if(initialDataFetch.current){
      axios.get('https://tdl-backend-sv29.herokuapp.com/readtasks')
      .then((res)=>{
        modifytasks([...res.data])
        setLoading(false)
      })
      .catch((e)=>{
        alert(e)
      })
      initialDataFetch.current = false
    }
    else if(toUpdate.current){
    changeotask(tasks.map((i,index)=>{
      return <TaskMaker data={i.data} key={i.idbrowser} index={index} idbrowser={i.idbrowser} onChange={(value)=>{
        if(value.operation === 'delete'){
          const updated = tasks.filter((ind)=>{
              return ind.idbrowser!==value.idbrowser
          })
          modifytasks(updated)
          toUpdate.current = true
        }
      }}/>
    }))
    toUpdate.current = false
  }
  }, [tasks])
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h3" style={{color: '#b1006a', marginTop:'3%'}} align="center">
        Todo List
        </Typography>
      </header>
      <Card className="input-method">
      <Input type="text" className="inputtask" placeholder="Write Your Task Here"  inputProps={{ maxLength: 80 }} value={newdata} onChange={(e)=>{
        modifynewdata(e.target.value)
      }
      } onKeyPress= {(e)=>{if(e.key === "Enter"){handleSubmit()}}}></Input>
      <Button variant="contained" color="secondary"  endIcon={<AddCircle />} onClick={handleSubmit}>Add Task</Button>
      </Card>
      <Card className="task-list">
        { (loading) ? 
        <IntersectingCirclesSpinner color="#ff1d5e" style={{margin:'0px auto'}} /> :
         (tasks.length === 0) ?
        <Typography variant="h5" style={{color: '#b1006a'}} align="center">
        Add your First Task in the list now. 😁
        </Typography>
         :
         <span>{outputtask}</span>
        }
      </Card>
    </div>
  );
}

export default App;
