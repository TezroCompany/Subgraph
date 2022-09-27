import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  LPDeposit,
  LPRemove,
  TopcornRemove
} from "../generated/ConvertFacet/ConvertFacet"

export function createLPDepositEvent(
  account: Address,
  season: BigInt,
  lp: BigInt,
  seeds: BigInt
): LPDeposit {
  let lpDepositEvent = changetype<LPDeposit>(newMockEvent())

  lpDepositEvent.parameters = new Array()

  lpDepositEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lpDepositEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  lpDepositEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )
  lpDepositEvent.parameters.push(
    new ethereum.EventParam("seeds", ethereum.Value.fromUnsignedBigInt(seeds))
  )

  return lpDepositEvent
}

export function createLPRemoveEvent(
  account: Address,
  crates: Array<BigInt>,
  crateLP: Array<BigInt>,
  lp: BigInt
): LPRemove {
  let lpRemoveEvent = changetype<LPRemove>(newMockEvent())

  lpRemoveEvent.parameters = new Array()

  lpRemoveEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lpRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crates",
      ethereum.Value.fromUnsignedBigIntArray(crates)
    )
  )
  lpRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crateLP",
      ethereum.Value.fromUnsignedBigIntArray(crateLP)
    )
  )
  lpRemoveEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )

  return lpRemoveEvent
}

export function createTopcornRemoveEvent(
  account: Address,
  crates: Array<BigInt>,
  crateTopcorns: Array<BigInt>,
  topcorns: BigInt
): TopcornRemove {
  let topcornRemoveEvent = changetype<TopcornRemove>(newMockEvent())

  topcornRemoveEvent.parameters = new Array()

  topcornRemoveEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  topcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crates",
      ethereum.Value.fromUnsignedBigIntArray(crates)
    )
  )
  topcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crateTopcorns",
      ethereum.Value.fromUnsignedBigIntArray(crateTopcorns)
    )
  )
  topcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return topcornRemoveEvent
}
