import React, {useState} from 'react';
import agent from '../../agent';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {
 COMMUNITY_SUBMITTED,
} from '../../constants/actionTypes';


export default function Community() {
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const onSubmit = e => {
    e.preventDefault();
    const community = {
      name,
      description
    }
    dispatch({type: COMMUNITY_SUBMITTED, payload: agent.Communities.create(community)})
    console.log(community)
    // dispatch(attemptLogin(values)).catch((error) => {
    //   if(error.response) {
    //     setServerError(error.response.data.message);
    //   }
    // });
     
  };
  // const submitForm = ev => {
  //   ev.preventDefault();
   

  //   // const slug = { slug: this.props.articleSlug };
  //   // const promise = this.props.articleSlug ?
  //   //   agent.Articles.update(Object.assign(article, slug)) :
  //   //   agent.Articles.create(article);

  //   // this.props.onSubmit(promise);
  // };
    return (
      <div className="editor-page max-w-3xl mx-auto">
         <p className="text-2xl font-bold text text-center mt-4 ">Create Community</p> <br/>     
         <Divider />
         <br/> 
              <form >
              
                <TextField id="outlined-basic" label="Community Name" variant="outlined" value={name}
                     name="name" fullWidth onChange={e=> setName(e.target.value)}   required/>
                <br/>  <br/>
                <TextField id="outlined-basic" label="description" variant="outlined" value={description}
                       name="description" onChange={e => setDescription(e.target.value)} fullWidth   required/>
                <br/>
               
                  <br/> 
                  <p className="text-right">
                  <Button variant="contained"   
                 onClick={onSubmit} color="primary" 
                    >
                    Publish Community
                  </Button>
                  </p>
              </form>

            </div>
       
    );
  }


