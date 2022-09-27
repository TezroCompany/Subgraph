import { BigInt } from "@graphprotocol/graph-ts"
import { SupplyIncrease } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSupplyIncrease(season: BigInt, isCreate: boolean = true): SupplyIncrease | null {
    let entity = SupplyIncrease.load(season.toString())
    if (entity == null && isCreate) {
        entity = new SupplyIncrease(season.toString())
        entity.season = season
        entity.price = ZERO_BI
        entity.newHarvestable = ZERO_BI
        entity.newSilo = ZERO_BI
        entity.newSoil = ZERO_BI
    }
    return entity
}