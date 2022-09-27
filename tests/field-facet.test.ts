import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Sow } from "../generated/schema"
import { Sow as SowEvent } from "../generated/FieldFacet/FieldFacet"
import { handleSow } from "../src/field-facet"
import { createSowEvent } from "./field-facet-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let index = BigInt.fromI32(234)
    let topcorns = BigInt.fromI32(234)
    let pods = BigInt.fromI32(234)
    let newSowEvent = createSowEvent(account, index, topcorns, pods)
    handleSow(newSowEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Sow created and stored", () => {
    assert.entityCount("Sow", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Sow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Sow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "index",
      "234"
    )
    assert.fieldEquals(
      "Sow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "topcorns",
      "234"
    )
    assert.fieldEquals(
      "Sow",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pods",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
