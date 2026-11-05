# Edge Network Caching, HTTP/3 & Brotli Compression Specification

## Overview
Uni-Verse delivers sub-second initial content rendering across volatile university Wi-Fi networks by distributing assets through Vercel / Cloudflare **Edge CDN PoPs** located across Indian academic network exchanges. This specification details transport protocol optimizations (HTTP/3 / QUIC), Brotli compression parameters, and strict `Cache-Control` header hierarchies.

---

## 1. Protocol Architecture: HTTP/3 & 0-RTT Connection Resumption

```
Traditional HTTP/2 (TCP + TLS 1.3):
[Client] -------- SYN --------> [Server]
[Client] <----- SYN-ACK ------ [Server]
[Client] ----- TLS ClientHello -> [Server]
[Client] <--- TLS ServerHello --- [Server]  (2 Round-Trip Times before first data byte)

Modern HTTP/3 (QUIC over UDP):
[Client] === 0-RTT QUIC Handshake + GET /index.html ===> [Server]
[Client] <============= First Content Byte ============= [Server]  (0 Round-Trip Time!)
```

### Key Performance Benefits
- **Zero Head-of-Line Blocking**: Packet loss on a single transit shuttle stream does not stall concurrent CSS/JS file downloads.
- **Connection Migration**: When a student walks between campus buildings and switches from cellular 5G to library Wi-Fi, the QUIC connection ID remains valid without terminating active sessions.

---

## 2. Compression Benchmarks: Brotli (br) vs. Gzip

Static JavaScript, CSS, and HTML assets undergo pre-compression during production build pipelines:

| Asset Category | Raw Uncompressed | Gzip (Level 9) | Brotli (Level 11) | Net Compression Gain |
|---|---|---|---|---|
| **`index.html`** | $2.02\text{ kB}$ | $0.77\text{ kB}$ | **$0.64\text{ kB}$** | $-17\%$ over Gzip |
| **`index.css`** | $91.36\text{ kB}$ | $15.09\text{ kB}$ | **$12.38\text{ kB}$** | $-18\%$ over Gzip |
| **`index.js` (Entry)** | $53.92\text{ kB}$ | $17.09\text{ kB}$ | **$14.21\text{ kB}$** | $-17\%$ over Gzip |
| **`vendor-react.js`** | $161.73\text{ kB}$ | $52.78\text{ kB}$ | **$45.10\text{ kB}$** | $-15\%$ over Gzip |

Edge servers serve Brotli whenever the incoming client request includes `Accept-Encoding: gzip, deflate, br`.

---

## 3. Cache-Control Header Hierarchy

```
Static Asset Request (URL includes contenthash, e.g. /assets/index-B4pjOIEi.js)
                 |
                 v
   [Cache-Control: public, max-age=31536000, immutable]
   (Client caches locally for 1 year; zero network round-trip on subsequent visits)

Dynamic Route Request (e.g. /index.html or /api/v1/cafeteria/menu)
                 |
                 v
   [Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=300]
   (Edge caches for 60s; serves stale content instantly while revalidating in background)
```

---

## 4. Stale-While-Revalidate Edge Acceleration

For semi-dynamic campus data (food stall menus, daily specials):
1. **Edge Cache Hit**: Within 60 seconds (`s-maxage=60`), edge nodes respond instantaneously ($< 15\text{ ms}$).
2. **Stale Window**: Between 60 and 360 seconds, the edge server immediately returns the cached payload to the student while asynchronously dispatching a background fetch to the origin database.
3. **Cache Invalidation API**: Merchant menu updates trigger an automated webhook purging edge tags:
   ```bash
   curl -X POST "https://api.vercel.com/v1/edge/purge-tags" \
     -H "Authorization: Bearer $VERCEL_TOKEN" \
     -d '{"tags": ["cafeteria-menu-stall-01"]}'
   ```
