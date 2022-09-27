import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LPDeposit } from "../generated/schema"
import { LPDeposit as LPDepositEvent } from "../generated/ConvertFacet/ConvertFacet"
import { handleLPDeposit } from "../src/convert-facet"
import { createLPDepositEvent } from "./convert-facet-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let season = BigInt.fromI32(234)
    let lp = BigInt.fromI32(234)
    let seeds = BigInt.fromI32(234)
    let newLPDepositEvent = createLPDepositEvent(account, season, lp, seeds)
    handleLPDeposit(newLPDepositEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LPDeposit created and stored", () => {
    assert.entityCount("LPDeposit", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "season",
      "234"
    )
    assert.fieldEquals(
      "LPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lp",
      "234"
    )
    assert.fieldEquals(
      "LPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "seeds",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
