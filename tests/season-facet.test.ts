import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Incentivization } from "../generated/schema"
import { Incentivization as IncentivizationEvent } from "../generated/SeasonFacet/SeasonFacet"
import { handleIncentivization } from "../src/season-facet"
import { createIncentivizationEvent } from "./season-facet-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let topcorns = BigInt.fromI32(234)
    let incentive = BigInt.fromI32(234)
    let feeInBnb = BigInt.fromI32(234)
    let newIncentivizationEvent = createIncentivizationEvent(
      account,
      topcorns,
      incentive,
      feeInBnb
    )
    handleIncentivization(newIncentivizationEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Incentivization created and stored", () => {
    assert.entityCount("Incentivization", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Incentivization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Incentivization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "topcorns",
      "234"
    )
    assert.fieldEquals(
      "Incentivization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "incentive",
      "234"
    )
    assert.fieldEquals(
      "Incentivization",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "feeInBnb",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
