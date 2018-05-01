const composer = require('composer-client');
bizNetworkConnection = new composer.BusinessNetworkConnection();
var cardname = "admin@blockchain-twitter";
let BusinessNetworkDefinition = await bizNetworkConnection.connect(cardName);
var id = 0;

function getCurrentId(){
    return id++;
}

async function writeTwitt(message){
    var twittRegistry = await this.bizNetworkConnection.getAssetRegistry('org.blocktwitt.Tweet');
    let factory = this.BusinessNetworkDefinition.getFactory();
    let newTwitt = factory.newResource('org.blocktwitt.Tweet',
        "TweetId:" + getCurrentId())
    newTwitt.tweetId = Math.random()*10000000;
    newTwitt.message = messsage;
    
}

