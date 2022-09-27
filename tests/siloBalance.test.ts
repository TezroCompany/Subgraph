import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, Entity, store } from "@graphprotocol/graph-ts"
import { handleSiloFacetLPDeposit, handleTopcornDeposit, handleLPWithdraw, handleTopcornWithdraw } from "../src/silo-facet"
import { createSiloFacetLPDepositEvent, createTopcornDepositEvent, createLPWithdrawEvent, createTopcornWithdrawEvent } from "./silo-facet-utils"
import { handleLPRemove, handleTopcornRemove } from "../src/convert-facet"
import { createLPRemoveEvent, createTopcornRemoveEvent } from "./convert-facet-utils"
import { handleLPClaim, handleTopcornClaim } from "../src/claim-facet"
import { createLPClaimEvent, createTopcornClaimEvent } from "./claim-facet-utils"
import { log } from '@graphprotocol/graph-ts'

function checkEventSiloDeposit(countEvents: BigInt, account: Address, season: BigInt, topcorn: BigInt, lp: BigInt): boolean {
    let id = account.toHexString() + '-' + season.toString()

    assert.entityCount("SiloDeposit", countEvents.toI32())

    assert.fieldEquals(
        "SiloDeposit", id,
        "account", account.toHexString()
    )

    assert.fieldEquals(
        "SiloDeposit", id,
        "season", season.toString()
    )

    assert.fieldEquals(
        "SiloDeposit", id,
        "topcorn", topcorn.toString()
    )

    assert.fieldEquals(
        "SiloDeposit", id,
        "lp", lp.toString()
    )
    return false;

}

function checkEventSiloWithdraw(countEvents: BigInt, account: Address, season: BigInt, topcorn: BigInt, lp: BigInt): boolean {
    let id = account.toHexString() + '-' + season.toString()

    assert.entityCount("SiloWithdraw", countEvents.toI32())

    assert.fieldEquals(
        "SiloWithdraw", id,
        "account", account.toHexString()
    )

    assert.fieldEquals(
        "SiloWithdraw", id,
        "season", season.toString()
    )

    assert.fieldEquals(
        "SiloWithdraw", id,
        "topcorn", topcorn.toString()
    )

    assert.fieldEquals(
        "SiloWithdraw", id,
        "lp", lp.toString()
    )
    return false;

}

function newSeason(): boolean {
    season++

    for (let i = 0; i < countUsers; i++) {
        S_topcornD[i][season] = BigInt.fromI32(0)
        S_lpD[i][season] = BigInt.fromI32(0)
        S_topcornW[i][season] = BigInt.fromI32(0)
        S_lpW[i][season] = BigInt.fromI32(0)
    }

    return false;
}



const countUsers = 3;

let S_topcornD: BigInt[][] = [[], [], []]
let S_lpD: BigInt[][] = [[], [], []];
let S_topcornW: BigInt[][] = [[], [], []];
let S_lpW: BigInt[][] = [[], [], []];


let season = 0
let user1 = Address.fromString("0x0000000000000000000000000000000000000001")
let user2 = Address.fromString("0x0000000000000000000000000000000000000002")
let user3 = Address.fromString("0x0000000000000000000000000000000000000003")
for (let i = 0; i < countUsers; i++) {
    S_topcornD[i][season] = BigInt.fromI32(0)
    S_lpD[i][season] = BigInt.fromI32(0)
    S_topcornW[i][season] = BigInt.fromI32(0)
    S_lpW[i][season] = BigInt.fromI32(0)
}

describe("Test SiloDeposit and SiloWithdraw", () => {

    describe("Test SiloDeposit", function () {



        beforeAll(() => {
            clearStore()
        })

        test("1) user1 deposited for one season", () => {

            let topcornD = S_topcornD[0][season]
            let lpD = S_lpD[0][season]
            let topcornD_To = topcornD
            let lpD_To = lpD
            let topcornW = S_topcornW[0][season]
            let lpW = S_lpW[0][season]
            let topcornW_To = topcornW
            let lpW_To = lpW


            lpD_To = lpD.plus(BigInt.fromI32(3))
            let depositsLP = createSiloFacetLPDepositEvent(user1, BigInt.fromI32(season), lpD_To.minus(lpD), lpD_To.minus(lpD))
            handleSiloFacetLPDeposit(depositsLP)
            lpD = lpD_To
            checkEventSiloDeposit(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornD, lpD)


            topcornD_To = topcornD.plus(BigInt.fromI32(10))
            let depositsTopcorn = createTopcornDepositEvent(user1, BigInt.fromI32(season), topcornD_To.minus(topcornD))
            handleTopcornDeposit(depositsTopcorn)
            topcornD = topcornD_To
            checkEventSiloDeposit(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornD, lpD)




            lpD_To = lpD.minus(BigInt.fromI32(1))
            lpW_To = lpW.plus(BigInt.fromI32(1))
            let removesLP = createLPRemoveEvent(user1, [BigInt.fromI32(season)], [lpD.minus(lpD_To)], lpD.minus(lpD_To))
            let withdrawalsLP = createLPWithdrawEvent(user1, BigInt.fromI32(season), lpW_To.minus(lpW))
            handleLPRemove(removesLP)
            handleLPWithdraw(withdrawalsLP)
            lpD = lpD_To
            lpW = lpW_To
            checkEventSiloDeposit(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornD, lpD)
            checkEventSiloWithdraw(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornW, lpW)


            topcornD_To = topcornD.minus(BigInt.fromI32(1))
            topcornW_To = topcornW.plus(BigInt.fromI32(1))
            let removesTopcorns = createTopcornRemoveEvent(user1, [BigInt.fromI32(season)], [topcornD.minus(topcornD_To)], topcornD.minus(topcornD_To))
            let withdrawalsTopcorns = createTopcornWithdrawEvent(user1, BigInt.fromI32(season), topcornW_To.minus(topcornW))
            handleTopcornRemove(removesTopcorns)
            handleTopcornWithdraw(withdrawalsTopcorns)
            topcornD = topcornD_To
            topcornW = topcornW_To
            checkEventSiloDeposit(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornD, lpD)
            checkEventSiloWithdraw(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornW, lpW)



            lpW_To = BigInt.fromI32(0)
            let claimLP = createLPClaimEvent(user1, [BigInt.fromI32(season)], lpW.minus(lpW_To))
            handleLPClaim(claimLP)
            lpW = lpW_To
            checkEventSiloWithdraw(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornW, lpW)

            topcornW_To = BigInt.fromI32(0)
            let claimTopcrons = createTopcornClaimEvent(user1, [BigInt.fromI32(season)], topcornW.minus(topcornW_To))
            handleTopcornClaim(claimTopcrons)
            topcornW = topcornW_To
            checkEventSiloWithdraw(BigInt.fromI32(1), user1, BigInt.fromI32(season), topcornW, lpW)

            S_topcornD[0][season] = topcornD
            S_lpD[0][season] = lpD
            S_topcornW[0][season] = topcornW
            S_lpW[0][season] = lpW

        })

        test("2) user1 deposited for next season", () => {

            newSeason();
            let topcornD = S_topcornD[0][season]
            let lpD = S_lpD[0][season]
            let topcornD_To = topcornD
            let lpD_To = lpD
            let topcornW = S_topcornW[0][season]
            let lpW = S_lpW[0][season]
            let topcornW_To = topcornW
            let lpW_To = lpW

            lpD_To = lpD.plus(BigInt.fromI32(3))
            let depositsLP = createSiloFacetLPDepositEvent(user1, BigInt.fromI32(season), lpD_To.minus(lpD), lpD_To.minus(lpD))
            handleSiloFacetLPDeposit(depositsLP)
            lpD = lpD_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)


            topcornD_To = topcornD.plus(BigInt.fromI32(10))
            let depositsTopcorn = createTopcornDepositEvent(user1, BigInt.fromI32(season), topcornD_To.minus(topcornD))
            handleTopcornDeposit(depositsTopcorn)
            topcornD = topcornD_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)




            lpD_To = lpD.minus(BigInt.fromI32(1))
            lpW_To = lpW.plus(BigInt.fromI32(1))
            let removesLP = createLPRemoveEvent(user1, [BigInt.fromI32(season)], [lpD.minus(lpD_To)], lpD.minus(lpD_To))
            let withdrawalsLP = createLPWithdrawEvent(user1, BigInt.fromI32(season), lpW_To.minus(lpW))
            handleLPRemove(removesLP)
            handleLPWithdraw(withdrawalsLP)
            lpD = lpD_To
            lpW = lpW_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)
            checkEventSiloWithdraw(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornW, lpW)


            topcornD_To = topcornD.minus(BigInt.fromI32(1))
            topcornW_To = topcornW.plus(BigInt.fromI32(1))
            let removesTopcorns = createTopcornRemoveEvent(user1, [BigInt.fromI32(season)], [topcornD.minus(topcornD_To)], topcornD.minus(topcornD_To))
            let withdrawalsTopcorns = createTopcornWithdrawEvent(user1, BigInt.fromI32(season), topcornW_To.minus(topcornW))
            handleTopcornRemove(removesTopcorns)
            handleTopcornWithdraw(withdrawalsTopcorns)
            topcornD = topcornD_To
            topcornW = topcornW_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)
            checkEventSiloWithdraw(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornW, lpW)



            lpW_To = BigInt.fromI32(0)
            let claimLP = createLPClaimEvent(user1, [BigInt.fromI32(season)], lpW.minus(lpW_To))
            handleLPClaim(claimLP)
            lpW = lpW_To
            checkEventSiloWithdraw(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornW, lpW)

            topcornW_To = BigInt.fromI32(0)
            let claimTopcrons = createTopcornClaimEvent(user1, [BigInt.fromI32(season)], topcornW.minus(topcornW_To))
            handleTopcornClaim(claimTopcrons)
            topcornW = topcornW_To
            checkEventSiloWithdraw(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornW, lpW)

            S_topcornD[0][season] = topcornD
            S_lpD[0][season] = lpD
            S_topcornW[0][season] = topcornW
            S_lpW[0][season] = lpW

        })

        test("3) user1 deposited for two season", () => {

            let topcornD = S_topcornD[0][season]
            let lpD = S_lpD[0][season]
            let topcornD_To = topcornD
            let lpD_To = lpD
            let topcornW = S_topcornW[0][season]
            let lpW = S_lpW[0][season]
            let topcornW_To = topcornW
            let lpW_To = lpW

            lpD_To = lpD.plus(BigInt.fromI32(3))
            let depositsLP = createSiloFacetLPDepositEvent(user1, BigInt.fromI32(season), lpD_To.minus(lpD), lpD_To.minus(lpD))
            handleSiloFacetLPDeposit(depositsLP)
            lpD = lpD_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)


            topcornD_To = topcornD.plus(BigInt.fromI32(10))
            let depositsTopcorn = createTopcornDepositEvent(user1, BigInt.fromI32(season), topcornD_To.minus(topcornD))
            handleTopcornDeposit(depositsTopcorn)
            topcornD = topcornD_To
            checkEventSiloDeposit(BigInt.fromI32(2), user1, BigInt.fromI32(season), topcornD, lpD)

            S_topcornD[0][season] = topcornD
            S_lpD[0][season] = lpD
            S_topcornW[0][season] = topcornW
            S_lpW[0][season] = lpW

            newSeason();
            topcornD = S_topcornD[0][season]
            lpD = S_lpD[0][season]
            topcornD_To = topcornD
            lpD_To = lpD
            topcornW = S_topcornW[0][season]
            lpW = S_lpW[0][season]
            topcornW_To = topcornW
            lpW_To = lpW

            lpD_To = lpD.plus(BigInt.fromI32(3))
            depositsLP = createSiloFacetLPDepositEvent(user1, BigInt.fromI32(season), lpD_To.minus(lpD), lpD_To.minus(lpD))
            handleSiloFacetLPDeposit(depositsLP)
            lpD = lpD_To
            checkEventSiloDeposit(BigInt.fromI32(3), user1, BigInt.fromI32(season), topcornD, lpD)


            topcornD_To = topcornD.plus(BigInt.fromI32(10))
            depositsTopcorn = createTopcornDepositEvent(user1, BigInt.fromI32(season), topcornD_To.minus(topcornD))
            handleTopcornDeposit(depositsTopcorn)
            topcornD = topcornD_To
            checkEventSiloDeposit(BigInt.fromI32(3), user1, BigInt.fromI32(season), topcornD, lpD)


            S_topcornD[0][season] = topcornD
            S_lpD[0][season] = lpD
            S_topcornW[0][season] = topcornW
            S_lpW[0][season] = lpW

        })
    })
})