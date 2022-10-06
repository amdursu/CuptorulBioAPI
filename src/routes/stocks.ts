import express from "express";
import {
  deleteStock,
  getStocks,
  higherQuantity,
  insertStock,
  lowerQuantity,
  updateStock,
} from "../controllers/stocks";

const router = express.Router();

router.get("/getStocks", getStocks);
router.post("/insertStock", insertStock);
router.put("/updateStock", updateStock);
router.delete("/deleteStock", deleteStock);
router.patch("/higherQuantity", higherQuantity);
router.patch("/lowerQuantity", lowerQuantity);

export default router;
