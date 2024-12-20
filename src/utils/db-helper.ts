import { PropertyFor } from "../api/property/property.interface";
import { IDynamicObject } from "../types";

export const getMinMaxPricing = (
  minPrice: string,
  maxPrice: string,
  field: string
) => {
  if (minPrice && maxPrice)
    return { [field]: { $gte: minPrice, $lte: maxPrice } };

  if (minPrice && !maxPrice) return { [field]: { $gte: minPrice } };

  if (!minPrice && maxPrice) return { [field]: { $lte: maxPrice } };

  return {};
};

export const removePropertyForExtraFields = (body: IDynamicObject) => {
  if (!body?.propertyFor) return {};

  const saleFields = [
    "price",
    "rentPaymentFrequency",
    "leaseTerm",
    "minimumStay",
    "maximumStay",
    "deposit",
    "maintenanceFees",
  ];
  const rentFields = [
    "price",
    "ownershipDetails",
    "mortgageInfo",
    "minimumStay",
    "maximumStay",
  ];
  const shortLetFields = [
    "price",
    "ownershipDetails",
    "mortgageInfo",
    "rentPaymentFrequency",
    "leaseTerm",
  ];

  const fieldsToUnset =
    body.propertyFor === PropertyFor.Sale
      ? saleFields
      : body.propertyFor === PropertyFor.Rent
      ? rentFields
      : body.propertyFor === PropertyFor.ShortLet
      ? shortLetFields
      : [];

  fieldsToUnset.forEach((field) => (body[field] = undefined));

  return body;
};

export const getPropertySorted = (sort: string): Record<string, number> => {
  const sortMapping: Record<string, Record<string, number>> = {
    "price-high-to-low": { price: -1 },
    "price-low-to-high": { price: 1 },
    newest: { createdAt: -1 },
    bedrooms: { bedrooms: -1 },
    bathrooms: { bathrooms: -1 },
    "square-feet": { area: -1 },
    "lot-size": { lotSize: -1 },
  };

  return sortMapping[sort] || {};
};
