const composer = require('composer-client');

bizNetworkConnection = new composer.BusinessNetworkConnection();
var cardName = "admin@blockchain-twitter";
var id = 0;
let userId = "9642970";

const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question("Delete a tweet.", (answer)=>{
    console.log("let's delete "+answer)
    deleteTweet(answer).then();
    rl.close();
});
async function deleteTweet(id){
    let connect = await bizNetworkConnection.connect(cardName); // BusinessNetworkDefinition
    let serializer = connect.getSerializer();

    let resource = serializer.fromJSON({
        '$class':'org.blocktwitt.deleteTweet',
        'tweet':'tweetId:'+id
    });
    await bizNetworkConnection.submitTransaction(resource);
}

function getRandomId(){
    return Math.floor(Math.random()*10000000);
}
async function writeTwitt(message){
    let connect = await bizNetworkConnection.connect(cardName); // BusinessNetworkDefinition
    let twittRegistry = await bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let userRegistry = await bizNetworkConnection.getParticipantRegistry('org.blocktwitt.User');
    let factory = connect.getFactory();
    let newTweet = factory.newResource('org.blocktwitt', 'Tweet',
        "tweetId:" + getRandomId())
    //let user = await userRegistry.get('userId:'+userId);
    let user = factory.newRelationship('org.blocktwitt', 'User', 'userId:'+userId)
    newTweet.user = user;
    newTweet.message = message;
    await twittRegistry.add(newTweet);
}

async function readAllTwitts(){
    let connect = await bizNetworkConnection.connect(cardName);
    let twittRegistry = await bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let list = await twittRegistry.getAll()
    for(var i=0; i<list.length;i++){
        console.log("tweetId : " + list[i].tweetId);
        console.log("message : " + list[i].message);
        console.log("user : " + list[i].user.$identifier);
    }
}

async function addUser(firstName, lastName){
    let connect = await bizNetworkConnection.connect(cardName);
    let userRegistry = await bizNetworkConnection.getParticipantRegistry('org.blocktwitt.User');
    let factory = connect.getFactory();
    let newUser = factory.newResource('org.blocktwitt', "User", "userId:" + getRandomId())
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    await userRegistry.add(newUser);
}

async function listUser(){
    let connect = await bizNetworkConnection.connect(cardName);
    let userRegistry = await bizNetworkConnection.getParticipantRegistry('org.blocktwitt.User');
    let list = await userRegistry.getAll();
    for(var i=0; i<list.length;i++){
        console.log(list[i].userId);
        console.log(list[i].firstName);
        console.log(list[i].lastName);
    }
}

async function deleteTweet(){
    let connect = await bizNetworkConnection.connect(cardName);

}

async function main(){
    await readAllTwitts()
    //await deleteTweet()
    //await readAllTwitts()
}

try{
    main()
} catch(e){
    console.log(e)
}