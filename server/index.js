//BASE SERVER SIDE IMPORTS
const express = require('express');
const bodyParser  = require('body-parser');
const dotenv = require('dotenv');
const cors  = require('cors');
const {graphqlHTTP} = require('express-graphql');
const connectDB = require('./config/connectdb');
const graphqlSchema = require('./graphql/schema/app');
const graphqlResolvers = require('./graphql/schema/resolvers/app');
const isAuth = require('./middleware/Authentication');
//CALL EXPRES OBJECTS
const app = express();

connectDB();

//CALLING THE DOTENV METHOD OBJ 
dotenv.config();

//GETTING CORS ACCESS TO OUR CLIENT PORT WHICH IS 3000
app.use(cors({origin:["http://localhost:3000"]}))

//PARSE INCOMING JSON TYPE BODY DATA
app.use(bodyParser.json());


app.use(isAuth);
//CREATING THE USER FUNCTION SO THAT WE CAN ACCESS IT FROM OUR GETEVENTS QUERY INSTEAD OF POPULATING

app.use('/graphql', graphqlHTTP({

    //QUERIES AND TYPES

    schema:graphqlSchema,
      
    rootValue:graphqlResolvers,
    
    graphiql:true

}));

//CONNECTING TO A PORT USING EXPRESS LISTEN PROP
app.listen(5000,() => console.log('Server Started'));