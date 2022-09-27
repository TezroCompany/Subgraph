import { BigInt } from "@graphprotocol/graph-ts"
import {
  BnbClaim as BnbClaimEvent,
  Harvest as HarvestEvent,
  LPClaim as LPClaimEvent,
  TopcornAllocation as TopcornAllocationEvent,
  TopcornClaim as TopcornClaimEvent
} from "../generated/ClaimFacet/ClaimFacet"
import {
  BnbClaim,
  Harvest,
  LPClaim,
  TopcornAllocation,
  TopcornClaim,
} from "../generated/schema"
import { getSiloWithdraw } from "./utils/common/silo-withdraw"

export function handleBnbClaim(event: BnbClaimEvent): void {
  let entity = new BnbClaim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.bnb = event.params.bnb
  entity.save()
}

export function handleHarvest(event: HarvestEvent): void {
  let entity = new Harvest(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.plots = event.params.plots
  entity.topcorns = event.params.topcorns
  entity.save()
}

export function handleLPClaim(event: LPClaimEvent): void {
  let entity = new LPClaim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.withdrawals = event.params.withdrawals
  entity.lp = event.params.lp
  entity.save()

  for (let i = 0; i < event.params.withdrawals.length; i++) {
    let id = (event.params.account.toHexString() + '-' + event.params.withdrawals[i].toString())
    let withdraws = getSiloWithdraw(id, event.params.account, event.params.withdrawals[i])
    withdraws.lp = BigInt.fromI32(0)
    withdraws.save()
  }
}

export function handleTopcornAllocation(event: TopcornAllocationEvent): void {
  let entity = new TopcornAllocation(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.topcorns = event.params.topcorns
  entity.save()
}

export function handleTopcornClaim(event: TopcornClaimEvent): void {
  let entity = new TopcornClaim(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.withdrawals = event.params.withdrawals
  entity.topcorns = event.params.topcorns
  entity.save()

  for (let i = 0; i < event.params.withdrawals.length; i++) {
    let id = (event.params.account.toHexString() + '-' + event.params.withdrawals[i].toString())
    let withdraws = getSiloWithdraw(id, event.params.account, event.params.withdrawals[i])
    withdraws.topcorn = BigInt.fromI32(0)
    withdraws.save()
  }
}
