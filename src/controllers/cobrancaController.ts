// src/controllers/cobrancaController.ts
import { Request, Response, NextFunction } from 'express';
import * as servico from "../services/cobrancaService";

const MENSAGEM_ERRO_LER = "Erro ao ler os dados";

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
            res.status(500).json({ mensagem: MENSAGEM_ERRO_LER });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function buscaPorPessoa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const resposta: any = await servico.buscaPorPessoa(id);
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(200).json( {result: resposta} )
            }
        } else {
            res.status(204).json({ mensagem: MENSAGEM_ERRO_LER });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function buscaPorTaxa(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const resposta: any = await servico.buscaPorTaxa(id);
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(200).json( {result: resposta} )
            }
        } else {
            res.status(204).json({ mensagem: MENSAGEM_ERRO_LER });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function buscaPorPagamento(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const resposta: any = await servico.buscaPorPagamento(id);
        
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.doc)
            } else {
                return res.status(200).json( {result: resposta} )
            }
        } else {
            res.status(204).json({ mensagem: MENSAGEM_ERRO_LER });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

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
            res.status(500).json({ mensagem: MENSAGEM_ERRO_LER });
        }
    } catch (error) {
        res.status(500).json({ error });
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

export async function incluiPagamento(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id_cobranca;
    const dados = req.body;
    try {
        const resposta: any = await servico.incluiPagamento(id, dados);
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

export async function atualizaPagamento(req: Request, res: Response, next: NextFunction) {
    const dados = req.body;
    try {
        const resposta: any = await servico.atualizaPagamento(dados);
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
