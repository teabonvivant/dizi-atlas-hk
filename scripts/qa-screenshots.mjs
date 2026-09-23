import { spawn } from "node:child_process"
import fs from "node:fs"
import net from "node:net"
import os from "node:os"
import path from "node:path"

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:8069"
const outDir = process.env.QA_OUTPUT_DIR
  ? path.resolve(process.env.QA_OUTPUT_DIR)
  : path.join(process.cwd(), "..", ".omo", "evidence", "dizi-next-screenshots")
const defaultRoutes = ["/", "/start", "/repertoire", "/masters", "/masters/PER-0001", "/techniques", "/pedagogy", "/research", "/research/reports/R01", "/database", "/expert-team", "/search", "/copy-review-not-found"]
const routes = process.env.QA_ROUTES?.split("|").filter(Boolean) ?? defaultRoutes
const widths = process.env.QA_WIDTHS
  ? process.env.QA_WIDTHS.split(",").map((value) => Number.parseInt(value, 10)).filter((value) => Number.isFinite(value) && value > 0)
  : [375, 768, 1280]
const emulateMobile = process.env.QA_EMULATE_MOBILE !== "0"

fs.mkdirSync(outDir, { recursive: true })

function chromePath() {
  const envPath = process.env.CHROME_PATH
  if (envPath && fs.existsSync(envPath)) {
    return envPath
  }

  const candidates =
    os.platform() === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          path.join(os.homedir(), "AppData\\Local\\Google\\Chrome\\Application\\chrome.exe")
        ]
      : ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"]

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? ""
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.once("error", reject)
    server.listen(0, "127.0.0.1", () => {
      const address = server.address()
      if (!address || typeof address === "string") {
        server.close()
        reject(new Error("Unable to allocate a local port"))
        return
      }
      const port = address.port
      server.close(() => resolve(port))
    })
  })
}

async function waitForJson(url, attempts = 200) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return await response.json()
      }
    } catch {
      await wait(250)
    }
  }
  throw new Error(`Timed out waiting for ${url}`)
}

async function waitForPage(url, attempts = 120) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
      if (response.ok) {
        await response.arrayBuffer()
        return
      }
    } catch {
      // The preview may still be starting.
    }
    await wait(250)
  }
  throw new Error(`Timed out waiting for preview ${url}`)
}

async function createTarget(port, url) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })
  if (response.ok) {
    return await response.json()
  }
  const targets = await waitForJson(`http://127.0.0.1:${port}/json/list`)
  if (Array.isArray(targets) && targets[0]) {
    return targets[0]
  }
  throw new Error("Unable to create or find a Chrome page target")
}

function cdpClient(wsUrl) {
  let nextId = 1
  const pending = new Map()
  const events = []
  const socket = new WebSocket(wsUrl)

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data))
    if (typeof message.id === "number") {
      const callbacks = pending.get(message.id)
      if (callbacks) {
        pending.delete(message.id)
        if (message.error) {
          callbacks.reject(new Error(message.error.message))
        } else {
          callbacks.resolve(message.result ?? {})
        }
      }
      return
    }
    if (typeof message.method === "string") {
      events.push(message.method)
    }
  })

  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true })
    socket.addEventListener("error", reject, { once: true })
  })

  async function send(method, params = {}) {
    await opened
    const id = nextId
    nextId += 1
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject })
      socket.send(JSON.stringify({ id, method, params }))
    })
  }

  async function waitForEvent(method, timeoutMs = 12000) {
    const started = Date.now()
    while (Date.now() - started < timeoutMs) {
      const index = events.indexOf(method)
      if (index >= 0) {
        events.splice(index, 1)
        return
      }
      await wait(100)
    }
    throw new Error(`Timed out waiting for ${method}`)
  }

  return {
    close: () => socket.close(),
    send,
    waitForEvent
  }
}

async function captureRoute(client, width, route) {
  const destination = new URL(route, baseUrl)
  const expectedLocation = `${destination.pathname}${destination.search}`
  await client.send("Page.bringToFront")
  await client.send("Emulation.setFocusEmulationEnabled", { enabled: true })
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 900,
    deviceScaleFactor: 1,
    mobile: emulateMobile && width < 768,
    screenWidth: width,
    screenHeight: 900,
    positionX: 0,
    positionY: 0
  })
  await client.send("Emulation.setVisibleSize", { width, height: 900 })
  const navigation = await client.send("Page.navigate", { url: destination.href })
  if (typeof navigation.errorText === "string" && navigation.errorText && navigation.errorText !== "net::ERR_ABORTED") {
    throw new Error(`Unable to navigate to ${route}: ${navigation.errorText}`)
  }
  const started = Date.now()
  let navigated = false
  while (Date.now() - started < 60000) {
    const state = await client.send("Runtime.evaluate", {
      expression: `location.pathname + location.search === ${JSON.stringify(expectedLocation)} && document.readyState !== "loading" && Boolean(document.body)`,
      returnByValue: true
    })
    if (state.result?.value === true) {
      navigated = true
      break
    }
    await wait(150)
  }
  if (!navigated) {
    const diagnostic = await client.send("Runtime.evaluate", {
      expression: "({ href: location.href, pathname: location.pathname, readyState: document.readyState, hasBody: Boolean(document.body), title: document.title })",
      returnByValue: true
    })
    throw new Error(`Timed out waiting for ${route} to finish navigating: ${JSON.stringify(diagnostic.result?.value ?? {})}`)
  }
  await client.send("Runtime.evaluate", {
    expression: "Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, 5000))])",
    awaitPromise: true,
    returnByValue: true
  })
  await client.send("Runtime.evaluate", {
    expression: `Promise.all(Array.from(document.images, (image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve()
      return new Promise((resolve) => {
        const done = () => resolve()
        image.addEventListener("load", done, { once: true })
        image.addEventListener("error", done, { once: true })
        setTimeout(done, 10000)
      })
    }))`,
    awaitPromise: true,
    returnByValue: true
  })
  await client.send("Runtime.evaluate", {
    expression: `(() => {
      const style = document.createElement("style")
      style.dataset.qaCompositorFix = "true"
      style.textContent = "header { position: relative !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }"
      document.head.appendChild(style)
      const header = document.querySelector("header")
      if (header instanceof HTMLElement && header.parentNode) {
        const clone = header.cloneNode(true)
        header.parentNode.replaceChild(clone, header)
      }
      return true
    })()`,
    returnByValue: true
  })
  await client.send("Runtime.evaluate", {
    expression: "window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0; new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))",
    awaitPromise: true,
    returnByValue: true
  })
  await wait(500)
  const viewportState = await client.send("Runtime.evaluate", {
    expression: "({ scrollY: window.scrollY, innerWidth: window.innerWidth, innerHeight: window.innerHeight, headerTop: document.querySelector('header')?.getBoundingClientRect().top ?? null, headerHeight: document.querySelector('header')?.getBoundingClientRect().height ?? null, headerLinks: document.querySelectorAll('header a').length, headerText: document.querySelector('header')?.innerText ?? '' })",
    returnByValue: true
  })
  if (process.env.QA_DEBUG === "1") console.log(`${width} ${route}`, viewportState.result?.value)
  const candidates = []
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const shot = await client.send("Page.captureScreenshot", {
      format: "png",
      fromSurface: process.env.QA_FROM_SURFACE !== "0"
    })
    if (typeof shot.data === "string") candidates.push(Buffer.from(shot.data, "base64"))
    await wait(200)
  }
  if (candidates.length === 0) {
    throw new Error(`Chrome did not return screenshot data for ${route}`)
  }
  if (process.env.QA_DEBUG === "1") console.log("capture sizes", candidates.map((candidate) => candidate.byteLength))
  return candidates.reduce((largest, candidate) => candidate.byteLength > largest.byteLength ? candidate : largest)
}

const chrome = chromePath()
if (!chrome) {
  throw new Error("Chrome executable not found. Set CHROME_PATH to run screenshot QA.")
}

await waitForPage(baseUrl)
const port = await freePort()
const userDataDir = path.join(os.tmpdir(), `dizi-next-chrome-${process.pid}`)
const chromeProcess = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-sandbox",
  "--disable-dev-shm-usage",
  "--disable-background-networking",
  "--disable-extensions",
  "--disable-sync",
  `--user-data-dir=${userDataDir}`,
  `--remote-debugging-port=${port}`,
  "about:blank"
], { stdio: "ignore" })
chromeProcess.unref()

let qaTarget
let qaClient
try {
  await waitForJson(`http://127.0.0.1:${port}/json/version`)
  qaTarget = await createTarget(port, "about:blank")
  if (typeof qaTarget.webSocketDebuggerUrl !== "string") {
    throw new Error("Chrome target did not expose a WebSocket URL")
  }
  qaClient = cdpClient(qaTarget.webSocketDebuggerUrl)
  await qaClient.send("Page.enable")
  await qaClient.send("Runtime.enable")
  for (const width of widths) {
    for (const route of routes) {
      const name = route === "/" ? "home" : route.slice(1).replaceAll("/", "-")
      const screenshot = path.join(outDir, `${width}-${name}.png`)
      const data = await captureRoute(qaClient, width, route)
      if (data.byteLength < 15000) {
        throw new Error(`Chrome screenshot for ${route} at ${width}px looks invalid (${data.byteLength} bytes)`)
      }
      fs.writeFileSync(screenshot, data)
    }
  }
  console.log(`screenshots written to ${outDir}`)
} finally {
  qaClient?.close()
  if (typeof qaTarget?.id === "string") {
    await fetch(`http://127.0.0.1:${port}/json/close/${qaTarget.id}`).catch(() => undefined)
  }
  if (os.platform() === "win32" && chromeProcess.pid) {
    const killer = spawn("taskkill.exe", ["/PID", String(chromeProcess.pid), "/T", "/F"], {
      detached: true,
      stdio: "ignore",
      windowsHide: true
    })
    killer.unref()
  } else {
    chromeProcess.kill()
  }
}
