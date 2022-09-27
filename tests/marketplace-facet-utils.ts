import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  PlotTransfer,
  PodApproval,
  PodListingCancelled,
  PodListingCreated,
  PodListingFilled,
  PodOrderCancelled,
  PodOrderCreated,
  PodOrderFilled
} from "../generated/MarketplaceFacet/MarketplaceFacet"

export function createPlotTransferEvent(
  from: Address,
  to: Address,
  plotId: BigInt,
  pods: BigInt
): PlotTransfer {
  let plotTransferEvent = changetype<PlotTransfer>(newMockEvent())

  plotTransferEvent.parameters = new Array()

  plotTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  plotTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  plotTransferEvent.parameters.push(
    new ethereum.EventParam("plotId", ethereum.Value.fromUnsignedBigInt(plotId))
  )
  plotTransferEvent.parameters.push(
    new ethereum.EventParam("pods", ethereum.Value.fromUnsignedBigInt(pods))
  )

  return plotTransferEvent
}

export function createPodApprovalEvent(
  owner: Address,
  spender: Address,
  pods: BigInt
): PodApproval {
  let podApprovalEvent = changetype<PodApproval>(newMockEvent())

  podApprovalEvent.parameters = new Array()

  podApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  podApprovalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  podApprovalEvent.parameters.push(
    new ethereum.EventParam("pods", ethereum.Value.fromUnsignedBigInt(pods))
  )

  return podApprovalEvent
}

export function createPodListingCancelledEvent(
  account: Address,
  index: BigInt
): PodListingCancelled {
  let podListingCancelledEvent = changetype<PodListingCancelled>(newMockEvent())

  podListingCancelledEvent.parameters = new Array()

  podListingCancelledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  podListingCancelledEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )

  return podListingCancelledEvent
}

export function createPodListingCreatedEvent(
  account: Address,
  index: BigInt,
  start: BigInt,
  amount: BigInt,
  pricePerPod: i32,
  maxHarvestableIndex: BigInt,
  toWallet: boolean
): PodListingCreated {
  let podListingCreatedEvent = changetype<PodListingCreated>(newMockEvent())

  podListingCreatedEvent.parameters = new Array()

  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam("start", ethereum.Value.fromUnsignedBigInt(start))
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerPod",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(pricePerPod))
    )
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxHarvestableIndex",
      ethereum.Value.fromUnsignedBigInt(maxHarvestableIndex)
    )
  )
  podListingCreatedEvent.parameters.push(
    new ethereum.EventParam("toWallet", ethereum.Value.fromBoolean(toWallet))
  )

  return podListingCreatedEvent
}

export function createPodListingFilledEvent(
  from: Address,
  to: Address,
  index: BigInt,
  start: BigInt,
  amount: BigInt
): PodListingFilled {
  let podListingFilledEvent = changetype<PodListingFilled>(newMockEvent())

  podListingFilledEvent.parameters = new Array()

  podListingFilledEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  podListingFilledEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  podListingFilledEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  podListingFilledEvent.parameters.push(
    new ethereum.EventParam("start", ethereum.Value.fromUnsignedBigInt(start))
  )
  podListingFilledEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return podListingFilledEvent
}

export function createPodOrderCancelledEvent(
  account: Address,
  orderId: Bytes
): PodOrderCancelled {
  let podOrderCancelledEvent = changetype<PodOrderCancelled>(newMockEvent())

  podOrderCancelledEvent.parameters = new Array()

  podOrderCancelledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  podOrderCancelledEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )

  return podOrderCancelledEvent
}

export function createPodOrderCreatedEvent(
  account: Address,
  orderId: Bytes,
  amount: BigInt,
  pricePerPod: i32,
  maxPlaceInLine: BigInt
): PodOrderCreated {
  let podOrderCreatedEvent = changetype<PodOrderCreated>(newMockEvent())

  podOrderCreatedEvent.parameters = new Array()

  podOrderCreatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  podOrderCreatedEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )
  podOrderCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  podOrderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "pricePerPod",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(pricePerPod))
    )
  )
  podOrderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxPlaceInLine",
      ethereum.Value.fromUnsignedBigInt(maxPlaceInLine)
    )
  )

  return podOrderCreatedEvent
}

export function createPodOrderFilledEvent(
  from: Address,
  to: Address,
  orderId: Bytes,
  index: BigInt,
  start: BigInt,
  amount: BigInt
): PodOrderFilled {
  let podOrderFilledEvent = changetype<PodOrderFilled>(newMockEvent())

  podOrderFilledEvent.parameters = new Array()

  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("orderId", ethereum.Value.fromFixedBytes(orderId))
  )
  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("start", ethereum.Value.fromUnsignedBigInt(start))
  )
  podOrderFilledEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return podOrderFilledEvent
}
