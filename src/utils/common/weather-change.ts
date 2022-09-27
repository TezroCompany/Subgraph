import { BigInt } from "@graphprotocol/graph-ts"
import { WeatherChange } from "../../../generated/schema"
import { ZERO, ZERO_BI } from "../constants"

export function getWeatherChange(season: BigInt): WeatherChange {
    let entity = WeatherChange.load(season.toString())
    if (entity == null) {
        entity = new WeatherChange(season.toString())
        entity.season = season
        entity.caseId = ZERO_BI
        entity.change = ZERO
        entity.currentYield = ZERO_BI
    }
    return entity
}