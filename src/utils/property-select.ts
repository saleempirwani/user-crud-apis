import {
  IProperty,
  PropertyCategory,
} from "../api/property/property.interface";
import { IDynamicObject } from "../types";
import { getSelectedFields } from "./helper";

export const PROP_SELECT: Array<keyof IProperty> = [
  "_id",
  "owner",
  "isPublished",
  "isActive",
  "slug",
  "title",
  "propertyCategory",
  "country",
  "state",
  "city",
  "address",
  "location",
  "propertyType",
  "yearBuild",
  "area",
  "listingStatus",
  "propertyFor",
  "price",
  "ownershipDetails",
  "mortgageInfo",
  "leaseTerm",
  "deposit",
  "maintenanceFees",
  "minimumStay",
  "maximumStay",
  "rentPaymentFrequency",
  "totalFloors",
  "lotSize",
  "lotShape",
  "exteriorMaterial",
  "roofMaterial",
  "waterSupply",
  "electricitySupply",
  "accessibilityUtilityFeatures",
  "distToTransport",
  "distToHighway",
  "flooringType",
  "ceilingType",
  "additionalAmenities",
  "photos",
  "floorPlan",
  "panorama",
  "video",
];

export const RES_PROP_SELECT = PROP_SELECT.concat([
  "bathrooms",
  "bedrooms",
  "totalArea",
  "lotFeatures",
  "outdoorFeatures",
  "distToSchool",
  "distToHospitals",
  "distToShopping",
  "interiorLayout",
  "kitchenAppliance",
  "kitchenFeature",
  "counterTopMaterial",
  "cabinetTopMaterial",
  "bathtubType",
  "showerType",
  "vanityType",
  "toiletType",
  "builtInFeatures",
]);

export const COMM_PROP_SELECT = PROP_SELECT.concat([
  "parkingSpaces",
  "externalFeatures",
  "distToBusiness",
  "distToHighway",
  "restrooms",
  "restroomsAccessibility",
  "hvacSystems",
  "fireSafetySystems",
  "securityFeatures",
]);

export const getPropertyFields = (
  propertyCategory: PropertyCategory,
  object: IDynamicObject
) => {
  let fields: string[] = [];
  if (propertyCategory === PropertyCategory.Residential)
    fields = RES_PROP_SELECT;
  else if (propertyCategory === PropertyCategory.Commercial)
    fields = COMM_PROP_SELECT;

  return getSelectedFields(object, fields);
};
