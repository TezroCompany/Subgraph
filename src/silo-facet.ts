import {
  SiloFacetLPDeposit as SiloFacetLPDepositEvent,
  SiloFacetLPRemove as SiloFacetLPRemoveEvent,
  LPWithdraw as LPWithdrawEvent,
  SiloFacetTopcornAllocation as SiloFacetTopcornAllocationEvent,
  TopcornDeposit as TopcornDepositEvent,
  SiloFacetTopcornRemove as SiloFacetTopcornRemoveEvent,
  TopcornWithdraw as TopcornWithdrawEvent
} from "../generated/SiloFacet/SiloFacet"
import {
  LPDeposit,
  LPRemove,
  LPWithdraw,
  TopcornAllocation,
  TopcornDeposit,
  TopcornRemove,
  TopcornWithdraw,
} from "../generated/schema"
import { GET_STALK_PER_LP_SEED, SEEDS_FOR_LP, SEEDS_FOR_TOKEN, STALKS, ZERO_BI } from "./utils/constants"
import { getSiloDeposit } from "./utils/common/silo-deposit"
import { getSiloWithdraw } from "./utils/common/silo-withdraw"
import { helperMarket } from "./utils/common/helper"

export function handleSiloFacetLPDeposit(event: SiloFacetLPDepositEvent): void {
    let entity = new LPDeposit(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.season = event.params.season
    entity.lp = event.params.lp
    entity.seeds = event.params.seeds
    entity.save()

    let id = (event.params.account.toHexString() + '-' + event.params.season.toString())
    let deposits = getSiloDeposit(id, event.params.account, event.params.season)
    deposits.lp = deposits.lp.plus(event.params.lp)

    deposits.seedsLp = deposits.seedsLp.plus(event.params.seeds)
    let stalks = event.params.seeds.div(SEEDS_FOR_LP).times(STALKS)
    deposits.stalksLp = deposits.stalksLp.plus(stalks)

    deposits.stalks = deposits.stalks.plus(stalks)
    deposits.seeds = deposits.seeds.plus(event.params.seeds)

    deposits.save()
}

export function handleSiloFacetLPRemove(event: SiloFacetLPRemoveEvent): void {
    let entity = new LPRemove(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.crates = event.params.crates
    entity.crateLP = event.params.crateLP
    entity.lp = event.params.lp
    entity.stalkRemoved = event.params.stalkRemoved
    entity.seedsRemoved = event.params.seedsRemoved
    entity.save()

    for (let i = 0; i < event.params.crates.length; i++) {
      let id = (event.params.account.toHexString() + '-' + event.params.crates[i].toString())
      let deposits = getSiloDeposit(id, event.params.account, event.params.crates[i])

      let amount = event.params.crateLP[i].lt(deposits.lp) ? event.params.crateLP[i] : deposits.lp
      let seeds = event.params.crateLP[i].lt(deposits.lp) ? amount.times(deposits.seedsLp).div(deposits.lp) : deposits.seedsLp

      const helper = helperMarket();
      let stalks = (seeds.times(GET_STALK_PER_LP_SEED)).plus(seeds.times(helper.season.minus(event.params.crates[i])))

      deposits.stalksLp = deposits.stalksLp.minus(stalks)
      deposits.seedsLp = deposits.seedsLp.minus(seeds)
      deposits.lp = deposits.lp.minus(amount)

      deposits.stalks = deposits.stalks.minus(stalks)
      deposits.seeds = deposits.seeds.minus(seeds)

      deposits.save()
    }
}

export function handleLPWithdraw(event: LPWithdrawEvent): void {
  let entity = new LPWithdraw(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.season = event.params.season
  entity.lp = event.params.lp
  entity.save()

  let id = (event.params.account.toHexString() + '-' + event.params.season.toString())
  let withdraws = getSiloWithdraw(id, event.params.account, event.params.season)
  withdraws.lp = withdraws.lp.plus(event.params.lp)
  withdraws.save()
}

export function handleSiloFacetTopcornAllocation(
  event: SiloFacetTopcornAllocationEvent
): void {
    let entity = new TopcornAllocation(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.topcorns = event.params.topcorns
    entity.save()
}

export function handleTopcornDeposit(event: TopcornDepositEvent): void {
    let entity = new TopcornDeposit(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.season = event.params.season
    entity.topcorns = event.params.topcorns
    entity.save()

    let id = (event.params.account.toHexString() + '-' + event.params.season.toString())
    
    let deposits = getSiloDeposit(id, event.params.account, event.params.season)
    deposits.topcorn = deposits.topcorn.plus(event.params.topcorns)
    
    let seeds = event.params.topcorns.times(SEEDS_FOR_TOKEN)
    deposits.seedsTopcorn = deposits.seedsTopcorn.plus(seeds)
    let stalks = event.params.topcorns.times(STALKS)
    deposits.stalksTopcorn = deposits.stalksTopcorn.plus(stalks)
    
    deposits.stalks = deposits.stalks.plus(stalks)
    deposits.seeds = deposits.seeds.plus(seeds)

    deposits.save()
}

export function handleSiloFacetTopcornRemove(
  event: SiloFacetTopcornRemoveEvent
): void {
    let entity = new TopcornRemove(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.crates = event.params.crates
    entity.crateTopcorns = event.params.crateTopcorns
    entity.topcorns = event.params.topcorns
    entity.stalkRemoved = event.params.stalkRemoved
    entity.seedsRemoved = event.params.seedsRemoved
    entity.save()

    const helper = helperMarket();

    for (let i = 0; i < event.params.crates.length; i++) {
      let id = (event.params.account.toHexString() + '-' + event.params.crates[i].toString())
      let deposits = getSiloDeposit(id, event.params.account, event.params.crates[i])
      deposits.topcorn = deposits.topcorn.minus(event.params.crateTopcorns[i])
      
      let seeds = event.params.crateTopcorns[i].times(SEEDS_FOR_TOKEN)
      deposits.seedsTopcorn = deposits.seedsTopcorn.minus(seeds)
      let stalks = (event.params.crateTopcorns[i].times(STALKS)).plus(seeds.times(helper.season.minus(event.params.crates[i])))
      deposits.stalksTopcorn = deposits.stalksTopcorn.minus(stalks)
      
      deposits.stalks = deposits.stalks.minus(stalks)
      deposits.seeds = deposits.seeds.minus(seeds)
      
      deposits.save()
    }
}

export function handleTopcornWithdraw(event: TopcornWithdrawEvent): void {
    let entity = new TopcornWithdraw(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    entity.account = event.params.account
    entity.season = event.params.season
    entity.topcorns = event.params.topcorns
    entity.save()

    let id = (event.params.account.toHexString() + '-' + event.params.season.toString())
    let withdraws = getSiloWithdraw(id, event.params.account, event.params.season)
    withdraws.topcorn = withdraws.topcorn.plus(event.params.topcorns)
    withdraws.save()
}