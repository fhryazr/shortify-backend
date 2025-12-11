import { Link } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export class ShortenRepository {
  async getAll(): Promise<Link[]> {
    const links = await prisma.link.findMany();
    return links;
  }

  async create(data: Link) {
    return prisma.link.create({ data })
  }
}