import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Pause, Unpause } from "../generated/SystemFacet/SystemFacet"

export function createPauseEvent(account: Address, timestamp: BigInt): Pause {
  let pauseEvent = changetype<Pause>(newMockEvent())

  pauseEvent.parameters = new Array()

  pauseEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  pauseEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return pauseEvent
}

export function createUnpauseEvent(
  account: Address,
  timestamp: BigInt,
  timePassed: BigInt
): Unpause {
  let unpauseEvent = changetype<Unpause>(newMockEvent())

  unpauseEvent.parameters = new Array()

  unpauseEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  unpauseEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  unpauseEvent.parameters.push(
    new ethereum.EventParam(
      "timePassed",
      ethereum.Value.fromUnsignedBigInt(timePassed)
    )
  )

  return unpauseEvent
}
