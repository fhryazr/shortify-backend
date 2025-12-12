import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type GetAllParams = {
  limit?: number;
  search?: string;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}

export class ShortenRepository {
  async getAll({ limit, search, orderBy }: GetAllParams): Promise<Link[]> {
    const links = await prisma.link.findMany({
      take: limit,
      select: {
        id: true,
        url: true,
        shortCode: true,
        accessCount: true,
        createdAt: true,
        updatedAt: true,
      },
      where: search ? {
        url: { contains: search }
      } : undefined,
      orderBy: orderBy ?? { updatedAt: 'desc' },
    });
    return links;
  }

  async create(data: Link) {
    return prisma.link.create({ data })
  }

  async update(id: string, data: Partial<Link>) {
    return prisma.link.update({
      where: { id: id },
      data: {
        ...data,
        updatedAt: new Date(),
      }
    });
  }
}