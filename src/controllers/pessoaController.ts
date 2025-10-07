
import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/pessoaService";

export async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.buscaTodos();
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(204).json( {result: resposta} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
