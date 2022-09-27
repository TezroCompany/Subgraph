import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  SiloFacetLPDeposit,
  SiloFacetLPRemove,
  LPWithdraw,
  SiloFacetTopcornAllocation,
  TopcornDeposit,
  SiloFacetTopcornRemove,
  TopcornWithdraw
} from "../generated/SiloFacet/SiloFacet"

export function createSiloFacetLPDepositEvent(
  account: Address,
  season: BigInt,
  lp: BigInt,
  seeds: BigInt
): SiloFacetLPDeposit {
  let siloFacetLpDepositEvent = changetype<SiloFacetLPDeposit>(newMockEvent())

  siloFacetLpDepositEvent.parameters = new Array()

  siloFacetLpDepositEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  siloFacetLpDepositEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  siloFacetLpDepositEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )
  siloFacetLpDepositEvent.parameters.push(
    new ethereum.EventParam("seeds", ethereum.Value.fromUnsignedBigInt(seeds))
  )

  return siloFacetLpDepositEvent
}

export function createSiloFacetLPRemoveEvent(
  account: Address,
  crates: Array<BigInt>,
  crateLP: Array<BigInt>,
  lp: BigInt
): SiloFacetLPRemove {
  let siloFacetLpRemoveEvent = changetype<SiloFacetLPRemove>(newMockEvent())

  siloFacetLpRemoveEvent.parameters = new Array()

  siloFacetLpRemoveEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  siloFacetLpRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crates",
      ethereum.Value.fromUnsignedBigIntArray(crates)
    )
  )
  siloFacetLpRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crateLP",
      ethereum.Value.fromUnsignedBigIntArray(crateLP)
    )
  )
  siloFacetLpRemoveEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )

  return siloFacetLpRemoveEvent
}

export function createLPWithdrawEvent(
  account: Address,
  season: BigInt,
  lp: BigInt
): LPWithdraw {
  let lpWithdrawEvent = changetype<LPWithdraw>(newMockEvent())

  lpWithdrawEvent.parameters = new Array()

  lpWithdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  lpWithdrawEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  lpWithdrawEvent.parameters.push(
    new ethereum.EventParam("lp", ethereum.Value.fromUnsignedBigInt(lp))
  )

  return lpWithdrawEvent
}

export function createSiloFacetTopcornAllocationEvent(
  account: Address,
  topcorns: BigInt
): SiloFacetTopcornAllocation {
  let siloFacetTopcornAllocationEvent = changetype<SiloFacetTopcornAllocation>(
    newMockEvent()
  )

  siloFacetTopcornAllocationEvent.parameters = new Array()

  siloFacetTopcornAllocationEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  siloFacetTopcornAllocationEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return siloFacetTopcornAllocationEvent
}

export function createTopcornDepositEvent(
  account: Address,
  season: BigInt,
  topcorns: BigInt
): TopcornDeposit {
  let topcornDepositEvent = changetype<TopcornDeposit>(newMockEvent())

  topcornDepositEvent.parameters = new Array()

  topcornDepositEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  topcornDepositEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  topcornDepositEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return topcornDepositEvent
}

export function createSiloFacetTopcornRemoveEvent(
  account: Address,
  crates: Array<BigInt>,
  crateTopcorns: Array<BigInt>,
  topcorns: BigInt
): SiloFacetTopcornRemove {
  let siloFacetTopcornRemoveEvent = changetype<SiloFacetTopcornRemove>(
    newMockEvent()
  )

  siloFacetTopcornRemoveEvent.parameters = new Array()

  siloFacetTopcornRemoveEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  siloFacetTopcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crates",
      ethereum.Value.fromUnsignedBigIntArray(crates)
    )
  )
  siloFacetTopcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "crateTopcorns",
      ethereum.Value.fromUnsignedBigIntArray(crateTopcorns)
    )
  )
  siloFacetTopcornRemoveEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return siloFacetTopcornRemoveEvent
}

export function createTopcornWithdrawEvent(
  account: Address,
  season: BigInt,
  topcorns: BigInt
): TopcornWithdraw {
  let topcornWithdrawEvent = changetype<TopcornWithdraw>(newMockEvent())

  topcornWithdrawEvent.parameters = new Array()

  topcornWithdrawEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  topcornWithdrawEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  topcornWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )

  return topcornWithdrawEvent
}
