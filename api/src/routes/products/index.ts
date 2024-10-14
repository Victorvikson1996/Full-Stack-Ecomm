import { Router } from 'express';
import {
  getProductsById,
  listProducts,
  createProducts,
  deleteProducts,
  updateProducts
} from './productsController';

//produts endpoints
const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductsById);
router.post('/', createProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);

export default router;
