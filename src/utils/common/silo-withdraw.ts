import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SiloWithdraw } from "../../../generated/schema"
import { ZERO_BI } from "../constants"

export function getSiloWithdraw(id: string, account: Address, season: BigInt): SiloWithdraw {
    let deposits = SiloWithdraw.load(id)
    if (deposits == null) {
      deposits = new SiloWithdraw(id)
      deposits.account = account
      deposits.season = season
      deposits.topcorn = ZERO_BI
      deposits.lp = ZERO_BI
    }
    return deposits
}