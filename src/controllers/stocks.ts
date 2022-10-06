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

export const insertStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stock } = req.body;
  try {
    const insertQuery = `CALL insertStock(?, ?, ?, ?)`;
    await query({
      sql: insertQuery,
      values: [
        stock.productName,
        stock.quantity,
        stock.weight,
        stock.measureUnit,
      ],
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { stock } = req.body;
  try {
    const updateQuery = `CALL updateStock(?, ?, ?, ?, ?)`;
    await query({
      sql: updateQuery,
      values: [
        stock.productID,
        stock.productName,
        stock.quantity,
        stock.weight,
        stock.measureUnit,
      ],
    });
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const deleteStock = async (
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
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const higherQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productID, quantity } = req.query;
  try {
    const updateQuery = `CALL higherQuantity(?, ?)`;
    await query({
      sql: updateQuery,
      values: [productID, quantity],
    });
    res.status(200).send();
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
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error });
  }
};
