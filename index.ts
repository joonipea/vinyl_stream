import identifySong from "./tools/identifySong"

function main() {
  const PORT = Bun.env.PORT || 7474;

  Bun.serve({
    port: PORT,
    routes:{
      "/stream.m3u8": req => {
        return new Response(Bun.file("./stream/stream.m3u8"));
        },
      "/": req => {
        return new Response(Bun.file("index.html"));
      },
      "/identifySong": async (req) => {
        const song_id = await identifySong()
        return new Response(JSON.stringify(song_id));
      },
      "/*": req => {
        const pathName = new URL(req.url).pathname;
        return new Response(Bun.file(`./stream${pathName}`));
      }
    }
  })

}

main()
