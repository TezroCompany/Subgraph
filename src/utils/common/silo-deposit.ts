import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SiloDeposit } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSiloDeposit(id: string, account: Address, season: BigInt): SiloDeposit {
    let deposits = SiloDeposit.load(id)
    if (deposits == null) {
        deposits = new SiloDeposit(id)
        deposits.account = account
        deposits.season = season
        deposits.topcorn = ZERO_BI
        deposits.lp = ZERO_BI
        deposits.stalks = ZERO_BI
        deposits.seeds = ZERO_BI
        deposits.seedsLp = ZERO_BI
        deposits.stalksLp = ZERO_BI
        deposits.seedsTopcorn = ZERO_BI
        deposits.stalksTopcorn = ZERO_BI
    }
    return deposits
}