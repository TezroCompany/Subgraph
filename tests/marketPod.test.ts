import {
    assert,
    describe,
    test,
    clearStore,
    beforeAll,
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, Entity, store } from "@graphprotocol/graph-ts"
import { handlePodListingCreated, handlePodListingFilled, handlePodListingCancelled, handlePodOrderCreated, handlePodOrderCancelled, handlePodOrderFilled } from "../src/marketplace-facet"
import { createPodListingCreatedEvent, createPodListingFilledEvent, createPodListingCancelledEvent, createPodOrderCreatedEvent, createPodOrderCancelledEvent, createPodOrderFilledEvent } from "./marketplace-facet-utils"
import { handleSeasonSnapshot } from "../src/season-facet"
import { createSeasonSnapshotEvent } from "./season-facet-utils"
import { log } from '@graphprotocol/graph-ts'

function checkEventPodListing(countEvents: BigInt, index: BigInt, account: Address, start: BigInt, maxHarvestableIndex: BigInt, pricePerPod: BigInt, amount: BigInt, statusEvents: string): boolean {
    let id = account.toHexString() + '-' + index.toString()

    assert.entityCount("PodListing", countEvents.toI32())

    assert.fieldEquals(
        "PodListing", id,
        "account", account.toHexString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "index", index.toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "start", start.toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "maxHarvestableIndex", maxHarvestableIndex.toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "pricePerPod", pricePerPod.toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "amount", amount.toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "expiresIn", (maxHarvestableIndex.minus(harvestableIndex)).toString()
    )

    assert.fieldEquals(
        "PodListing", id,
        "status", statusEvents
    )

    return false;

}

function checkEventPodOrders(countEvents: BigInt, account: Address, maxPlaceInLine: BigInt, pricePerPod: BigInt, amount: BigInt, orderId: Bytes, status: string): boolean {
    let id = account.toHexString() + '-' + orderId.toHexString()

    assert.entityCount("PodOrder", countEvents.toI32())

    assert.fieldEquals(
        "PodOrder", id,
        "account", account.toHexString()
    )
    assert.fieldEquals(
        "PodOrder", id,
        "maxPlaceInLine", maxPlaceInLine.toString()
    )
    assert.fieldEquals(
        "PodOrder", id,
        "PlaceInLineFrom", "0"
    )
    assert.fieldEquals(
        "PodOrder", id,
        "PlaceInLineTo", (maxPlaceInLine.plus(harvestableIndex)).toString()
    )
    assert.fieldEquals(
        "PodOrder", id,
        "pricePerPod", pricePerPod.toString()
    )
    assert.fieldEquals(
        "PodOrder", id,
        "amount", amount.toString()
    )
    assert.fieldEquals(
        "PodOrder", id,
        "status", status.toString()
    )

    return false;

}

let price = BigInt.fromI32(10 ** 18)
let supply = BigInt.fromI32(0)
let stalk = BigInt.fromI32(10)
let seeds = BigInt.fromI32(10)
let podIndex = BigInt.fromI32(10)
let season = BigInt.fromI32(1)
let harvestableIndex = BigInt.fromI32(100)

describe("Test podLisitngs and PodOrders", () => {

    describe("Test PodListings", function () {
        beforeAll(() => {
            clearStore()
        })

        test("1) First season", () => {
            season = BigInt.fromI32(1)
            harvestableIndex = BigInt.fromI32(100)
            let shnapshot = createSeasonSnapshotEvent(season, price, supply, stalk, seeds, podIndex, harvestableIndex)
            handleSeasonSnapshot(shnapshot)

            assert.fieldEquals(
                "HelperMarketplace", "0",
                "season", season.toString()
            )
            assert.fieldEquals(
                "HelperMarketplace", "0",
                "harvestableIndex", harvestableIndex.toString()
            )
        })

        test("2) Create podListing #1", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000001")
            let index = BigInt.fromI32(0)
            let start = BigInt.fromI32(150)
            let amount = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(150)
            let toWallet = true;
            let podListing = createPodListingCreatedEvent(account, index, start, amount, pricePerPod, maxHarvestableIndex, toWallet)
            handlePodListingCreated(podListing)

            checkEventPodListing(BigInt.fromI32(1), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")
        })


        test("3) Create podListing #2", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000002")
            let index = BigInt.fromI32(200)
            let start = BigInt.fromI32(0)
            let amount = BigInt.fromI32(100)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(300)
            let toWallet = true;
            let podListing = createPodListingCreatedEvent(account, index, start, amount, pricePerPod, maxHarvestableIndex, toWallet)
            handlePodListingCreated(podListing)

            checkEventPodListing(BigInt.fromI32(2), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")
        })

        test("4) Create podListing #3", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000003")
            let index = BigInt.fromI32(600)
            let start = BigInt.fromI32(50)
            let amount = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(400)
            let toWallet = true;
            let podListing = createPodListingCreatedEvent(account, index, start, amount, pricePerPod, maxHarvestableIndex, toWallet)
            handlePodListingCreated(podListing)

            checkEventPodListing(BigInt.fromI32(3), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")
        })

        test("5) Next season", () => {
            season = BigInt.fromI32(2)
            harvestableIndex = BigInt.fromI32(120)
            let shnapshot = createSeasonSnapshotEvent(season, price, supply, stalk, seeds, podIndex, harvestableIndex)
            handleSeasonSnapshot(shnapshot)

            assert.fieldEquals(
                "HelperMarketplace", "0",
                "season", season.toString()
            )
            assert.fieldEquals(
                "HelperMarketplace", "0",
                "harvestableIndex", harvestableIndex.toString()
            )

        })


        test("6) test podListing #1 and #2", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000001")
            let index = BigInt.fromI32(0)
            let start = BigInt.fromI32(150)
            let amount = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(150)
            let toWallet = true;
            checkEventPodListing(BigInt.fromI32(3), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")

            account = Address.fromString("0x0000000000000000000000000000000000000002")
            index = BigInt.fromI32(200)
            start = BigInt.fromI32(0)
            amount = BigInt.fromI32(100)
            pricePerPod = 900000
            maxHarvestableIndex = BigInt.fromI32(300)
            toWallet = true;
            checkEventPodListing(BigInt.fromI32(3), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")

            account = Address.fromString("0x0000000000000000000000000000000000000003")
            index = BigInt.fromI32(600)
            start = BigInt.fromI32(50)
            amount = BigInt.fromI32(50)
            pricePerPod = 900000
            maxHarvestableIndex = BigInt.fromI32(400)
            toWallet = true;
            checkEventPodListing(BigInt.fromI32(3), index, account, start, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amount, "opened")
        })


        test("7) Fill podListing #1", () => {
            let from = Address.fromString("0x0000000000000000000000000000000000000001")
            let to = Address.fromString("0x0000000000000000000000000000000000000002")

            let index = BigInt.fromI32(0)
            let start = BigInt.fromI32(150)
            let amount = BigInt.fromI32(50)

            let PodListingFilled = createPodListingFilledEvent(from, to, index, start, amount)
            handlePodListingFilled(PodListingFilled)

            let account = Address.fromString("0x0000000000000000000000000000000000000001")
            let indexP = BigInt.fromI32(0)
            let startP = BigInt.fromI32(150)
            let amountP = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(150)
            let toWallet = true;
            checkEventPodListing(BigInt.fromI32(3), indexP, account, startP, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amountP, "filled")
        })

        test("8) Fill podListing #2", () => {
            let from = Address.fromString("0x0000000000000000000000000000000000000002")
            let to = Address.fromString("0x0000000000000000000000000000000000000003")

            let index = BigInt.fromI32(200)
            let start = BigInt.fromI32(0)
            let amount = BigInt.fromI32(50)

            let PodListingFilled = createPodListingFilledEvent(from, to, index, start, amount)
            handlePodListingFilled(PodListingFilled)

            let account = Address.fromString("0x0000000000000000000000000000000000000002")
            let indexP = BigInt.fromI32(200)
            let startP = BigInt.fromI32(0)
            let amountP = BigInt.fromI32(100)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(300)
            let toWallet = true;
            checkEventPodListing(BigInt.fromI32(4), indexP, account, startP, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amountP, "filled")


            account = Address.fromString("0x0000000000000000000000000000000000000002")
            indexP = BigInt.fromI32(250)
            startP = BigInt.fromI32(0)
            amountP = BigInt.fromI32(50)
            pricePerPod = 900000
            maxHarvestableIndex = BigInt.fromI32(300)
            toWallet = true;
            checkEventPodListing(BigInt.fromI32(4), indexP, account, startP, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amountP, "opened")
        })

        test("9) cancel podListing #3", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000003")
            let index = BigInt.fromI32(600)

            let PodListingCancelled = createPodListingCancelledEvent(account, index)
            handlePodListingCancelled(PodListingCancelled)

            let accountP = Address.fromString("0x0000000000000000000000000000000000000003")
            let indexP = BigInt.fromI32(600)
            let startP = BigInt.fromI32(50)
            let amountP = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(400)
            let toWallet = true;
            checkEventPodListing(BigInt.fromI32(4), indexP, accountP, startP, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amountP, "canceled")
        })

        test("10) Next season", () => {
            season = BigInt.fromI32(3)
            harvestableIndex = BigInt.fromI32(300)
            let shnapshot = createSeasonSnapshotEvent(season, price, supply, stalk, seeds, podIndex, harvestableIndex)
            handleSeasonSnapshot(shnapshot)

            assert.fieldEquals(
                "HelperMarketplace", "0",
                "season", season.toString()
            )
            assert.fieldEquals(
                "HelperMarketplace", "0",
                "harvestableIndex", harvestableIndex.toString()
            )

        })


        test("11) test overdue podListing #2", () => {
            let accountP = Address.fromString("0x0000000000000000000000000000000000000002")
            let indexP = BigInt.fromI32(250)
            let startP = BigInt.fromI32(0)
            let amountP = BigInt.fromI32(50)
            let pricePerPod = 900000
            let maxHarvestableIndex = BigInt.fromI32(300)
            let toWallet = true;
            checkEventPodListing(BigInt.fromI32(4), indexP, accountP, startP, maxHarvestableIndex, BigInt.fromI32(pricePerPod), amountP, "overdue")
        })
    })


    describe("Test PodOrders", function () {
        beforeAll(() => {
            clearStore()
        })


        test("1) First season", () => {
            season = BigInt.fromI32(1)
            harvestableIndex = BigInt.fromI32(100)
            let shnapshot = createSeasonSnapshotEvent(season, price, supply, stalk, seeds, podIndex, harvestableIndex)
            handleSeasonSnapshot(shnapshot)

            assert.fieldEquals(
                "HelperMarketplace", "0",
                "season", season.toString()
            )
            assert.fieldEquals(
                "HelperMarketplace", "0",
                "harvestableIndex", harvestableIndex.toString()
            )
        })

        test("2) Create Orders #1", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000001")
            let amount = BigInt.fromI32(50)
            let pricePerPod = 1200000
            let maxPlaceInLine = BigInt.fromI32(150)
            let idOrder = Bytes.fromHexString(account.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))

            let podOrder = createPodOrderCreatedEvent(account, idOrder, amount, pricePerPod, maxPlaceInLine)
            handlePodOrderCreated(podOrder)

            checkEventPodOrders(BigInt.fromI32(1), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amount, idOrder, "opened")
        })

        test("3) Create Orders #2", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000002")
            let amount = BigInt.fromI32(100)
            let pricePerPod = 1100000
            let maxPlaceInLine = BigInt.fromI32(200)
            let idOrder = Bytes.fromHexString(account.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))

            let podOrder = createPodOrderCreatedEvent(account, idOrder, amount, pricePerPod, maxPlaceInLine)
            handlePodOrderCreated(podOrder)

            checkEventPodOrders(BigInt.fromI32(2), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amount, idOrder, "opened")
        })


        test("4) Create Orders #3", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000003")
            let amount = BigInt.fromI32(200)
            let pricePerPod = 1150000
            let maxPlaceInLine = BigInt.fromI32(100)
            let idOrder = Bytes.fromHexString(account.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))

            let podOrder = createPodOrderCreatedEvent(account, idOrder, amount, pricePerPod, maxPlaceInLine)
            handlePodOrderCreated(podOrder)

            checkEventPodOrders(BigInt.fromI32(3), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amount, idOrder, "opened")
        })

        test("5) Next season", () => {
            season = BigInt.fromI32(2)
            harvestableIndex = BigInt.fromI32(200)
            let shnapshot = createSeasonSnapshotEvent(season, price, supply, stalk, seeds, podIndex, harvestableIndex)
            handleSeasonSnapshot(shnapshot)

            assert.fieldEquals(
                "HelperMarketplace", "0",
                "season", season.toString()
            )
            assert.fieldEquals(
                "HelperMarketplace", "0",
                "harvestableIndex", harvestableIndex.toString()
            )
        })

        test("6) Cancel Orders #1", () => {
            let account = Address.fromString("0x0000000000000000000000000000000000000001")
            let amount = BigInt.fromI32(50)
            let pricePerPod = 1200000
            let maxPlaceInLine = BigInt.fromI32(150)
            let idOrder = Bytes.fromHexString(account.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))


            let podOrder = createPodOrderCancelledEvent(account, idOrder);
            handlePodOrderCancelled(podOrder)

            checkEventPodOrders(BigInt.fromI32(3), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amount, idOrder, "canceled")
        })


        test("7) Fill Orders #2", () => {
            let from = Address.fromString("0x0000000000000000000000000000000000000001")
            let to = Address.fromString("0x0000000000000000000000000000000000000002")
            let index = BigInt.fromI32(50)
            let start = BigInt.fromI32(150)
            let amount = BigInt.fromI32(100)
            let maxPlaceInLine = BigInt.fromI32(200)
            let pricePerPod = 1100000
            let idOrder = Bytes.fromHexString(to.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))

            let podOrder = createPodOrderFilledEvent(from, to, idOrder, index, start, amount)
            handlePodOrderFilled(podOrder)

            let account = Address.fromString("0x0000000000000000000000000000000000000002")
            let amountP = BigInt.fromI32(0)
            checkEventPodOrders(BigInt.fromI32(3), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amountP, idOrder, "filled")
        })

        test("8) Fill Orders #3", () => {
            let from = Address.fromString("0x0000000000000000000000000000000000000001")
            let to = Address.fromString("0x0000000000000000000000000000000000000003")
            let index = BigInt.fromI32(300)
            let start = BigInt.fromI32(150)
            let amount = BigInt.fromI32(50)
            let maxPlaceInLine = BigInt.fromI32(100)
            let pricePerPod = 1150000
            let idOrder = Bytes.fromHexString(to.toHex()).concatI32(pricePerPod).concat(Bytes.fromHexString(maxPlaceInLine.toHex()))

            let podOrder = createPodOrderFilledEvent(from, to, idOrder, index, start, amount)
            handlePodOrderFilled(podOrder)

            let account = Address.fromString("0x0000000000000000000000000000000000000003")
            let amountP = BigInt.fromI32(150)
            checkEventPodOrders(BigInt.fromI32(3), account, maxPlaceInLine, BigInt.fromI32(pricePerPod), amountP, idOrder, "opened")
        })
    })
})
