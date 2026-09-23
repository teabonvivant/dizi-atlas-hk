import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer, request as httpRequest } from "node:http"
import path from "node:path"

const projectRoot = path.resolve(process.env.QA_PROJECT_ROOT ?? process.cwd())
const assetsRoot = path.join(projectRoot, "dist", "client")
const upstream = new URL(process.env.QA_UPSTREAM ?? "http://127.0.0.1:8068")
const port = Number.parseInt(process.env.QA_PREVIEW_PORT ?? "8070", 10)

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
])

function staticFile(pathname) {
  if (!(pathname.startsWith("/assets/") || pathname.startsWith("/images/") || pathname === "/favicon.svg")) {
    return undefined
  }
  const relative = decodeURIComponent(pathname).replace(/^\/+/, "")
  const resolved = path.resolve(assetsRoot, relative)
  const safePrefix = `${path.resolve(assetsRoot)}${path.sep}`
  if (!resolved.startsWith(safePrefix) || !existsSync(resolved) || !statSync(resolved).isFile()) {
    return undefined
  }
  return resolved
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`)
  const file = staticFile(requestUrl.pathname)
  if (file) {
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": contentTypes.get(path.extname(file).toLowerCase()) ?? "application/octet-stream"
    })
    createReadStream(file).pipe(response)
    return
  }

  const target = new URL(`${requestUrl.pathname}${requestUrl.search}`, upstream)
  const proxy = httpRequest(target, {
    method: request.method,
    headers: { ...request.headers, host: upstream.host }
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers)
    upstreamResponse.pipe(response)
  })
  proxy.on("error", (error) => {
    response.writeHead(502, { "content-type": "text/plain; charset=utf-8" })
    response.end(`Preview upstream error: ${error.message}`)
  })
  request.pipe(proxy)
})

server.listen(port, "127.0.0.1", () => {
  console.log(`Production QA preview: http://127.0.0.1:${port}`)
})
