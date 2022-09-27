import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { PlotTransfer } from "../generated/schema"
import { PlotTransfer as PlotTransferEvent } from "../generated/MarketplaceFacet/MarketplaceFacet"
import { handlePlotTransfer } from "../src/marketplace-facet"
import { createPlotTransferEvent } from "./marketplace-facet-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000001")
    let plotId = BigInt.fromI32(234)
    let pods = BigInt.fromI32(234)
    let newPlotTransferEvent = createPlotTransferEvent(from, to, plotId, pods)
    handlePlotTransfer(newPlotTransferEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PlotTransfer created and stored", () => {
    assert.entityCount("PlotTransfer", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PlotTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "from",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PlotTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "to",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PlotTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "plotId",
      "234"
    )
    assert.fieldEquals(
      "PlotTransfer",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pods",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
