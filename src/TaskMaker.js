import React from 'react';
import { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Card, IconButton, Input } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import axios from 'axios';

export function TaskMaker(props){
    const [uvalue, Updateuvalue] = useState(props.data)
    const [ustatus, custatus] = useState(true)
    const Updation = ()=>{
       custatus(false)
    }
    return (
        <Card className="task" style= {{backgroundColor:"#f0e9e9"}}>
              { ustatus ?
              <span id={'task-number-'+props.index}>
              {uvalue}
              </span> :
            <Input type="text" className="inputtask" id={"inputboxof"+props.index} value={uvalue} onChange={(e)=>{
                    Updateuvalue(e.target.value)}}/>
                }
                { ustatus ?
              <span id={'edit-buttons-'+props.index}>
                <IconButton id={'pencil-number-'+props.index} onClick={()=>{Updation(props.index)}}>
                  <EditOutlined style={{color:"black"}} />
                </IconButton>
                <IconButton onClick={()=>{
                    props.onChange({'operation': 'delete', idbrowser:props.idbrowser})
                    axios.post('https://tdl-backend-sv29.herokuapp.com/deletetask',{idbrowser:props.idbrowser})
                    .then(()=>{
                        console.log('Successfully Deleted')
                    })
                    .catch((e)=>{
                      alert('Might Seem But Not Deleted. Please Refresh The Page')
                    })
                }}>
                  <DeleteIcon style={{color:"black"}} />
                </IconButton>
              </span> :
                <Button color="secondary"
                variant="contained" 
                className="updatebutton" 
                id={"update-button-of"+props.index} 
                onClick= {()=>{
                    custatus(true)
                    axios.post('https://tdl-backend-sv29.herokuapp.com/updatetask',{idbrowser:props.idbrowser,uvalue:uvalue})
                    .then(()=>{
                      console.log('Successfully Updated')
                    })
                    .catch((e)=>{
                      alert('Might Seem But Not Updated. Please Refresh The Page')
                      console.log(e)
                    })
                }}
                >Update</Button>
              }
          </Card>
    )
}