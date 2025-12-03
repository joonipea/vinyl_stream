import fs from "node:fs"
import { $ } from "bun";

async function identifySong() {
    try {
    await $`ffmpeg -n -i ../Music/stream/stream.m3u8 -segment_wrap 1 -segment_time 6 -t 6 ../Music/stream/last_six_seconds_current.mp3`
    } catch (e) {
	console.log(e.message);
    }

    await $`yes | mv ../Music/stream/last_six_seconds_current.mp3 ../Music/stream/last_six_seconds.mp3`
    await $`ffmpeg -i ../Music/stream/last_six_seconds.mp3 -f chromaprint ../Music/stream/current_fingerprint.txt`
    const fs_file = fs.createReadStream('../Music/stream/last_six_seconds.mp3');
    const bun_file = await Bun.file('../Music/stream/last_six_seconds.mp3').arrayBuffer();
    const songData = JSON.stringify({
        'api_token': Bun.env.AUDD_API_KEY,
        'file': fs_file,
        'return': 'musicbrainz,apple_music,spotify',
    });
    const req = new Request({
        url: 'https://api.audd.io/',
        method: 'POST',
        body: songData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    const res = await fetch('https://api.audd.io/',{
        method: 'POST',
        body: songData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    console.log(res.ok, res.status);
    const res_json = await res.json()
    console.log(JSON.stringify(res_json));
    return res_json;
}

export default identifySong
