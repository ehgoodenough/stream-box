const ffmpeg = require("@ffmpeg-installer/ffmpeg")
const childprocess = require("child_process")

// Original CLI commands:
// ffmpeg -re -i cat.flv -vcodec copy -acodec copy -f flv rtmp://live.justin.tv/app/$STREAM_KEY
// ffmpeg -re -f lavfi -i testsrc=size=640x480 -f lavfi -i aevalsrc="sin(440*2*PI*t)" -vcodec libx264 -r 15 -g 30 -preset veryfast -vb 1000k -pix_fmt yuv420p -f flv rtmp://live.twitch.tv/app/$STREAM_KEY
// ffmpeg -re -f lavfi -i color=c=black:s=640x360 -vcodec libx264 -r 15 -g 30 -preset ultrafast -pix_fmt yuv420p -f flv rtmp://live.twitch.tv/app/$STREAM_KEY

// Good CLI reference:
// https://trac.ffmpeg.org/wiki/EncodingForStreamingSites

process.env.STREAM_KEY = "live_88171886_zkqao0nfSz4vEeKfuoVlUPNZOaVzAt"

if(process.env.STREAM_KEY === undefined) {
    console.log("Please set the STREAM_KEY environment variable.")
} else {
    let command = `${ffmpeg.path} -re -f lavfi -i color=c=black:s=640x360 -vcodec libx264 -r 15 -g 30 -preset ultrafast -pix_fmt yuv420p -f flv rtmp://live.twitch.tv/app/${process.env.STREAM_KEY}`
    let spawn = childprocess.exec(command)
    spawn.stdout.on("data", console.log)
    spawn.stderr.on("data", console.log)
}
