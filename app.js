var Bot = require('ttapi')
  , config = require('./config')
  , bot = new Bot(config.bot.auth, config.bot.id, config.bot.room)

bot.on('newsong', function(data){
    
    var song = data.room.metadata.current_song
    
    //console.log('New song "' + song.metadata.song + '" by "' + song.metadata.artist + '" from the album "' + song.metadata.album + '"')
    //add song to bot playlist
    bot.playlistCreate(data.room.name, function() {
        bot.playlistSwitch(data.room.name, function() {
            bot.playlistAdd(data.room.name, song._id, function() {
                //console.log('Added: ' + song.metadata.song + ' to playlist: ' + data.room.name);
            });
            bot.snag()
        })
    })
    
    
    /*
    bot.vote('up', function(){
        if (!data.success) console.log("Error voting up\n", data)
        console.log('Voted up')
        // trigger snag animation (doesn't add to queue)
        bot.snag()
    })
    */
})
