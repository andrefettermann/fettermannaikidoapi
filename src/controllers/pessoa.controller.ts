// /src/controllers/pesoa.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/pessoa.service";

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
            mensagem: "Erro ao buscar o dojo",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function busca(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
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
            mensagem: `Erro ao buscar a pessoa com o id: ${id}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaAniversariantes(req: Request, res: Response, next: NextFunction) {
    const mes = req.params.mes;
    try {
        const response = await servico.buscaAniversariantes(mes);

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
            mensagem: `Erro ao buscar aniversariantes do mes ${mes} `,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaSituacao(req: Request, res: Response, next: NextFunction) {
    const situacao = req.params.situacao;
    try {
        const response = await servico.buscaSituacao(situacao);

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
            mensagem: `Erro ao buscar pessoas pela situacao ${situacao} `,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaProfessores(req: Request,res: Response, next: NextFunction) {
    try {
        const response: any = await servico.buscaProfessores();
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
            mensagem: "Erro ao buscar professores",
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.inclui(req.body);
        if (resposta) {
            if (resposta.sucesso) {
                res.status(201).json(resposta);
            } else {
                res.status(500).json({ mensagem: resposta.erro });
            }
        } else {
            res.status(500).json({ result: resposta });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.atualiza(req.params.id, req.body);
        if (resposta) {
            if (resposta.sucesso) {
                res.status(201).json(resposta);
            
            } else {
                res.status(500).json({ mensagem: resposta.erro });
            }
        } else {
            res.status(500).json({ response: resposta });
        }
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }
}
