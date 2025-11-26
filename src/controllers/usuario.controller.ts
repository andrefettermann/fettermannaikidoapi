// /src/controllers/uusario.controller

import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/usuario.service";
import { IResultado } from '../models/resultado';

/**
 *  Controller de usuario e login.
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
            mensagem: "Erro ao buscar o usuário",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;
    const senha = req.body.senha;

    try {
        const response = await servico.login(email, senha);
        if (!response.sucesso) {
            return res.status(200).json( {
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
            mensagem: "Não foi possível fazer o login",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}
