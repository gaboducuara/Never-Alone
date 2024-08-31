import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function createInterestGame(nameGame, categoryGame, skill, userId) {
  return prisma.interestGame.create({
    data: {
      nameGame,
      categoryGame,
      skill,
      ...(userId ? { userId } : {}),
    }
  });
}

export async function getAllInterestGames() {
  return prisma.interestGame.findMany();
}

export async function getOneInterestGame(userData) {
  const { nameGame, categoryGame, skill } = userData;
  const where = {};

  if (nameGame) where.nameGame = nameGame;
  if (categoryGame) where.categoryGame = categoryGame;
  if (skill) where.skill = skill;

  return await prisma.interestGame.findFirst({
    where: where
  });
}




