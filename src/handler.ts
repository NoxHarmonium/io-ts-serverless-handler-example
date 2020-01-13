import * as t from "io-ts";
import { chunk} from "lodash";
import { configureWrapper, coerce } from "io-ts-serverless-handler";
import 'source-map-support/register';
import { products } from "./data";

const codecHandler = configureWrapper({
  strict: true
});

export const listProducts = codecHandler({
  queryStringParameters: t.partial({
    pageNumber: coerce(t.number),
    pageSize: coerce(t.number)
  })
}, async ({
  queryStringParameters: {
    pageNumber,
    pageSize
  }
}) => {
    const resolvedPageSize = pageSize === undefined ? 10 : pageSize;
    const resolvedPageNumber = pageNumber === undefined ? 0 : pageNumber;
    const productPage = chunk(products, resolvedPageSize)[resolvedPageNumber];
    return productPage === undefined ? [] : productPage;
  }
);

export const getProduct = codecHandler({
  pathParameters: t.type({
    id: coerce(t.number),
  }
)}, async ({
  pathParameters: {
    id,
  }
}) => {
    const productPage = products[id];
    if (productPage === undefined) {
      throw new Error("product not found");
    }
    return productPage;
  }
);