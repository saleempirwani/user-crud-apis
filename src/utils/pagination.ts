import { Document, Model, Query } from "mongoose";

/**
 * Paginate through documents in a Mongoose model with optional population.
 *
 * @param model - The Mongoose model to query.
 * @param page - The page number to retrieve (1-based index).
 * @param limit - The number of documents per page.
 * @param filter - Optional filter to apply to the query.
 * @param sort - Optional sort object to sort results.
 * @param populate - Optional populate object or string to include related documents.
 * @returns An object containing the paginated results and metadata.
 */

export interface IPagination {
  page?: string;
  limit?: string;
}

export interface IPaginate {
  model: Model<any>;
  pagination: IPagination;
  sort?: any;
  filter?: object;
  select?: string;
  populate?: any;
}

export async function paginate<T extends Document>(params: IPaginate) {
  const {
    model,
    pagination: { limit = 10, page = 1 },
    sort = { createdAt: -1 },
    filter = {},
    populate = "",
    select = "",
  } = params;

  // Ensure page and limit are numbers and set default values
  let pageNumber = Number(page);
  let pageSize = Number(limit);

  pageNumber = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  pageSize = Number.isNaN(pageSize) || pageSize < 1 ? 10 : pageSize;

  // Calculate the number of documents to skip
  const skip = (pageNumber - 1) * pageSize;

  // Create the query
  let query: Query<T[], T> | any = model
    .find(filter)
    .sort(sort)
    .select(select)
    .skip(skip)
    .limit(pageSize);

  // Apply population if provided
  if (populate) {
    query = query.populate(populate);
  }

  // Fetch the documents with pagination
  const [data, totalRecords] = await Promise.all([
    query.exec(),
    model.countDocuments(filter).exec(),
  ]);

  const totalPages = Math.ceil(totalRecords / pageSize);

  return {
    data,
    totalRecords,
    totalPages,
  };
}
