import {
  Pause as PauseEvent,
  Unpause as UnpauseEvent
} from "../generated/SystemFacet/SystemFacet"
import { Pause, Unpause } from "../generated/schema"

export function handlePause(event: PauseEvent): void {
  let entity = new Pause(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.timestamp = event.params.timestamp
  entity.save()
}

export function handleUnpause(event: UnpauseEvent): void {
  let entity = new Unpause(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.timestamp = event.params.timestamp
  entity.timePassed = event.params.timePassed
  entity.save()
}
