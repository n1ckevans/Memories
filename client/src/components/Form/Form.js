import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostdata] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) setPostdata(post);
  }, [post])

  const handleSubmit = (e) => {
      e.preventDefault();

      if(currentId){
        dispatch(updatePost(currentId, postData));
      } else {
        dispatch(createPost(postData));
      }
      
      clear();  
  }

  const clear = () => {
    setCurrentId(null);
    setPostdata({creator: '', title: '', message: '', tags: '', selectedFile: ''});
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing ${postData.title}` : `Creating a Memory`}</Typography>
        <TextField 
          name="creator" 
          variant="outlined" 
          label="Creator" 
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostdata({ ...postData, creator: e.target.value })}
        />
        <TextField 
          name="title" 
          variant="outlined" 
          label="Title" 
          fullWidth
          value={postData.title}
          onChange={(e) => setPostdata({ ...postData, title: e.target.value })}
        />
        <TextField 
          name="message" 
          variant="outlined" 
          label="Message" 
          fullWidth
          value={postData.message}
          onChange={(e) => setPostdata({ ...postData, message: e.target.value })}
        />
        <TextField 
          name="tags" 
          variant="outlined" 
          label="Tags" 
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostdata({ ...postData, tags: e.target.value.split(',')})}
        />
        <div className={classes.fileInput}>
          <FileBase 
            type="file"
            multiple={false}
            onDone={({base64}) => setPostdata({ ...postData, selectedFile: base64})}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

      </form>
    </Paper>
  );
}

export default Form;