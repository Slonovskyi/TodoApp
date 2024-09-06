import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import { styled } from '@mui/material/styles';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export const MoodCheck = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImg, setCurrentImg] = useState(null)

  useEffect(() => {
    // Fetch images from the server only once
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.imgflip.com/get_memes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setImages(data.data.memes);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  // Select a random image URL
  const getRandomImageUrl = () => {
    if (images.length === 0) return ''; // Prevents errors if images are not yet loaded
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].url;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setResponse(null);
  };

  const handleMoodResponse = (mood) => {
    setResponse(mood);
  };

  const handleChangeImg = () => {
    setCurrentImg(getRandomImageUrl())
  }

  return (
    <div>
      <IconButton onClick={handleOpen} color="primary">
        <MoodIcon />
        <Typography variant="button">Check Me</Typography>
      </IconButton>

      <CustomDialog open={open} onClose={handleClose}>
        {!response && <DialogTitle>Do you have a good mood?</DialogTitle>}
        <DialogContent>
          {!response && (
            <div>
              <Button onClick={() => handleMoodResponse('happy')} variant="contained" color="primary" style={{ marginRight: '20px' }} >               
                Yes
              </Button>
              <Button onClick={() => handleMoodResponse('funny')} variant="outlined" color="secondary">
                No
              </Button>
            </div>
          )}
          {response === 'happy' && (
            <div>
              <img src={getRandomImageUrl()} alt="Happy Mood" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="h6">Nice to hear that!</Typography>
            </div>
          )}
          {response === 'funny' && (
            <div>
              <img src={getRandomImageUrl()} alt="Funny Mood" style={{ width: '100%', borderRadius: '8px' }} />
              <Typography variant="h6">Maybe this will help you to have a good mood!</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleChangeImg} color="secondary">More meme </Button>
            <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};
