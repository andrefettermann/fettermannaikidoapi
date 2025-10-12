// dojoController.ts

import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/dojoService";
//import { decripta } from '../../utils/crypto';

/**
 *  Controller de dojo.
 * 
 * @author Andre Fettermann
 */


export async function busca(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.busca(req.params.id);
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.doc)
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

export async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.buscaTodos();
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                res.status(500).json({ mensagem: resposta });
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.inclui(req.body);
        if (resposta) {
            if (resposta.sucesso) {
                res.status(201).json(resposta);
            } else {
                res.status(500).json({ mensagem: resposta });
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao incluir os dados" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.atualiza(req.params.id, req.body);
        if (resposta) {
            if (resposta.success) {
                res.status(201).json(resposta);
            
            } else {
                res.status(500).json({ mensagem: resposta.error });
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao atualizar os dados" });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}
