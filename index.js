const composer = require('composer-client');
const moment = require('moment');

bizNetworkConnection = new composer.BusinessNetworkConnection();
var cardName = "admin@blockchain-twitter";
//var cardName = "kang@blockchain-twitter";
var id = 0;
let userId = "9642970";

const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

async function main(){
    askWrite();
}

try{
    main()
} catch(e){
    console.log(e)
}

function askDelete(){
    rl.question("Delete a tweet.", (answer)=>{
        console.log("let's delete "+answer)
        deleteTweet(answer).then();
        rl.close();
    });
}
function askWrite(){
    rl.question("How are you?.", (answer)=>{
        writeTwitt(answer).then(async ()=>{
            await readAllTwitts();
        });
        rl.close();
    });
}
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
    //Now returns timestamp.
    return moment().unix();
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
        console.log(`tweet :${i}`)
        console.log("tweetId : " + list[i].tweetId);
        console.log("message : " + list[i].message);
        console.log("user : " + list[i].user.$identifier);
    }
}
async function readLastTwitt(){
    let connect = await bizNetworkConnection.connect(cardName);
    let twittRegistry = await bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let list = await twittRegistry.getAll()
    var i = 0;
    console.log("tweetId : " + list[i].tweetId);
    console.log("message : " + list[i].message);
    console.log("user : " + list[i].user.$identifier);
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