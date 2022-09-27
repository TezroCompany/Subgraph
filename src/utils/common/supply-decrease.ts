import { BigInt } from "@graphprotocol/graph-ts"
import { SupplyDecrease } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSupplyDecrease(season: BigInt, isCreate: boolean = true): SupplyDecrease | null {
    let entity = SupplyDecrease.load(season.toString())
    if (entity == null && isCreate) {
        entity = new SupplyDecrease(season.toString())
        entity.season = season
        entity.price = ZERO_BI
        entity.newSoil = ZERO_BI
    }
    return entity
}