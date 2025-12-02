import identifySong from "./tools/identifySong"

function main() {

  Bun.serve({
    port: 7474,
    routes:{
	"/stream.m3u8": req => {
        return new Response(Bun.file("../Music/stream/stream.m3u8"))
      	},
	"/": req => {
	return new Response(Bun.file("index.html"))
	},
	"/identifySong": async (req) => {
		await identifySong()
		return new Response("song ided");
	},
	"/*": req => {
		    const pathName = new URL(req.url).pathname;

	return new Response(Bun.file(`../Music/stream${pathName}`))
	}
    }


  })

}

main()
