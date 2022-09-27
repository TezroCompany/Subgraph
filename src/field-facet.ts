import { Sow as SowEvent } from "../generated/FieldFacet/FieldFacet"
import { Sow } from "../generated/schema"

export function handleSow(event: SowEvent): void {
  let entity = new Sow(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.index = event.params.index
  entity.topcorns = event.params.topcorns
  entity.pods = event.params.pods
  entity.save()
}
