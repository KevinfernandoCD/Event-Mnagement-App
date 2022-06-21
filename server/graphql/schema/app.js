const {buildSchema} = require('graphql');

module.exports = buildSchema(`

    type Booking{

    _id:ID!
    event:Event!
    bookeduser:User!
    createdAt:String!
    updatedAt:String!

    }

    type Event {
 
        id:ID!
        type:String!
        title:String!
        description:String!
        price:Float
        date:String!
        creator:User!

    }

    type User {

        id:ID!
        email:String!
        createdEvents:[Event!]

    }

    type AuthData {

        userId:ID!
        token:String!
        tokenExpiration:Int!
        
    }

    input UserInput {

        email:String!
        password:String!

    }

    type RootQuery {

        getEvents : [Event!]!
        getUsers : [User!]!
        getBookings:[Booking!]!
        login(email:String!,password:String!):AuthData!

    }

    input EventInput {

        title:String!
        type:String!
        description:String!
        price:Float!
        date:String!

    }

    type RootMutation {

        createEvent(eventInput:EventInput):Event!
        createUser(eventInput:UserInput):User!
        bookEvent(eventId:ID!):Booking!
        cancelBooking(bookingId:ID!):Event!

    }

    schema {

        query:RootQuery
        mutation:RootMutation

    }

`
)