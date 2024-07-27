import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const components = await prisma.components.createMany({
    data:[
        {name:'INPUT'},
        {name:'RANGE'},
        {name:'RATING'},
    ]
  })
  console.log({ components })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })