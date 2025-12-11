import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export class ShortenRepository {
  async getAll(limit?: number): Promise<Link[]> {
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
      orderBy: { updatedAt: 'desc' }
    });
    return links;
  }

  async create(data: Link) {
    return prisma.link.create({ data })
  }
}