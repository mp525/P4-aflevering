import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `#graphql
    type Friend {
        id: ID
        firstName: String
        lastName: String
        email: String
        role: String
    }
    """
    Queries available for Friends
    """
     type Query {
        """
        Returns all details for all Friends
        (Should probably require 'admin' rights if your are using authentication)
        """
        getAllFriends : [Friend]!
        """
        Only required if you ALSO wan't to try a version where the result is fetched from the existing endpoint
        """
        getAllFriendsProxy: [Friend]!

        getFriend(email: String) : Friend!
        
    }

    input FriendInput {
        firstName: String!
        lastName: String!
        password: String!
        email: String!
    }
    input FriendEditInput {
        firstName: String
        lastName: String
        password: String
        email: String!
    }
    input PositionInput {
        email: String!
        longitude: Float!
        latitude: Float!
    }

    type Mutation {
        """
        Allows anyone (non authenticated users) to create a new friend
        """
        createFriend(input: FriendInput): Friend
        editFriend(input: FriendEditInput): Friend
        deleteFriend(input: String): Friend

        addOrUpdatePosition(input: PositionInput): Boolean
        
        
    }
`;
//editFriend(input: FriendEditInput): Friend
const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };