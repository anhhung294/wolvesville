const DB = require('../features/interactWithDB.js');
const sendSelectMenu = require('../features/sendSelectMenu.js');
require('dotenv').config();

module.exports={
    name: 'vote_time',
    execute: async function(client, msg){
        var playersID = await DB.get('playersID');
        var Fields =  await DB.getObjectData('fields');

        Fields.push({
            name:'⏭️', 
            value:'skip', 
            label:'⏭️',
            inline:true
        });

        const callBack =  async (i, collector, mess)=>{
            let vote = await DB.get('vote');
            let playersID = await DB.get('playersID');
            
            vote.push(i.values[0]);

            if(vote.length===playersID.length){
                return collector.stop('result');
            }
            
            await DB.update('vote', vote);
        };
         
        await sendSelectMenu(client, msg.channel, `Vote:`, Fields, playersID, callBack, false);

    }
}