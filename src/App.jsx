
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function InterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [interest, setInterest] = useState(null);
  const [amount, setamount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [daysDifference, setDaysDifference] = useState(0);
 

  const handleStartDateChange = (date) => {
    setStartDate(date);
    calculateDaysDifference(date, endDate);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateDaysDifference(startDate, date);
  };
  const calculateDaysDifference = (start, end) => {
    if (start && end) {
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setDaysDifference(Math.round(differenceInDays));
    } else {
      setDaysDifference(0);
    }
  };
  const calculateInterest = () => {
    const p = parseFloat(principal);
    const t = parseFloat(daysDifference)/3000;
    var r;
    if (daysDifference < 31){
      r=1.5;
    }else  if (daysDifference < 91){
      r=1.75;
    }else  if (daysDifference < 181){
      r=2;
    }else  {
      r=2.25;
    }
    const calculatedInterest = (p * r *t).toFixed(2);
    const  amount = p + (p * r *t);
    setamount(amount);
    setInterest(calculatedInterest);  
  };

  
  return (
    <Grid
    container
    justifyContent="center"
    alignItems="center"
     >

     <Box height={500}
         width={350}
          my={4}
          gap={4}
          p={2}
          sx={{ border: '2px solid grey' ,  bgcolor: 'red', color: 'white',fontWeight:'bold'
         }}>

      <Stack 
             direction="column"
             justifyContent="center"
             alignItems="center"
             spacing={4}
      >
      <h1>MF</h1>
      <div>
        <label htmlFor="principal">Principal (P): </label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div sx={{p:(2)}}>
        <label>
      Start Date:
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select start date"
      />
      </label>
      </div>
      <div>
      <label>
       End Date:
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select end date"
      />
      </label>
      </div>
      {startDate && endDate && (
        <p><label>Number of Days:{daysDifference} </label> </p>
        
      )}
    
      <Button onClick={calculateInterest} sx={{bgcolor:'green', color: 'white',fontWeight:'bold' }}>Calculate Interest</Button>
      {interest && (
        <div>
          <Typography sx={{bgcolor:'blue', color: 'white',fontWeight:'bold', padding: 2 }}>Interest: RS:{interest}</Typography>
          <Typography sx={{bgcolor:'purple', color: 'white',fontWeight:'bold', padding: 2  }}>Amount RS: {amount}</Typography>
        </div>
      )}
    
    </Stack>
    </Box>
    </Grid> 
  );
}

export default InterestCalculator;


  /* 
    const [multiplier, setMultiplier] = useState(1);

      const handleMultiplierChange = (event) => {
    const value = parseFloat(event.target.value);
    setMultiplier(value);
   
  };

  <label>
            Rate:
            <input
              type="number"
              value={multiplier}
              onChange={handleMultiplierChange}
            />
          </label>
   */
 