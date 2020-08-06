import { request } from './OSMcommand'
import decode from './decodePolygon'
import { draw, findGround, naturalBlock, setOffset, setBlock, printBlocks } from './drawLines'

importPackage(Packages.com.sk89q.worldedit)
importPackage(Packages.com.sk89q.worldedit.math)
importPackage(Packages.com.sk89q.worldedit.blocks)

export function rails (options) {
  request(options.radius, options.center, (s, n) => {
    return `(way[railway~"${options.regex}"](${s.join(',')},${n.join(',')});>;);out;`
  }, callback)

  function callback (data) {
    const lines = decode(data)
    const findGround_ = findGround(options)
    const naturalBlock_ = naturalBlock(options)
    const setOffset_ = setOffset(options)
    const setBlock_ = setBlock(options)
    draw(lines, (pos) => {
      pos = findGround_(pos)
      if (naturalBlock_(pos)) {
        pos = setOffset_(pos)
        setBlock_(pos)
      }
    })
    printBlocks()
  }
}
