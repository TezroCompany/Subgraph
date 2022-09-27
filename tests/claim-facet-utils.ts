import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BnbClaim,
  Harvest,
  LPClaim,
  TopcornAllocation,
  TopcornClaim
} from "../generated/ClaimFacet/ClaimFacet"

export function createBnbClaimEvent(account: Address, bnb: BigInt): BnbClaim {
  let bnbClaimEvent = changetype<BnbClaim>(newMockEvent())

  bnbClaimEvent.parameters = new Array()

  bnbClaimEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  bnbClaimEvent.parameters.push(
    new ethereum.EventParam("bnb", ethereum.Value.fromUnsignedBigInt(bnb))
  )

  return bnbClaimEvent
}

export function createHarvestEvent(
  account: Address,
  plots: Array<BigInt>,
  topcorns: BigInt
): Harvest {
  let harvestEvent = changetype<Harvest>(newMockEvent())

  harvestEvent.parameters = new Array()

  harvestEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  harvestEvent.parameters.push(
    new ethereum.EventParam(
      "plots",
      ethereum.Value.fromUnsignedBigIntArray(plots)
    )
  )
  harvestEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return harvestEvent
}

export function createLPClaimEvent(
  account: Address,
  withdrawals: Array<BigInt>,
  lp: BigInt
): LPClaim {
  let lpClaimEvent = changetype<LPClaim>(newMockEvent())

  lpClaimEvent.parameters = new Array()

  lpClaimEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lpClaimEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawals",
      ethereum.Value.fromUnsignedBigIntArray(withdrawals)
    )
  )
  lpClaimEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )

  return lpClaimEvent
}

export function createTopcornAllocationEvent(
  account: Address,
  topcorns: BigInt
): TopcornAllocation {
  let topcornAllocationEvent = changetype<TopcornAllocation>(newMockEvent())

  topcornAllocationEvent.parameters = new Array()

  topcornAllocationEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  topcornAllocationEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return topcornAllocationEvent
}

export function createTopcornClaimEvent(
  account: Address,
  withdrawals: Array<BigInt>,
  topcorns: BigInt
): TopcornClaim {
  let topcornClaimEvent = changetype<TopcornClaim>(newMockEvent())

  topcornClaimEvent.parameters = new Array()

  topcornClaimEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  topcornClaimEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawals",
      ethereum.Value.fromUnsignedBigIntArray(withdrawals)
    )
  )
  topcornClaimEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return topcornClaimEvent
}
