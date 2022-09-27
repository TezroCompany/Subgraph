import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  TopCornApproval,
  OwnershipTransferred,
  TopCornTransfer
} from "../generated/TopCorn/TopCorn"

export function createTopCornApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): TopCornApproval {
  let topCornApprovalEvent = changetype<TopCornApproval>(newMockEvent())

  topCornApprovalEvent.parameters = new Array()

  topCornApprovalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  topCornApprovalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  topCornApprovalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return topCornApprovalEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTopCornTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): TopCornTransfer {
  let topCornTransferEvent = changetype<TopCornTransfer>(newMockEvent())

  topCornTransferEvent.parameters = new Array()

  topCornTransferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  topCornTransferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  topCornTransferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return topCornTransferEvent
}
