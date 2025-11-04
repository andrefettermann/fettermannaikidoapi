/*
/ src/controllers/graduacaoController.ts
*/

import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/graduacaoService";
import { IResultado } from '../models/resultado';

const MENSAGEM_ERRO_LER = "Erro ao ler os dados";

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
            mensagem: "Erro ao buscar todas as graduacoes",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function busca(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response: any = await servico.busca(id);
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
            mensagem: `Erro ao buscar a graduacao: ${id}`,
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
            mensagem: "Erro ao incluir a graduacao",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const dados = req.body;
    
    try {
        const response: any = await servico.atualiza(id, dados);

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
            mensagem: "Erro ao atualizar a graduacao",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }}
