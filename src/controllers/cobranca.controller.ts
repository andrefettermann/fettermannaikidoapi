// src/controllers/cobranca.controller.ts
import { Request, Response, NextFunction, response } from 'express';
import * as servico from "../services/cobranca.service";

const MENSAGEM_ERRO_LER = "Erro ao ler os dados";

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
            mensagem: 'Erro ao buscar todas as cobrancas',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}


export async function buscaPorPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response = await servico.buscaPorPessoa(id);
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
        res.status(500).json({ error });
    }
}


export async function buscaPorTaxa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response = await servico.buscaPorTaxa(id);
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
            mensagem: 'Erro ao buscar as cobrancas por taxa',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function buscaPorPagamento(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const response = await servico.buscaPorPagamento(id);
        if (!response.sucesso || !response.docs) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }
        
        return res.status(200).send({
            sucesso: true,
            doc: response.docs
        });
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: 'Erro ao buscar as cobrancas por pagamento',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function busca(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await servico.busca(req.params.id);
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
            mensagem: 'Erro ao buscar a cobranca',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function inclui(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await servico.inclui(req.body);
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
            mensagem: 'Erro ao incluir a cobranca',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function incluiPagamento(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id_cobranca;
    const dados = req.body;
    try {
        const response = await servico.incluiPagamento(id, dados);
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
            mensagem: 'Erro ao incluir o pagamento',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function atualiza(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const response = await servico.atualiza(id, req.body);
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
            mensagem: 'Erro ao atualizar a cobranca',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function atualizaPagamento(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    try {
        const response = await servico.atualizaPagamento(dados);
        if (!response.sucesso || !response.doc) {
            return res.status(204).json( {
                sucesso: false,
                mensagem: response.mensagem,
                erro: response.erro
            } );
        }
    } catch (error) {
        return res.status(500).json({ 
            sucesso: false,
            mensagem: 'Erro ao atualizar o pagamento',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
         });
    }
}

export async function excluiPagamento(req: Request, res: Response, next: NextFunction) {
    const { idCobranca } = req.params;
    const { idPagamento } = req.params;
    
    try {
        const response = await servico.excluiPagamento(idCobranca, idPagamento);

        if (!response.sucesso) {
            return res.status(201).json( 
                {             
                    sucesso: false,
                    mensagem: response.mensagem,
                    erro: response.erro
                } 
            );
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
    }
}
