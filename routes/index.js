var express = require('express');
var router = express.Router();

var room = []

/* GET room details. */
router.get('/room', function (req, res) {
  try {
    res.status(200).send({
      room
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal server error',
      error
    })
  }
});


/* create room */
router.post('/create', function (req, res) {
  try {
    let data = {
      roomId: req.body.roomId,
      capacity: req.body.capacity,
      amenities: req.body.amenities,
      price: req.body.price,
      bookedStatus: 'available',
      customerName: '',
      date: '',
      startTime: '',
      endTime: ''
    }
    room.push(data)
    res.status(200).send({
      message: 'Room created successfully'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal server error',
      error
    })
  }
});



/* New Booking room */
router.post('/newBooking', function (req, res) {
  try {
    let booked = false;
    room.map((e) => {
      if (e.roomId === req.body.roomId) {
        e.customerName = req.body.customerName,
          e.date = req.body.date,
          e.startTime = req.body.startTime,
          e.endTime = req.body.endTime,
          e.bookedStatus = 'Occupied'
        booked = true
      }
    })

    if (booked) {
      res.status(200).send({
        message: 'Room Booked successfully'
      })
    } else {
      res.status(401).send({
        message: 'Room Booking failed please check availability'
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal server error',
      error
    })
  }
});



/* Get Booked Room details */
router.get('/bookedRoom', function (req, res) {
  let data =[]
  try {
    room.map((e) => {
      if (e.bookedStatus == 'Occupied') {
        data.push({
        roomId:e.roomId,
        bookedStatus:e.bookedStatus,
        customerName:e.customerName,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
      }
    })
   res.status(200).send({
    data
   })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal server error',
      error
    })
  }
});





/* Get Booked Room customer details */
router.get('/bookedCustomer', function (req, res) {
  let data =[]
  try {
    room.map((e) => {
      if (e.bookedStatus == 'Occupied') {
        data.push({
        customerName:e.customerName,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
      }
    })
   res.status(200).send({
    data
   })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal server error',
      error
    })
  }
});



module.exports = router;
