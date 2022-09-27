import { BigInt } from "@graphprotocol/graph-ts"
import { SeasonSnapshot } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSeasonSnapshot(id: BigInt): SeasonSnapshot {
    let entity = SeasonSnapshot.load(id.toString())
    if (entity == null) {
        entity = new SeasonSnapshot(id.toString())
        entity.season = id
        entity.price = ZERO_BI
        entity.supply = ZERO_BI
        entity.stalk = ZERO_BI
        entity.seeds = ZERO_BI
        entity.podIndex = ZERO_BI
        entity.harvestableIndex = ZERO_BI
        entity.totalLiquidityUSD = ZERO_BI
        entity.save()
    }
    return entity
}