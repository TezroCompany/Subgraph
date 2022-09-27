import {
  TopCornApproval as TopCornApprovalEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TopCornTransfer as TopCornTransferEvent
} from "../generated/TopCorn/TopCorn"
import {
  TopCornApproval,
  OwnershipTransferred,
  TopCornTransfer
} from "../generated/schema"

export function handleTopCornApproval(event: TopCornApprovalEvent): void {
  let entity = new TopCornApproval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleTopCornTransfer(event: TopCornTransferEvent): void {
  let entity = new TopCornTransfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
