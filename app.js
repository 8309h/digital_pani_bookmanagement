const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const UserRouter = require('./routes/userRouter'); 
const authorization  =  require('./middleware/authorization')

require('dotenv').config();

const app = express();

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation generated with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

// Generate Swagger specifications
const specs = swaggerJsdoc(options);

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', UserRouter);
app.use('/api/books',BookRouter)
app.get('/admin', authorization(['admin']), (req, res) => {
    res.json({ message: 'Admin access granted' });
  });

app.get('/', (req, res) => {
    res.send('Wel-Come to BookAPI Store!')
});

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  try {
    await connectDB(); 
  } catch (error) {
    console.log(error);
  }
});

