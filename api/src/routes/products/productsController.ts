import { Request, Response, json } from 'express';
import { db } from '../../db';
import { productsTable } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductsById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));
    if (!product) {
      res.status(404).send({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function createProducts(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateProducts(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();
    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: 'Producr was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteProducts(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.send(204);
    } else {
      res.status(404).send({ message: 'Product was not found' });
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

// export async function deleteProducts(req: Request, res: Response) {
//   try {
//     const deletedProducts = await db.delete(productsTable).returning(); // Return all deleted products, if needed

//     if (deletedProducts.length > 0) {
//       res.sendStatus(204); // Success, no content
//     } else {
//       res.status(404).send({ message: 'No products found to delete' });
//     }
//   } catch (e) {
//     res.status(500).send(e);
//   }
// }
