import { BigInt } from "@graphprotocol/graph-ts";

export const ZERO_BI = BigInt.fromI32(0)
export const ONE_BI = BigInt.fromI32(1)
export const ZERO = 0
export const SEEDS_FOR_LP = BigInt.fromI32(4)
export const SEEDS_FOR_TOKEN = BigInt.fromI32(2)
export const STALKS = BigInt.fromI32(10000)
export const GET_STALK_PER_LP_SEED = STALKS.div(SEEDS_FOR_LP)