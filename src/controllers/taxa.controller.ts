// /src/controllers/taxa.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/taxa.service";

export async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await servico.buscaTodos();
        if (!response.sucesso || !Array.isArray(response.docs)) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }
        
        return res.status(200).send({
            sucesso: true,
            docs: response.docs
        });
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: 'Erro ao buscar todas as taxas',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function busca(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try { 
        const response = await servico.busca(id);
        if (!response.sucesso || !response.doc) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }

        return res.status(200).send({
            sucesso: true,
            doc: response.doc
        });
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: `Erro ao buscar a taxa de id: ${id}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await servico.inclui(req.body);
        if (!response.sucesso) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }
        return res.status(201).send({
            sucesso: true,
            docs: response.docs
        });
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: "Erro ao incluir a taxa",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await servico.atualiza(req.params.id, req.body);
        if (!response.sucesso) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }
        return res.status(200).send({
            sucesso: true,
            docs: response.docs
        });
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: "Erro ao atualizar a taxa",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}
