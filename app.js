const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const UserRouter = require('./routes/userRouter'); 
const BookRouter = require('./routes/bookRouter');
const authentication = require('./middleware/authentication') 
const authorization  =  require('./middleware/authorization')

require('dotenv').config();

const app = express();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: User already exists or bad request
 *       '500':
 *         description: Internal server error
 */





// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books Store Documentation!',
      version: '1.0.0',
      description: 'API documentation generated with Swagger',
    },
    servers: [
      {
        url: 'https://digital-pani-bookmanagement-2.onrender.com/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};



// Generate Swagger specifications
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(bodyParser.json());

const deployapi = "https://digital-pani-bookmanagement-2.onrender.com";


// Routes

app.get(`/${deployapi}/home` , (req, res) => {

 res.send("Home page")
 
});

app.use(`${deployapi}/user`, UserRouter);
app.use('/api/books',authentication,BookRouter)

app.get('/admin', authorization(['admin']), (req, res) => {
    res.json({ message: 'Admin access granted' });
  });


app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await connectDB(); 
  } catch (error) {
    console.log(error);
    
  }
});

