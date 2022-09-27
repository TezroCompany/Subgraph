import {
  Incentivization as IncentivizationEvent,
  PodRateSnapshot as PodRateSnapshotEvent,
  SeasonOfPlenty as SeasonOfPlentyEvent,
  SeasonSnapshot as SeasonSnapshotEvent,
  Sunrise as SunriseEvent,
  SupplyDecrease as SupplyDecreaseEvent,
  SupplyIncrease as SupplyIncreaseEvent,
  SupplyNeutral as SupplyNeutralEvent,
  WeatherChange as WeatherChangeEvent
} from "../generated/SeasonFacet/SeasonFacet"
import {
  Incentivization,
  PodRateSnapshot,
  PodListing,
  HelperMarketplace,
  PodOrder,
} from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"
import { getSeasonSnapshot } from './utils/common/season-snapshot'
import { getSupplyDecrease } from './utils/common/supply-decrease'
import { getSupplyIncrease } from './utils/common/supply-increase'
import { getSupplyNeutral } from './utils/common/supply-neutral'
import { getSunrise } from './utils/common/sunrise'
import { getSeasonOfPlenty } from "./utils/common/season-of-plenty"
import { getWeatherChange } from "./utils/common/weather-change"
import { ONE_BI, ZERO_BI } from "./utils/constants"
import { getPodRateSnapshot } from "./utils/common/podrate-snapshot"

export function handleIncentivization(event: IncentivizationEvent): void {
  let entity = new Incentivization(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.topcorns = event.params.topcorns
  entity.incentive = event.params.incentive
  entity.feeInBnb = event.params.feeInBnb
  entity.save()
}

export function handlePodRateSnapshot(event: PodRateSnapshotEvent): void {
  let entity = getPodRateSnapshot(event.params.season)
  entity.podRate = event.params.podRate
  entity.save()
}

export function handleSeasonOfPlenty(event: SeasonOfPlentyEvent): void {
  let entity = getSeasonOfPlenty(event.params.season)

  if (entity !== null) {
    entity.bnb = event.params.bnb
    entity.harvestable = event.params.harvestable
    entity.save()
  }

  let helpM = helperMarket();
  if (helpM.season == event.params.season) {
    helpM.harvestableIndex = helpM.harvestableIndex.plus(event.params.harvestable);
  }
  helpM.save()
  updatePods(helpM)
}

export function handleSeasonSnapshot(event: SeasonSnapshotEvent): void {
  let entity = getSeasonSnapshot(event.params.season)
  entity.price = event.params.price
  entity.supply = event.params.supply
  entity.stalk = event.params.stalk
  entity.seeds = event.params.seeds
  entity.podIndex = event.params.podIndex
  entity.harvestableIndex = event.params.harvestableIndex
  entity.totalLiquidityUSD = event.params.totalLiquidityUSD
  entity.save()

  let helpM = helperMarket();
  helpM.harvestableIndex = event.params.harvestableIndex;
  helpM.season = event.params.season;
  helpM.save()
  updatePods(helpM)
}

export function handleSunrise(event: SunriseEvent): void {
  let entity = getSunrise(event.params.season)

  let supplyDecrease = getSupplyDecrease(event.params.season, false)
  let supplyIncrease = getSupplyIncrease(event.params.season, false)
  let supplyNeutral = getSupplyNeutral(event.params.season, false)
  let sop = getSeasonOfPlenty(event.params.season, false)
  let weatherChange = getWeatherChange(event.params.season)
  let podRateSnapshot = getPodRateSnapshot(event.params.season)
  let seasonSnapshot = getSeasonSnapshot(event.params.season)

  if (sop !== null) {
    entity.bnb = sop.bnb
    entity.harvestableSop = sop.harvestable
    entity.totalHarvestable = entity.totalHarvestable.plus(sop.harvestable)
  }

  if (supplyDecrease !== null) {
    entity.newSoil = supplyDecrease.newSoil
    entity.newHarvestable = ZERO_BI
    entity.newSilo = ZERO_BI
    entity.price = supplyDecrease.price
  } else if (supplyIncrease !== null) {
    entity.newSoil = supplyIncrease.newSoil
    entity.newHarvestable = supplyIncrease.newHarvestable
    entity.newSilo = supplyIncrease.newSilo
    entity.price = supplyIncrease.price
    entity.totalHarvestable = entity.totalHarvestable.plus(supplyIncrease.newHarvestable)
  } else if (supplyNeutral !== null){
    entity.newSoil = supplyNeutral.newSoil
    entity.newHarvestable = ZERO_BI
    entity.newSilo = ZERO_BI
    entity.price = ONE_BI
  }
  
  // Silo + Field
  entity.totalNewTopcorns = entity.totalHarvestable.plus(entity.newSilo)

  entity.caseId = weatherChange.caseId
  entity.change = weatherChange.change
  entity.currentYield = weatherChange.currentYield
  entity.podRate = podRateSnapshot.podRate
  entity.supply = seasonSnapshot.supply
  entity.stalk = seasonSnapshot.stalk
  entity.seeds = seasonSnapshot.seeds
  entity.podIndex = seasonSnapshot.podIndex
  entity.harvestableIndex = seasonSnapshot.harvestableIndex
  entity.totalLiquidityUSD = seasonSnapshot.totalLiquidityUSD

  entity.save()
}

export function handleSupplyDecrease(event: SupplyDecreaseEvent): void {
  let entity = getSupplyDecrease(event.params.season)
  if (entity !== null) {
    entity.price = event.params.price
    entity.newSoil = event.params.newSoil
    entity.save()
  }
}

export function handleSupplyIncrease(event: SupplyIncreaseEvent): void {
  let entity = getSupplyIncrease(event.params.season)
  if (entity !== null) {
    entity.season = event.params.season
    entity.price = event.params.price
    entity.newHarvestable = event.params.newHarvestable
    entity.newSilo = event.params.newSilo
    entity.newSoil = event.params.newSoil
    entity.save()
  }

  let helpM = helperMarket();
  if (helpM.season == event.params.season) {
    helpM.harvestableIndex = helpM.harvestableIndex.plus(event.params.newHarvestable);
  }
  helpM.save()
  updatePods(helpM)
}

export function handleSupplyNeutral(event: SupplyNeutralEvent): void {
  let entity = getSupplyNeutral(event.params.season)
  if (entity !== null) {
    entity.newSoil = event.params.newSoil
    entity.save()
  }
}

export function handleWeatherChange(event: WeatherChangeEvent): void {
  let entity = getWeatherChange(event.params.season)
  entity.caseId = event.params.caseId
  entity.change = event.params.change
  entity.currentYield = event.params.currentYield
  entity.save()
}

function helperMarket(): HelperMarketplace {
  let marketplace = HelperMarketplace.load("0")
  if (marketplace == null) {
    marketplace = new HelperMarketplace("0")
    marketplace.season = BigInt.fromI32(0);
    marketplace.harvestableIndex = BigInt.fromI32(0);
    marketplace.listings = []
    marketplace.orders = []
  }
  return marketplace
}

function updatePods(helpM: HelperMarketplace): boolean {
  for (let i = 0; i < helpM.listings.length; i++) {
    let listing = PodListing.load(helpM.listings[i])
    if (listing == null) {
      listing = new PodListing(helpM.listings[i])
    }

    if (listing.status == "opened") {
      listing.expiresIn = listing.maxHarvestableIndex.minus(helpM.harvestableIndex)
      if (listing.expiresIn.le(BigInt.fromI32(0))) {
        listing.status = "overdue"
        listing.expiresIn = BigInt.fromI32(0)
      }
    }
    listing.save()
  }

  for (let i = 0; i < helpM.orders.length; i++) {
    let orders = PodOrder.load(helpM.orders[i])
    if (orders == null) {
      orders = new PodOrder(helpM.orders[i])
    }
    if (orders.status == "opened") {
      orders.PlaceInLineTo = helpM.harvestableIndex.plus(orders.maxPlaceInLine)
    }
    orders.save()
  }
  return false;
}