const composer = require('composer-client');
bizNetworkConnection = new composer.BusinessNetworkConnection();
var cardName = "admin@blockchain-twitter";
var id = 0;

function getCurrentId(){
    return id++;
}

async function writeTwitt(message){
    let connect = await bizNetworkConnection.connect(cardName);
    let twittRegistry = await bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let factory = this.BusinessNetworkDefinition.getFactory();
    let newTwitt = factory.newResource('org.blocktwitt.Tweet',
        "TweetId:" + getCurrentId())
    newTwitt.tweetId = Math.random()*10000000;
    newTwitt.message = messsage;
}
async function getIdentity(){

}
async function writeTwitt(){
}
async function readAllTwitts(){
    let connect = await bizNetworkConnection.connect(cardName);
    let twittRegistry = await bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let list = await twittRegistry.getAll()
    console.log(list)
}
async function main(){
    getIdentity();
    return;
}
async function addUser(){
    let connect = await bizNetworkConnection.connect(cardName);
    let userRegistry = await bizNetworkConnection.getParticipantRegistry('org.blocktwitt.User');

}
try{
    main()
} catch(e){
    console.log(e)
}