import express from "express";
import {
  deleteProduct,
  getStocks,
  higherQuantity,
  insertProduct,
  lowerQuantity,
  updateProduct,
} from "../controllers/stocks";

const router = express.Router();

router.get("/getStocks", getStocks);
router.post("/insertProduct", insertProduct);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);
router.patch("/higherQuantity", higherQuantity);
router.patch("/lowerQuantity", lowerQuantity);

export default router;
