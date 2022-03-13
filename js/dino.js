import { contexto } from "./canvas.js";
import sprites from "./sprites.js";
import somPulo from "./songs.js";


class Dino  {
    spriteX = 25
    spriteY = 4
    largura  =43
    altura = 70
    x =  40
    y = 226
    velocidade = 0
    pulando = false
    gravidade = 1.5
    velocidade = 0
    alturaPulo = 20
    score = 0
    melhorPontuacao = 0
    frameAtual =  0

    atualiza(frames){
        this.velocidade += this.gravidade
        this.y += this.velocidade

        if(this.y >= 226){
            this.y = 226
            this.pulando = false
        }


        if(this.pulando){
            this.framePulo()
        }

        else if(!this.pulando){
            somPulo.pause()
            somPulo.currentTime = 0
            this.largura = 43
            this.atualizaFrameAtual(frames)
            const {spriteX, spriteY} = this.movimentos[this.frameAtual]
            this.spriteX = spriteX 
            this.spriteY =  spriteY 
        }

        const valorScore = frames % 10 == 0
            if(valorScore){
                this.score++
            }
    }

    pular(){
        if(!this.pulando){
            somPulo.play()
            this.pulando = true
            this.velocidade = -this.alturaPulo
        }
    }

    framePulo(){
        this.spriteX = 733
        this.spriteY = 0
        this.largura = 55
    }

    movimentos = [
        {spriteX: 102, spriteY: 4 },
        {spriteX: 184, spriteY: 4 },
        {spriteX: 260, spriteY: 4 },
        {spriteX: 342, spriteY: 4 },
    ]


    atualizaFrameAtual(frames){
        const intervaloDeFrames = 4
        const passouOIntervalo = frames % intervaloDeFrames

        if(passouOIntervalo === 0){
            const baseDoIncremento = 1
            const incremento = baseDoIncremento + this.frameAtual
            const baseRepeticao = this.movimentos.length
            this.frameAtual = incremento % baseRepeticao
        }
    }

    desenha(){
        contexto.drawImage(
            sprites, 
            this.spriteX, this.spriteY,
            this.largura, this.altura, 
            this.x, this.y, 
            this.largura, this.altura
        )
    }

    spriteInicial(){
        this.spriteX = 25
        this.spriteY = 4
        this.largura = 40
        this.y = 226
    }
}

export default new Dino;
