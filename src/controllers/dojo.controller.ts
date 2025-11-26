// /src/controllers/dojo.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/dojo.service";
import { IResultado } from '../models/resultado';

/**
 *  Controller de dojo.
 * 
 * @author Andre Fettermann
 */


export async function busca(req: Request, res: Response, next: NextFunction) {
    try {
        const response: IResultado = await servico.busca(req.params.id);
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
            mensagem: "Erro ao buscar o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaTodos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.buscaTodos();
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
            mensagem: "Erro ao buscar todos os dojos",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}


export async function buscaAtivos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: IResultado = await servico.buscaAtivos();
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
            mensagem: "Erro ao buscar o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaInativos(req: Request, res: Response, next: NextFunction) {
    try {
        const response: IResultado = await servico.buscaInativos();
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
            mensagem: "Erro ao buscar o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.inclui(req.body);
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
            mensagem: "Erro ao incluir o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const response: any = await servico.atualiza(req.params.id, req.body);

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
            mensagem: "Erro ao atualizar o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}
