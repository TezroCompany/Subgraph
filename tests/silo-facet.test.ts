import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SiloFacetLPDeposit } from "../generated/schema"
import { SiloFacetLPDeposit as SiloFacetLPDepositEvent } from "../generated/SiloFacet/SiloFacet"
import { handleSiloFacetLPDeposit } from "../src/silo-facet"
import { createSiloFacetLPDepositEvent } from "./silo-facet-utils"

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
    let newSiloFacetLPDepositEvent = createSiloFacetLPDepositEvent(
      account,
      season,
      lp,
      seeds
    )
    handleSiloFacetLPDeposit(newSiloFacetLPDepositEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SiloFacetLPDeposit created and stored", () => {
    assert.entityCount("SiloFacetLPDeposit", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SiloFacetLPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SiloFacetLPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "season",
      "234"
    )
    assert.fieldEquals(
      "SiloFacetLPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lp",
      "234"
    )
    assert.fieldEquals(
      "SiloFacetLPDeposit",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "seeds",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
