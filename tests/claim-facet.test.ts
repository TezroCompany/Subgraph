import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BnbClaim } from "../generated/schema"
import { BnbClaim as BnbClaimEvent } from "../generated/ClaimFacet/ClaimFacet"
import { handleBnbClaim } from "../src/claim-facet"
import { createBnbClaimEvent } from "./claim-facet-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let account = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bnb = BigInt.fromI32(234)
    let newBnbClaimEvent = createBnbClaimEvent(account, bnb)
    handleBnbClaim(newBnbClaimEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BnbClaim created and stored", () => {
    assert.entityCount("BnbClaim", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BnbClaim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "account",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BnbClaim",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bnb",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
