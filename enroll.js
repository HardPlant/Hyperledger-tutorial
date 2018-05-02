const composer = require('composer-client');
const moment = require('moment');
bizNetworkConnection = new composer.BusinessNetworkConnection();
var cardName = "admin@blockchain-twitter";

const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

async function makeParticipant(username){
    let connect = await bizNetworkConnection.connect(cardName); // BusinessNetworkDefinition
    try{
        let participantRegistry = await bizNetworkConnection.getParticipantRegistry('org.blocktwitt.User');
        let factory = connect.getFactory();
        let userId = username + moment().unix();
        let newUser = factory.newResource('org.blocktwitt','User',userId);
        newUser.firstName = username
        newUser.lastName = " "
        await participantRegistry.add(newUser);
        console.log("participant success!")
        return userId;

    } catch(e){
        console.error(e)
    }
}
async function issueIdentity(userId){
    console.log("issueIdentity:"+userId);
    let connect = await bizNetworkConnection.connect(cardName); // BusinessNetworkDefinition
    let result = await bizNetworkConnection.issueIdentity('org.blocktwitt.User#'+userId, userId)
    console.log(`userId = ${result.userID}`);
    console.log(`userSecret = ${result.userSecret}`);
}

async function register(){
    rl.question("Enter a username.\n", (answer)=>{
        return makeParticipant(answer)
            .then(async(userId)=>
                {await issueIdentity(userId)}
            )
    });
}
function main(){
    register()
    /*
    var stdin = process.openStdin();
    stdin.addListener("data", function(d){
        console.log(d.toString().trim());
    });
    */
   
}

main();