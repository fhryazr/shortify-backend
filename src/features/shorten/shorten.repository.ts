import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type GetAllParams = {
  limit?: number;
  search?: string;
  orderBy?: { [key: string]: 'asc' | 'desc' };
}

export class ShortenRepository {
  async getAll({ limit, search, orderBy }: GetAllParams, userId?: string): Promise<Link[]> {
    const links = await prisma.link.findMany({
      take: limit,
      select: {
        id: true,
        userId: true,
        url: true,
        shortCode: true,
        accessCount: true,
        createdAt: true,
        updatedAt: true,
      },
      where: search ? {
        url: { contains: search },
        userId: userId
      } : undefined,
      orderBy: orderBy ?? { updatedAt: 'desc' },
    });
    return links;
  }

  async getByShortCode(shortCode: string) {
    return prisma.link.findUnique({
      where: { shortCode }
    })
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

  async delete(shortCode: string) {
    return prisma.link.delete({
      where: { shortCode }
    });
  }

  async incrementAccessCount(id: string) {
    return prisma.link.update({
      where: { id },
      data: {
        accessCount: {
          increment: 1
        }
      }
    });
  }

  async countLinks() {
    return prisma.link.count();
  }

  async countTotalClicks() {
    const result = await prisma.link.aggregate({
      _sum: {
        accessCount: true
      }
    });
    return result._sum.accessCount || 0;
  }
}