import { HelperMarketplace } from "../../../generated/schema";
import { ZERO_BI } from "../constants";

export function helperMarket(): HelperMarketplace {
    let marketplace = HelperMarketplace.load("0")
    if (marketplace == null) {
      marketplace = new HelperMarketplace("0")
      marketplace.season = ZERO_BI
      marketplace.harvestableIndex = ZERO_BI
      marketplace.listings = []
      marketplace.orders = []
    }
    return marketplace
}