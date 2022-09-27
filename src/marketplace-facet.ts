import { BigInt } from "@graphprotocol/graph-ts"
import {
  PlotTransfer as PlotTransferEvent,
  PodApproval as PodApprovalEvent,
  PodListingCancelled as PodListingCancelledEvent,
  PodListingCreated as PodListingCreatedEvent,
  PodListingFilled as PodListingFilledEvent,
  PodOrderCancelled as PodOrderCancelledEvent,
  PodOrderCreated as PodOrderCreatedEvent,
  PodOrderFilled as PodOrderFilledEvent
} from "../generated/MarketplaceFacet/MarketplaceFacet"
import {
  PlotTransfer,
  PodApproval,
  PodListingCancelled,
  PodListingCreated,
  PodListingFilled,
  PodOrderCancelled,
  PodOrderCreated,
  PodOrderFilled,
  PodListing,
  PodOrder,
} from "../generated/schema"
import { helperMarket } from "./utils/common/helper"

export function handlePlotTransfer(event: PlotTransferEvent): void {
  let entity = new PlotTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.plotId = event.params.plotId
  entity.pods = event.params.pods
  entity.save()
}

export function handlePodApproval(event: PodApprovalEvent): void {
  let entity = new PodApproval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.pods = event.params.pods
  entity.save()
}

export function handlePodListingCancelled(
  event: PodListingCancelledEvent
): void {
  let entity = new PodListingCancelled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.index = event.params.index
  entity.save()

  let id = (event.params.account.toHexString() + '-' + event.params.index.toString())
  let listing = PodListing.load(id)
  if (listing == null) {
    listing = new PodListing(id)
  }
  listing.status = "canceled"
  listing.save()
}

export function handlePodListingCreated(event: PodListingCreatedEvent): void {
  let entity = new PodListingCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.index = event.params.index
  entity.start = event.params.start
  entity.amount = event.params.amount
  entity.pricePerPod = event.params.pricePerPod
  entity.maxHarvestableIndex = event.params.maxHarvestableIndex
  entity.toWallet = event.params.toWallet
  entity.save()

  let helpM = helperMarket();

  let tempArr = helpM.listings
  tempArr.push((event.params.account.toHexString() + '-' + event.params.index.toString()))
  helpM.listings = tempArr

  let listing = new PodListing(
    (event.params.account.toHexString() + '-' + event.params.index.toString())
  )
  listing.account = event.params.account
  listing.index = event.params.index
  listing.start = event.params.start
  listing.maxHarvestableIndex = event.params.maxHarvestableIndex
  listing.pricePerPod = event.params.pricePerPod
  listing.amount = event.params.amount
  listing.expiresIn = event.params.maxHarvestableIndex.minus(helpM.harvestableIndex)
  listing.status = "opened"
  listing.save()
  helpM.save()
}

export function handlePodListingFilled(event: PodListingFilledEvent): void {
  let entity = new PodListingFilled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.index = event.params.index
  entity.start = event.params.start
  entity.amount = event.params.amount
  entity.save()


  let id = (event.params.from.toHexString() + '-' + event.params.index.toString())
  let listing = PodListing.load(id)
  if (listing == null) {
    listing = new PodListing(id)
  }

  if (listing.amount > event.params.amount) {

    // выкупили не полностью, нужно создать новое объявление
    let newIndex = listing.index.plus(event.params.amount).plus(event.params.start);
    let helpM = helperMarket();

    let tempArr = helpM.listings
    tempArr.push((event.params.from.toHexString() + '-' + newIndex.toString()))
    helpM.listings = tempArr

    let listingNew = new PodListing(
      (event.params.from.toHexString() + '-' + newIndex.toString())
    )
    listingNew.account = event.params.from
    listingNew.index = newIndex
    listingNew.start = BigInt.fromI32(0);
    listingNew.maxHarvestableIndex = listing.maxHarvestableIndex
    listingNew.pricePerPod = listing.pricePerPod
    listingNew.amount = listing.amount.minus(event.params.amount)
    listingNew.expiresIn = listingNew.maxHarvestableIndex.minus(helpM.harvestableIndex)
    listingNew.status = "opened"
    listingNew.save()
    helpM.save()
  }
  listing.status = "filled"
  listing.save()
}

export function handlePodOrderCancelled(event: PodOrderCancelledEvent): void {
  let entity = new PodOrderCancelled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.orderId = event.params.orderId
  entity.save()

  let id = (event.params.account.toHexString() + '-' + event.params.orderId.toHexString())
  let order = PodOrder.load(id)
  if (order == null) {
    order = new PodOrder(id)
  }
  order.status = "canceled"
  order.save()
}

export function handlePodOrderCreated(event: PodOrderCreatedEvent): void {
  let entity = new PodOrderCreated(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.orderId = event.params.orderId
  entity.amount = event.params.amount
  entity.pricePerPod = event.params.pricePerPod
  entity.maxPlaceInLine = event.params.maxPlaceInLine
  entity.save()

  let helpM = helperMarket();

  let tempArr = helpM.orders
  let id = event.params.account.toHexString() + '-' + event.params.orderId.toHexString()
  tempArr.push(id)
  helpM.orders = tempArr

  let order = new PodOrder(id)
  order.account = event.params.account
  order.maxPlaceInLine = event.params.maxPlaceInLine
  order.PlaceInLineFrom = BigInt.fromI32(0)
  order.PlaceInLineTo = helpM.harvestableIndex.plus(order.maxPlaceInLine)
  order.pricePerPod = event.params.pricePerPod
  order.amount = event.params.amount
  order.status = "opened"

  order.save()
  helpM.save()
}

export function handlePodOrderFilled(event: PodOrderFilledEvent): void {
  let entity = new PodOrderFilled(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.orderId = event.params.orderId
  entity.index = event.params.index
  entity.start = event.params.start
  entity.amount = event.params.amount
  entity.save()

  let id = (event.params.to.toHexString() + '-' + event.params.orderId.toHexString())
  let order = PodOrder.load(id)
  if (order == null) {
    order = new PodOrder(id)
  }
  order.amount = order.amount.minus(event.params.amount);
  if (order.amount.equals(BigInt.fromI32(0))) {
    order.status = "filled";
  }
  order.save()
}