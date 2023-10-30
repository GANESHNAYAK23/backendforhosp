
const express = require('express')
const cors = require("cors");
const { PrismaClient } = require('@prisma/client')
const app = express()
const prisma = new PrismaClient()
const port = 3000
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//adduser
// app.get("/addUser", async (req, res) => {
//     const newUser = await prisma.user.create({
//       data: {
//         email: "johndoe@example.com",
//         password:"123"
//       },
//     });
//     res.json(newUser);
//   });


 //add newuser to db from body(working)
//  app.post("/addUser", async (req, res) => {
//     try {
//       const receivedData = req.body;
//       console.log(receivedData);
//       const newUser = await prisma.user.create({
//         data: {
//           name: receivedData.name,
//           email: receivedData.email,
//           password: receivedData.password,
//           age: receivedData.age,
//           sex: receivedData.sex,
//           phone_number: receivedData.phone_number,
//           role: receivedData.role
//         },
//       });
//       console.log(newUser);
//       // Send a response back to the client
//       res.status(200).json({ message: 'Data received successfully!', newUser });
//     } catch (error) {
//       console.error("Error occurred: ", error);
//       // Handle the error and send an appropriate response to the client
//       res.status(500).json({ error: 'An error occurred while processing your request.' });
//     }
//   });
  


  



  // Delete entries from Doctor, Administrator, and Appointment tables similarly
  
  //new user
//   app.post('/addUser', async (req, res) => {
//     try {
//       const responseData = req.body;
  
//       let newUser;
//       let newRoleEntry;
  
//       if (reponseData.role === 'PATIENT') {
//         newUser = await prisma.user.create({
//           data: {
//             name:receivedData.name,
//             email: receivedData.email,
//             password: receivedData.password,
//             age:receivedData.age,
//             sex:receivedData.sex,
//             phone_number: receivedData.phone_number,
//             role: 'PATIENT',
//           },
//         });
  
//         newRoleEntry = await prisma.patient.create({
//           data: {
//             patientId: newUser.id,
//             health_conditions: 'Good', // Example health condition
//           },
//         });
//       } else if (responseData.role === 'DOCTOR') {
//         newUser = await prisma.user.create({
//           data: {
//             name:receivedData.name,
//             email: receivedData.email,
//             password: receivedData.password,
//             age:receivedData.age,
//             sex:receivedData.sex,
//             phone_number: receivedData.phone_number,
//             role: 'DOCTOR',
//           },
//         });
  
//         newRoleEntry = await prisma.doctor.create({
//           data: {
//             doctorId: newUser.id,
//             specialization: 'TObe added', // Example specialization
//           },
//         });
//       } else if (responseData.role === 'ADMINISTRATOR') {
//         newUser = await prisma.user.create({
//           data: {
//             name:receivedData.name,
//             email: receivedData.email,
//             password: receivedData.password,
//             age:receivedData.age,
//             sex:receivedData.sex,
//             phone_number: receivedData.phone_number,
//             role: 'ADMINISTRATOR',
//           },
//         });
  
//         newRoleEntry = await prisma.administrator.create({
//           data: {
//             administratorId: newUser.id,
//             department: 'Admin', // Example department details
//           },
//         });
//       } else {
//         return res.status(400).json({ error: 'Invalid role' });
//       }
  
//       res.status(200).json({ message: 'User and role added successfully', newUser, newRoleEntry });
//     } catch (error) {
//       console.error('Error adding user and role:', error);
//       res.status(500).json({ error: 'Error adding user and role' });
//     }
//   });
  
  app.post('/addUser', async (req, res) => {
    try {
      const receivedData = req.body;
    console.log(receivedData)
      let newUser;
      let newRoleEntry;
  
      if (receivedData.role === 'PATIENT') {
        newUser = await prisma.user.create({
          data: {
            name: receivedData.name,
            email: receivedData.email,
            password: receivedData.password,
            age: receivedData.age,
            sex: receivedData.sex,
            phone_number: receivedData.phone_number,
            role: 'PATIENT',
          },
        });
  
        newRoleEntry = await prisma.patient.create({
          data: {
            patientId: newUser.id,
            health_conditions: 'Good', // Example health condition
          },
        });
      } else if (receivedData.role === 'DOCTOR') {
        newUser = await prisma.user.create({
          data: {
            name: receivedData.name,
            email: receivedData.email,
            password: receivedData.password,
            age: receivedData.age,
            sex: receivedData.sex,
            phone_number: receivedData.phone_number,
            role: 'DOCTOR',
          },
        });
        console.log("creating doctor");
        newRoleEntry = await prisma.doctor.create({
          data: {
            doctorId: newUser.id,
            specialization: receivedData.specialization,// Example specialization
          },
        });
  
      } else if (receivedData.role === 'ADMINISTRATOR') {
       
        newUser = await prisma.user.create({
          data: {
            name: receivedData.name,
            email: receivedData.email,
            password: receivedData.password,
            age: receivedData.age,
            sex: receivedData.sex,
            phone_number: receivedData.phone_number,
            role: 'ADMINISTRATOR',
          },
        });
        newRoleEntry = await prisma.administrator.create({
          data: {
            administratorId: newUser.id,
            department: 'Admin', // Example department details
          },
        });
  
        
      } else {
        return res.status(400).json({ error: 'Invalid role' });
      }
  
      res.status(200).json({ message: 'User and role added successfully', newUser,msg2: 'new role', newRoleEntry });
    } catch (error) {
      console.error('Error adding user and role:', error);
      res.status(500).json({ error: 'Error adding user and role' });
    }
  });


  
  // Endpoint to delete a user by email(works fine)
  app.delete('/deleteUser', async (req, res) => {
    try {
      const userEmail = req.body.email;
      console.log(userEmail);
      if (!userEmail) {
        return res.status(400).json({ error: 'Email not provided' });
      }
  
      const user = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });
  

//get all users
app.post('/find', async (req, res) => {
  try {
    const alluser = await prisma.user.findMany(
      {
        where: {
          role:'ADMINISTRATOR'
    
        },
      }

    );
    res.status(200).json({ alluser });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Error finding user' });
  }
  
})







  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// npx prisma generate
// npx prisma migrate dev --name init --create-only
// npx prisma migrate deploy