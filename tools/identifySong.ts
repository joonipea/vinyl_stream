import fs from "node:fs"
import { $ } from "bun";

async function identifySong() {
    await $`ffmpeg -sseof -6 -i ../Music/stream.flac ../Music/stream/last_six_seconds.mp3`
    const fs_file = fs.createReadStream('../Music/stream/last_six_seconds.mp3');
    const bun_file = await Bun.file('../Music/stream/last_six_seconds.mp3').arrayBuffer();
    const songData = {
        'api_token': Bun.env.AUDD_API_KEY,
        'file': fs_file,
        'return': 'musicbrainz,apple_music,spotify',
    };
    const req = new Request({
        url: 'https://api.audd.io/',
        method: 'POST',
        body: songData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    const res = await fetch(req);
    console.log(res.ok, res.status);
    const res_json = await res.json()
    console.log(JSON.stringify(res_json));

    return res_json;
}

export default identifySong