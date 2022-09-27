import {
  Approval as ApprovalEvent,
  Burn as BurnEvent,
  Mint as MintEvent,
  Swap as SwapEvent,
  Sync as SyncEvent,
  Transfer as TransferEvent
} from "../generated/PancakePair/PancakePair"
import { Approval, Burn, Mint, Swap, Sync, Transfer } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

export function handleBurn(event: BurnEvent): void {
  let entity = new Burn(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.to = event.params.to
  entity.save()
}

export function handleMint(event: MintEvent): void {
  let entity = new Mint(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.amount0 = event.params.amount0
  entity.amount1 = event.params.amount1
  entity.save()
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sender = event.params.sender
  entity.amount0In = event.params.amount0In
  entity.amount1In = event.params.amount1In
  entity.amount0Out = event.params.amount0Out
  entity.amount1Out = event.params.amount1Out
  entity.to = event.params.to
  entity.save()
}

export function handleSync(event: SyncEvent): void {
  let entity = new Sync(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.reserve0 = event.params.reserve0
  entity.reserve1 = event.params.reserve1
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}
