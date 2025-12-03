import { $ } from "bun";

async function identifySong() {
    try {
    await $`ffmpeg -n -i ../Music/stream/stream.m3u8 -segment_wrap 1 -segment_time 6 -t 6 ../Music/stream/last_six_seconds_current.mp3`
    } catch (e) {
	console.log(e.message);
    }

    await $`yes | mv ../Music/stream/last_six_seconds_current.mp3 ../Music/stream/last_six_seconds.mp3`
    await $`ffmpeg -i ../Music/stream/last_six_seconds.mp3 -f chromaprint ../Music/stream/current_fingerprint.txt`
    const current_fingerprint = await Bun.file("../Music/stream/current_fingerprint.txt").text();
    const acoustid_url = `https://api.acoustid.org/v2/lookup?client=${Bun.env.ACOUSTID_CLIENT_KEY}&duration=6&fingerprint=${current_fingerprint}`
    const res = await fetch(acoustid_url);
    console.log(res.ok, res.status);
    const res_json = await res.json()
    console.log(JSON.stringify(res_json));
    return res_json;
}

export default identifySong
