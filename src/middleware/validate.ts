import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

type ValidationTarget = 'body' | 'query' | 'params';

/**
 * Generic validation middleware
 * @param schema - Zod schema untuk validasi
 * @param target - Target validasi: 'body', 'query', atau 'params'
 */

export const validate = <T extends ZodType>(
  schema: T,
  target: ValidationTarget = 'body'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[target]);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten().fieldErrors
      });
    }

    // Replace dengan data yang sudah tervalidasi
    req[target] = parsed.data;
    next();
  };
};

// Helper untuk validasi multiple targets sekaligus
export const validateAll = (schemas: {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const targets = Object.entries(schemas) as [ValidationTarget, ZodType][];

    for (const [target, schema] of targets) {
      const parsed = schema.safeParse(req[target]);

      if (!parsed.success) {
        return res.status(400).json({
          message: `Validation error in ${target}`,
          errors: parsed.error.flatten().fieldErrors
        });
      }

      req[target] = parsed.data;
    }

    next();
  };
};