import { Request, Response, NextFunction } from "express";
import { query } from "../index";

export const getStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit, offset, globalFilter } = req.query;
    const getQuery = "CALL getStocks(?, ?, ?);";
    const response = await query({
      sql: getQuery,
      values: [limit, offset, globalFilter],
    });
    res.send({
      stocks: response[0],
      totalRecords: response[1][0].totalRecords,
    });
    next();
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const insertProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  try {
    const insertQuery = `CALL insertStock(?, ?, ?, ?)`;
    const response = await query({
      sql: insertQuery,
      values: [
        product.productName,
        product.productQuantity,
        product.productWeight,
        product.measureUnit,
      ],
    });
    console.log(response[0][0].productID);

    res.status(200).send({ status: 1, productID: response[0][0].productID });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;

  try {
    const updateQuery = `CALL updateStock(?, ?, ?, ?, ?)`;
    await query({
      sql: updateQuery,
      values: [
        product.productID,
        product.productName,
        product.productQuantity,
        product.productWeight,
        product.measureUnit,
      ],
    });
    res.status(200).send({ status: 1 });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productID } = req.query;
  try {
    const deleteQuery = `CALL deleteStock(?)`;
    await query({
      sql: deleteQuery,
      values: [productID],
    });
    res.status(200).send({ status: 1 });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const higherQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productID, quantity, price } = req.query;
  try {
    const updateQuery = `CALL higherQuantity(?, ?, ?)`;
    await query({
      sql: updateQuery,
      values: [productID, quantity, price],
    });

    res.status(200).send({ status: 1 });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const lowerQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productID, quantity } = req.query;
  try {
    const updateQuery = `CALL lowerQuantity(?, ?)`;
    await query({
      sql: updateQuery,
      values: [productID, quantity],
    });
    res.status(200).send({ status: 1 });
  } catch (error) {
    res.status(500).send({ error });
  }
};
