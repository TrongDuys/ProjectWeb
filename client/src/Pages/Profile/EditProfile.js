import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    makeStyles,
    MenuItem,
    TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Close } from '@material-ui/icons';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileUser } from '../../Redux/Action/profileAction';

  const useStyles = makeStyles((theme) => ({
    textfield: {
      marginBottom: theme.spacing(1),
    },
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    btn: {
      margin: '0 15px',
    },
    text: {
      color: 'grey',
    },
  }));

function EditProfile({setEdit}) {
    const classes = useStyles();
  const dispatch = useDispatch();
  const inititalState = {
    firstname: '',
    lastname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    role: '',
  };
  const [userData, setUserData] = useState(inititalState);
  const { firstname,lastname, mobile, address, story, role } = userData;
  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');

  const { auth, alert } = useSelector((state) => state);

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleClose = () => {
    setEdit(false);
  };
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    
    setAvatar(file);
  };
 
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData)
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };
    return (
        <div>
          <Dialog open={true}>
            {/* {alert.loading && <LinearProgress />} */}
            <IconButton onClick={handleClose} className={classes.close}>
              <Close />
            </IconButton>
            <form onSubmit={handleSubmit}>
              <DialogContent className={classes.conten}>
                <div className="user" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                  <img width="100px" style={{borderRadius: '50%'}}  src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="img" />
                  <span className="icon">
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      accept="image/*"
                      onChange={handleChangeAvatar}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file_up" style={{position: 'absolute', bottom: '-12px', left: '52%'}}>
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {/* </Button> */}
                  </span>
                </div>
    
                <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
                  <InputLabel htmlFor="outlined-adornment-password">First Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    className={classes.textfield}
                    label="FirstName"
                    name="firstname"
                    fullWidth
                    variant="outlined"
                    value={firstname}
                    onChange={handleInput}
                    endAdornment={
                      <InputAdornment className={classes.text} position="end">
                        {firstname.length}/25
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined" style={{ marginTop: '30px', marginBottom: 0 }}>
                  <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    className={classes.textfield}
                    label="LastName"
                    name="lastname"
                    fullWidth
                    variant="outlined"
                    value={lastname}
                    onChange={handleInput}
                    endAdornment={
                      <InputAdornment className={classes.text} position="end">
                        {lastname.length}/25
                      </InputAdornment>
                    }
                  />
                </FormControl>
    
                <TextField
                  className={classes.textfield}
                  label="Mobie"
                  name="mobile"
                  fullWidth
                  variant="outlined"
                  value={mobile}
                  onChange={handleInput}
                />
                <TextField
                  className={classes.textfield}
                  label="Address"
                  name="address"
                  fullWidth
                  variant="outlined"
                  value={address}
                  onChange={handleInput}
                />
               
    
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Story</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    className={classes.textfield}
                    multiline
                    rows={3}
                    maxRows={10}
                    label="Story"
                    name="story"
                    fullWidth
                    variant="outlined"
                    value={story}
                    onChange={handleInput}
                    endAdornment={
                      <InputAdornment className={classes.text} position="end">
                        {story.length}/200
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <TextField
                  className={classes.textfield}
                  fullWidth
                  select
                  label="Role"
                  name="role"
                  id="role"
                  value={role}
                  onChange={handleInput}
                  variant="outlined"
                >
                  <MenuItem value="Chuyên gia nông nghiệp">Chuyên gia nông nghiệp</MenuItem>
                  <MenuItem value="Chuyên gia công nghệ">Chuyên gia công nghệ</MenuItem>
                  <MenuItem value="Nhà nông">Nhà nông</MenuItem>
                </TextField>
              </DialogContent>
              <DialogActions className={classes.btn}>
                <Button disabled={alert.loading} color="primary" mg={1} type="submit" fullWidth variant="contained">
                  Lưu thay đổi
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      );
}

export default EditProfile;