const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const GraphQLPlayer = require('./player/player');
const fetch = require('node-fetch');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        description: '...',

        fields: () => ({
            player: {
                type: GraphQLPlayer,

                args: {
                    key: { type: GraphQLString },
                    uuid: { type: GraphQLString }
                },
                
                resolve: (root, { uniqueId }, { authToken }) => {
                    return fetch(`https://api.hypixel.net/player?key=${authToken}&uuid=${uniqueId}`)
                    .then(response => response.json())
                    .then(json => json.player)
                }
            }
        })
    })
});