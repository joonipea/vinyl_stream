# Vinyl Stream and Record

## Description
A way to record audio and stream it over HTTP Live Streaming (HLS). For use on Linux systems, with planned support for other systems in the future.

## Minimum Hardware Requirements
- 1 GB RAM (Likely less is needed)
- 1 GB of storage (enough for a full day of uninterupted recording)
- ??? CPU
- Audio Input
- Audio Output (Optional: For Monitoring)
- A Network interface (for streaming unneeded for recording)

See: [Tested Systems](#tested-systems)

## Dependencies
- ALSA
- Bun
- ffmpeg

## Installation
Install all needed external dependencies, and ensure your desired audio interface is the default ALSA input and output.

Install bun/node dependencies:

```bash
bun install
```

Make `record_vinyl_stream` executable:
```bash
chmod +x record_vinyl_stream
```

## Running

```bash
bun run start
```
Starts a server on port 7474

### Options
If you'd like to change the default behavior of the `record_vinyl_stream` script run

```bash
bun run index.ts & ./record_vinyl_stream [options]
```

#### available options
 -n: filename
 
    Set the filename of the recorded file. Defaults to "stream"
 
 -e: extension
 
    Set the extension of the recorded file. Defaults to "flac". Note: Make sure you have a codec installed for the target extension

 -l: location
    
    Set the location of the recorded file. Don't touch will break things. TODO: Decouple recorded file location from HLS stream files

 -p: playback

    Boolean. Playback audio to default device audio output. Defaults to true.

## Tested Systems

|SBC|RAM|Storage|Audio Interface|Total Cost|Supported|
|-|-|-|-|-|-|
| Raspberry Pi 4B| 1GB | 4GB | IQAudio Codec Zero | $50 USD | Yes |
| Radxa Zero 3W | 2GB | 4GB | 1-2 ESP32s | $32 USD | Planned |
| Radxa Zero 3W | 2GB | 4GB | IQAudio Codec Zero | $34 USD | Planned |