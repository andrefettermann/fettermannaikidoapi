
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
        console.log(error)
        res.status(500).json({ error });
    }
}

export async function buscaAniversariantes(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = 
                    await servico.buscaAniversariantes(req.params.mes);
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(204).json( {response: resposta} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function buscaSituacao(req: Request, res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.buscaSituacao(req.params.situacao);
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(204).json( {response: resposta} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function buscaProfessores(req: Request,res: Response, next: NextFunction) {
    try {
        const resposta: any = await servico.buscaProfessores();
        if (resposta) {
            if (resposta.sucesso) {
                return res.status(200).send(resposta.docs)
            } else {
                return res.status(204).json( {response: resposta} )
            }
        } else {
            res.status(500).json({ mensagem: "Erro ao ler os dados" });
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
