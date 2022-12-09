import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../context/UserContext';

function ReviewCard({review, onDelete}) {
    const user = useContext(UserContext).user;
  return (
        <Accordion sx={{width:"100%"}}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography>{review.title}</Typography>
        <Rating name="read-only" value={review.rating} readOnly />
        {user && user._id === review.user && <button onClick={() => onDelete(review._id)}>Delete</button>}
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {review.text}
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default ReviewCard