import { BigInt } from "@graphprotocol/graph-ts"
import { SupplyNeutral } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSupplyNeutral(season: BigInt, isCreate: boolean = true): SupplyNeutral | null {
    let entity = SupplyNeutral.load(season.toString())
    if (entity == null && isCreate) {
        entity = new SupplyNeutral(season.toString())
        entity.season = season
        entity.newSoil = ZERO_BI
    }
    return entity
}