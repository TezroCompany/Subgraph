import { BigInt } from "@graphprotocol/graph-ts"
import { Sunrise } from "../../../generated/schema"
import { ZERO, ZERO_BI } from "../constants"

export function getSunrise(season: BigInt): Sunrise {
    let entity = Sunrise.load(season.toString())
    if (entity == null) {
        entity = new Sunrise(season.toString())
        entity.season = season
        entity.caseId = ZERO_BI
        entity.change = ZERO
        entity.currentYield = ZERO_BI
        entity.price = ZERO_BI
        entity.newSoil = ZERO_BI
        entity.newHarvestable = ZERO_BI
        entity.newSilo = ZERO_BI
        entity.bnb = ZERO_BI
        entity.harvestableSop = ZERO_BI
        entity.totalHarvestable = ZERO_BI
        entity.totalNewTopcorns = ZERO_BI
        entity.podRate = ZERO_BI
        entity.supply = ZERO_BI
        entity.stalk = ZERO_BI
        entity.seeds = ZERO_BI
        entity.podIndex = ZERO_BI
        entity.harvestableIndex = ZERO_BI
        entity.totalLiquidityUSD = ZERO_BI
    }
    return entity
}