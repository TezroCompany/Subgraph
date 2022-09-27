import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Sow } from "../generated/FieldFacet/FieldFacet"

export function createSowEvent(
  account: Address,
  index: BigInt,
  topcorns: BigInt,
  pods: BigInt
): Sow {
  let sowEvent = changetype<Sow>(newMockEvent())

  sowEvent.parameters = new Array()

  sowEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  sowEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  sowEvent.parameters.push(
    new ethereum.EventParam(
      "topcorns",
      ethereum.Value.fromUnsignedBigInt(topcorns)
    )
  )
  sowEvent.parameters.push(
    new ethereum.EventParam("pods", ethereum.Value.fromUnsignedBigInt(pods))
  )

  return sowEvent
}
