const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const cors = require('cors'); // Import cors package
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const UserRouter = require('./routes/userRouter'); 
const BookRouter = require('./routes/bookRouter');
const authentication = require('./middleware/authentication');
const authorization = require('./middleware/authorization');

const baseURL = process.env.BASE_URL || 'http://localhost:3000';


require('dotenv').config();

const app = express();

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books Store API',
      version: '1.0.0',
      description: 'API documentation for managing books',
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};
// Generate Swagger specifications
const specs = swaggerJsdoc(options);



// Middleware
app.use(cors()); 
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.get('/', (req, res) => {
  res.send('Wel-come to the Book Store!');
});

// app.use('/api/user', UserRouter);
app.use(`${baseURL}/api/user`, UserRouter);
app.use(`${baseURL}/api/books`, authentication, BookRouter);



app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
  try {
    await connectDB(); 
  } catch (error) {
    console.log(error);
  }
});
