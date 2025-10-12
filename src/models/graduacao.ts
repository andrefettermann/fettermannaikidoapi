/* graduacao.ts */
import { model, Schema } from "mongoose";

interface IGraduacao {
    sequencia: number,
    nome: string,
    faixa: string,
    minimo_horas_treino_exame: number,
    minimo_tempo_exame: number,
    categoria: string,
    observacoes: string,
    tecnicas: [ { nome: string } ]
};

const GraduacaoSchema = new Schema<IGraduacao>({
    sequencia: {
        type: Number,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    faixa: {
        type: String,
        required: false
    },
    minimo_horas_treino_exame: {
        type: Number,
        required: false
    },
    minimo_tempo_exame: {
        type: Number,
        required: false
    },
    categoria: {
        type: String,
        required: true
    },
    observacoes: {
        type: String,
        required: false
    },
    tecnicas : {
        type: [ { nome: {type: String, required: false} } ],
        required: false
    }
})

const Graduacao = model<IGraduacao>('graduacoes', GraduacaoSchema);

export { Graduacao, IGraduacao };