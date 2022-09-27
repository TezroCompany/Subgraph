import { BigInt } from "@graphprotocol/graph-ts"
import { SeasonOfPlenty } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSeasonOfPlenty(id: BigInt, isCreate: boolean = true): SeasonOfPlenty | null {
    let entity = SeasonOfPlenty.load(id.toString())
    if (entity == null && isCreate) {
        entity = new SeasonOfPlenty(id.toString())
        entity.season = id
        entity.bnb = ZERO_BI
        entity.harvestable = ZERO_BI
        entity.save()
    }
    return entity
}