import prisma from "@/lib/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const mestre = await prisma.usuario.findUnique({
      where: { cpf: "00000000000" }, // CPF fixo do mestre
    })

    if (!mestre) {
      return res.status(404).json({ error: "Mestre não encontrado" })
    }

    const quantidadeBots = 3000
    const lucroPorBot = Math.floor(Math.random() * 9) + 2 // R$2 a R$10
    const lucroTotal = lucroPorBot * quantidadeBots

    await prisma.usuario.update({
      where: { cpf: "00000000000" },
      data: {
        saldo: { increment: lucroTotal },
      },
    })

    await prisma.operacao.create({
      data: {
        cpf: "00000000000",
        tipo: "Lucro Bhacanna (3000 bots)",
        valor: lucroTotal,
        data: new Date(),
      },
    })

    return res.status(200).json({
      msg: "Lucro Bhacanna gerado com sucesso",
      valor: lucroTotal,
    })
  } else {
    res.status(405).end()
  }
}
