import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Incentivization,
  PodRateSnapshot,
  SeasonOfPlenty,
  SeasonSnapshot,
  Sunrise,
  SupplyDecrease,
  SupplyIncrease,
  SupplyNeutral,
  WeatherChange
} from "../generated/SeasonFacet/SeasonFacet"

export function createIncentivizationEvent(
  account: Address,
  topcorns: BigInt,
  incentive: BigInt,
  feeInBnb: BigInt
): Incentivization {
  let incentivizationEvent = changetype<Incentivization>(newMockEvent())

  incentivizationEvent.parameters = new Array()

  incentivizationEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  incentivizationEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )
  incentivizationEvent.parameters.push(
    new ethereum.EventParam(
      "incentive",
      ethereum.Value.fromUnsignedBigInt(incentive)
    )
  )
  incentivizationEvent.parameters.push(
    new ethereum.EventParam(
      "feeInBnb",
      ethereum.Value.fromUnsignedBigInt(feeInBnb)
    )
  )

  return incentivizationEvent
}

export function createPodRateSnapshotEvent(
  season: BigInt,
  podRate: BigInt
): PodRateSnapshot {
  let podRateSnapshotEvent = changetype<PodRateSnapshot>(newMockEvent())

  podRateSnapshotEvent.parameters = new Array()

  podRateSnapshotEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  podRateSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "podRate",
      ethereum.Value.fromUnsignedBigInt(podRate)
    )
  )

  return podRateSnapshotEvent
}

export function createSeasonOfPlentyEvent(
  season: BigInt,
  bnb: BigInt,
  harvestable: BigInt
): SeasonOfPlenty {
  let seasonOfPlentyEvent = changetype<SeasonOfPlenty>(newMockEvent())

  seasonOfPlentyEvent.parameters = new Array()

  seasonOfPlentyEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  seasonOfPlentyEvent.parameters.push(
    new ethereum.EventParam("bnb", ethereum.Value.fromUnsignedBigInt(bnb))
  )
  seasonOfPlentyEvent.parameters.push(
    new ethereum.EventParam(
      "harvestable",
      ethereum.Value.fromUnsignedBigInt(harvestable)
    )
  )

  return seasonOfPlentyEvent
}

export function createSeasonSnapshotEvent(
  season: BigInt,
  price: BigInt,
  supply: BigInt,
  stalk: BigInt,
  seeds: BigInt,
  podIndex: BigInt,
  harvestableIndex: BigInt
): SeasonSnapshot {
  let seasonSnapshotEvent = changetype<SeasonSnapshot>(newMockEvent())

  seasonSnapshotEvent.parameters = new Array()

  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam("supply", ethereum.Value.fromUnsignedBigInt(supply))
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam("stalk", ethereum.Value.fromUnsignedBigInt(stalk))
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam("seeds", ethereum.Value.fromUnsignedBigInt(seeds))
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "podIndex",
      ethereum.Value.fromUnsignedBigInt(podIndex)
    )
  )
  seasonSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "harvestableIndex",
      ethereum.Value.fromUnsignedBigInt(harvestableIndex)
    )
  )

  return seasonSnapshotEvent
}

export function createSunriseEvent(season: BigInt): Sunrise {
  let sunriseEvent = changetype<Sunrise>(newMockEvent())

  sunriseEvent.parameters = new Array()

  sunriseEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )

  return sunriseEvent
}

export function createSupplyDecreaseEvent(
  season: BigInt,
  price: BigInt,
  newSoil: BigInt
): SupplyDecrease {
  let supplyDecreaseEvent = changetype<SupplyDecrease>(newMockEvent())

  supplyDecreaseEvent.parameters = new Array()

  supplyDecreaseEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  supplyDecreaseEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  supplyDecreaseEvent.parameters.push(
    new ethereum.EventParam("newSoil", ethereum.Value.fromSignedBigInt(newSoil))
  )

  return supplyDecreaseEvent
}

export function createSupplyIncreaseEvent(
  season: BigInt,
  price: BigInt,
  newHarvestable: BigInt,
  newSilo: BigInt,
  newSoil: BigInt
): SupplyIncrease {
  let supplyIncreaseEvent = changetype<SupplyIncrease>(newMockEvent())

  supplyIncreaseEvent.parameters = new Array()

  supplyIncreaseEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  supplyIncreaseEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  supplyIncreaseEvent.parameters.push(
    new ethereum.EventParam(
      "newHarvestable",
      ethereum.Value.fromUnsignedBigInt(newHarvestable)
    )
  )
  supplyIncreaseEvent.parameters.push(
    new ethereum.EventParam(
      "newSilo",
      ethereum.Value.fromUnsignedBigInt(newSilo)
    )
  )
  supplyIncreaseEvent.parameters.push(
    new ethereum.EventParam("newSoil", ethereum.Value.fromSignedBigInt(newSoil))
  )

  return supplyIncreaseEvent
}

export function createSupplyNeutralEvent(
  season: BigInt,
  newSoil: BigInt
): SupplyNeutral {
  let supplyNeutralEvent = changetype<SupplyNeutral>(newMockEvent())

  supplyNeutralEvent.parameters = new Array()

  supplyNeutralEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  supplyNeutralEvent.parameters.push(
    new ethereum.EventParam("newSoil", ethereum.Value.fromSignedBigInt(newSoil))
  )

  return supplyNeutralEvent
}

export function createWeatherChangeEvent(
  season: BigInt,
  caseId: BigInt,
  change: i32,
  currentYield: BigInt
): WeatherChange {
  let weatherChangeEvent = changetype<WeatherChange>(newMockEvent())

  weatherChangeEvent.parameters = new Array()

  weatherChangeEvent.parameters.push(
    new ethereum.EventParam("season", ethereum.Value.fromUnsignedBigInt(season))
  )
  weatherChangeEvent.parameters.push(
    new ethereum.EventParam("caseId", ethereum.Value.fromUnsignedBigInt(caseId))
  )
  weatherChangeEvent.parameters.push(
    new ethereum.EventParam("change", ethereum.Value.fromI32(change))
  )
  weatherChangeEvent.parameters.push(
    new ethereum.EventParam(
      "currentYield",
      ethereum.Value.fromUnsignedBigInt(currentYield)
    )
  )

  return weatherChangeEvent
}
