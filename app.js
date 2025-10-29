const express=require('express')
const app=express()
app.use(express.json())

  let events =[];
events.push({title:"hackathon",
  desc:"fun event"
  ,capacity:50,
  date:new Date("2023-09-15"),
});

events.push({
  title: " hackathon",
  desc: "fun event",
  capacity: 30,
  date: new Date("2023-09-15"),
})
events.push({
  title: " tic tack toe",
  desc: "fun event",
  capacity: 30,
  date: new Date("2023-09-15"),
})
console.log(events);

app.post('/events',(req,res)=>{             // /events ->server path or end point name
  const title=req.body.title;
 const desc=req.body.desc;
  const capacity=req.body.capacity;
  const date=req.body.date;
    console.log(title)
    console.log(desc)
    console.log(capacity)
    console.log(date)
 

    events.push({
       title,
       desc,
       capacity,
      date,
    })
  
     res.send(200)
})


app.delete('/delete',(req,res)=>{
  let title=req.body.title;
  events=events.filter(event=>event.title!=title);
  console.log(events);  //filter method to filter based
  res.send(200);
});
app.put('/put',(req,res)=>{
  let up=req.body.up;
  let findIndex=events.findIndex((event)=> up.title===event.title);
  console.log(findIndex);
  events[findIndex]=up;  
  //findIndex method to find index based on title
  console.log(events);
  res.send(200);
});




let bookings=[{
  id:1,
  name:"deepthi",
  email:"deepthi@gmail.com",
  eventTitle:"hackathon"
},
{
  id:2,
  name:"acharya",
  email:"acharya@gmail.com",
  eventTitle:"treasurehunt"
}];

app.get('/api/bookings',(req,res)=>{
  res.json(bookings.map(booking=>({
    id:booking.id,
    name:booking.name,
    email:booking.email,
    eventTitle:booking.eventTitle
  })));
});

app.post('/api/bookings',(req,res)=>{
  const {id,name,email,eventTitle}=req.body;
  if( !name || !email || !eventTitle){
    return res.status(400).send('All fields are required');
  }
  
  const newbooking={
    id:bookings.length+1,
    name,
    email,
    eventTitle,
  };

  bookings.push(newbooking);
  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: newbooking
  });
});
app.get('/api/bookings/:id',(req,res)=>{
  const bookingId=parseInt(req.params.id);
  const {id,name,email,eventTitle}=req.body;
  const booking=bookings.find(b=>b.id===bookingId);
  if(!booking){
    return res.status(404).json({ message: 'Booking not found' });
  }
res.status(200).json({
    success: true,
    data: booking
  });
})

app.put('/api/bookings/:id',(req,res)=>{
  const bookingId=parseInt(req.params.id);
  const {name,email,eventTitle}=req.body;
  const bookingIndex=bookings.findIndex(b=>b.id===bookingId);
  if(bookingIndex===-1){
    return res.status(404).json({ message: 'Booking not found' });
  }
  bookings[bookingIndex]={
    id:bookingId,
    name,
    email,
    eventTitle,
  };
  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: bookings[bookingIndex]
  });
});
app.delete('/api/bookings/:id',(req,res)=>{
  const bookingId=parseInt(req.params.id);
  const bookingIndex=bookings.findIndex(b=>b.id===bookingId);
  if(bookingIndex===-1){
    return res.status(404).json({ message: 'Booking not found' });
  }
  bookings.splice(bookingIndex,1);
  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully'
  });
});
app.get('/',(req,res)=>{
  res.send(' Synergia Event Booking API is running');
});
 console.log(bookings);

app.listen(9000,()=>{
  console.log(' Synergia Event Booking API is running on http://localhost:9000');
})



  
