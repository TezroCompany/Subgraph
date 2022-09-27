import { BigInt } from "@graphprotocol/graph-ts"
import { PodRateSnapshot } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getPodRateSnapshot(id: BigInt): PodRateSnapshot {
    let entity = PodRateSnapshot.load(id.toString())
    if (entity == null) {
        entity = new PodRateSnapshot(id.toString())
        entity.season = id
        entity.podRate = ZERO_BI
        entity.save()
    }
    return entity
}