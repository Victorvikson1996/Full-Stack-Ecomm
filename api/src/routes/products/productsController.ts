import { Request, Response } from 'express';

export function listProducts(req: Request, res: Response) {
  res.send('listProducts');
}

export function getProductsById(req: Request, res: Response) {
  res.send('getProductsById');
}

export function createProducts(req: Request, res: Response) {
  res.send('createProducts');
}

export function updateProducts(req: Request, res: Response) {
  res.send(' updateProducts');
}

export function deleteProducts(req: Request, res: Response) {
  res.send('deleteProducts');
}
